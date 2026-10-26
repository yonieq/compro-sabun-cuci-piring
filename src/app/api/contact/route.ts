import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";

/**
 * Contact endpoint.
 *
 * The prototype validates and acknowledges submissions but does NOT deliver
 * email — no provider credentials are configured. To go live, set the
 * environment variables documented in `.env.example` and replace the marked
 * block with a real provider call (Resend, Postmark, SES, …).
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Format permintaan tidak valid." },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Beberapa kolom belum valid. Periksa kembali formulir Anda.",
        errors,
      },
      { status: 422 },
    );
  }

  // Honeypot filled → pretend success, do not process.
  if (parsed.data.company) {
    return NextResponse.json({
      ok: true,
      message: "Terima kasih, pesan Anda sudah kami terima.",
    });
  }

  const { name, email, subject, message } = parsed.data;

  // ------------------------------------------------------------------
  // INTEGRATION POINT
  // Replace this block with a real delivery call once a provider and
  // credentials are available. Never claim delivery without a result.
  //
  //   await resend.emails.send({
  //     from: process.env.CONTACT_FROM_EMAIL!,
  //     to: process.env.CONTACT_TO_EMAIL!,
  //     subject: `[CITRAVA] ${subject}`,
  //     replyTo: email,
  //     text: `${name} (${email})\n\n${message}`,
  //   });
  // ------------------------------------------------------------------
  const providerConfigured = Boolean(
    process.env.CONTACT_EMAIL_PROVIDER && process.env.CONTACT_TO_EMAIL,
  );

  console.info("[contact] submission validated", {
    name,
    email,
    subject,
    length: message.length,
    providerConfigured,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Pesan Anda sudah divalidasi dan masuk ke antrean prototipe. Pengiriman email belum aktif pada versi demo — tim CITRAVA belum menerima pesan ini secara nyata.",
  });
}
