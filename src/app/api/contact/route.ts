import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/mail";

export async function POST(req: Request) {
  // Identifie le client pour le rate limiting.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Anti-spam : 5 messages / minute / IP.
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Données invalides.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot : un bot remplit ce champ caché. On répond OK sans rien stocker.
  if (website && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const saved = await db.contactMessage.create({
    data: {
      name,
      email,
      message,
      ipAddress: ip === "unknown" ? null : ip,
    },
  });

  // Notification email (best-effort : n'échoue pas la requête).
  try {
    await sendContactNotification({ name, email, message });
  } catch (err) {
    console.error("[contact] Échec de l'envoi de l'email :", err);
  }

  return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
}
