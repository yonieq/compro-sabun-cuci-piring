import { z } from "zod";

/**
 * Contact form contract. Shared by the client form and the server route so the
 * validation rules can never drift apart.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter.")
    .max(80, "Nama maksimal 80 karakter."),
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .email("Masukkan alamat email yang valid."),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor telepon minimal 8 digit.")
    .max(20, "Nomor telepon maksimal 20 karakter.")
    .regex(/^[+()\-\s\d]+$/, "Nomor telepon hanya boleh berisi angka, spasi, +, -, dan tanda kurung."),
  subject: z
    .string()
    .trim()
    .min(3, "Subjek minimal 3 karakter.")
    .max(120, "Subjek maksimal 120 karakter."),
  message: z
    .string()
    .trim()
    .min(20, "Pesan minimal 20 karakter agar kami dapat membantu lebih baik.")
    .max(2000, "Pesan maksimal 2000 karakter."),
  /** Honeypot — must stay empty. Bots tend to fill every field. */
  company: z.string().max(0, "Terima kasih.").optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactApiResponse =
  | { ok: true; message: string }
  | {
      ok: false;
      message: string;
      /** Field-level errors keyed by form field name. */
      errors?: Partial<Record<keyof ContactFormValues, string>>;
    };
