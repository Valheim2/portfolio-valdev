// Envoi d'email via l'API REST de Resend (aucun SDK requis).
// Si RESEND_API_KEY n'est pas défini, l'envoi est silencieusement ignoré.

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactNotification(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "no-api-key" as const };

  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>";
  if (!to) return { sent: false, reason: "no-recipient" as const };

  const { name, email, message } = payload;
  const html = `
    <div style="font-family:sans-serif;line-height:1.6">
      <h2 style="margin:0 0 12px">Nouveau message depuis le portfolio</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space:pre-wrap;padding:12px;background:#f4f4f5;border-radius:8px">${escapeHtml(
        message
      )}</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio — message de ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend a répondu ${res.status}: ${text}`);
  }

  return { sent: true as const };
}
