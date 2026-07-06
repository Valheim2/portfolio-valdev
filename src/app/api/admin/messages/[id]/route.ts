import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  let body: { read?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    // corps optionnel
  }

  try {
    const updated = await db.contactMessage.update({
      where: { id },
      data: { read: body.read ?? true },
    });
    return NextResponse.json({ ok: true, read: updated.read });
  } catch {
    return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
  }
}
