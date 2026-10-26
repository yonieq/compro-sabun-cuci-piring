"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  Loader2,
  Send,
  TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";
import { contactFormSchema, type ContactApiResponse } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "phone" | "subject" | "message";

type Status = "idle" | "submitting" | "success" | "error";

const fields: {
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  autoComplete: string;
  required: boolean;
}[] = [
  {
    name: "name",
    label: "Nama",
    type: "text",
    placeholder: "Nama lengkap Anda",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "nama@email.com",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Nomor telepon",
    type: "tel",
    placeholder: "+62 812 3456 7890",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "subject",
    label: "Subjek",
    type: "text",
    placeholder: "Contoh: Pertanyaan tentang ukuran produk",
    autoComplete: "off",
    required: true,
  },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const reduce = useReducedMotion();

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const focusFirstError = (nextErrors: Partial<Record<FieldName, string>>) => {
    const first = fields.find((field) => nextErrors[field.name])?.name;
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`#contact-${first}`);
    el?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage("");

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setServerMessage("Periksa kembali kolom yang ditandai.");
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.ok) {
        if (!data.ok && data.errors) {
          setErrors(data.errors as Partial<Record<FieldName, string>>);
          focusFirstError(data.errors as Partial<Record<FieldName, string>>);
        }
        setStatus("error");
        setServerMessage(
          data.ok ? "Terjadi kesalahan. Silakan coba lagi." : data.message,
        );
        return;
      }

      setStatus("success");
      setServerMessage(data.message);
      setValues({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setServerMessage(
        "Koneksi gagal. Periksa jaringan Anda lalu coba lagi.",
      );
    }
  };

  const inputClass = (field: FieldName) =>
    cn(
      "mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-[0.9rem] text-brand-charcoal outline-none transition-colors placeholder:text-ink-soft/40 focus:border-brand-green/70",
      errors[field]
        ? "border-red-400/70 focus:border-red-500"
        : "border-brand-deep/12",
    );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-heading"
      className="rounded-[2rem] border border-brand-deep/8 bg-white p-6 shadow-[0_30px_70px_-50px_rgba(23,77,50,0.5)] sm:p-8"
    >
      <h2 id="contact-form-heading" className="font-display text-xl font-bold text-brand-charcoal">
        Kirim pesan
      </h2>
      <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-soft/70">
        Isi formulir di bawah. Kolom bertanda{" "}
        <span aria-hidden="true" className="text-brand-green">*</span> wajib
        diisi.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={cn(field.name === "subject" && "sm:col-span-2")}
          >
            <label
              htmlFor={`contact-${field.name}`}
              className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-brand-deep"
            >
              {field.label}{" "}
              <span aria-hidden="true" className="text-brand-green">*</span>
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={(event) => update(field.name, event.target.value)}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              aria-required="true"
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `contact-${field.name}-error` : undefined
              }
              className={inputClass(field.name)}
            />
            <AnimatePresence initial={false}>
              {errors[field.name] ? (
                <motion.p
                  id={`contact-${field.name}-error`}
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-[0.72rem] font-medium text-red-600"
                >
                  <TriangleAlert className="h-3 w-3" aria-hidden="true" />
                  {errors[field.name]}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        ))}

        <div className="sm:col-span-2">
          <div className="flex items-baseline justify-between gap-2">
            <label
              htmlFor="contact-message"
              className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-brand-deep"
            >
              Pesan <span aria-hidden="true" className="text-brand-green">*</span>
            </label>
            <span
              className={cn(
                "text-[0.68rem]",
                values.message.length > 2000 ? "text-red-600" : "text-ink-soft/45",
              )}
            >
              {values.message.length}/2000
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Ceritakan kebutuhan Anda, pertanyaan produk, atau rencana kerja sama…"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(inputClass("message"), "resize-y")}
          />
          <AnimatePresence initial={false}>
            {errors.message ? (
              <motion.p
                id="contact-message-error"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-[0.72rem] font-medium text-red-600"
              >
                <TriangleAlert className="h-3 w-3" aria-hidden="true" />
                {errors.message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Honeypot — hidden from assistive tech and visually hidden */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.7rem] leading-relaxed text-ink-soft/55">
          Dengan mengirim pesan, Anda menyetujui{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-brand-deep">
            kebijakan privasi
          </a>{" "}
          kami. Data hanya digunakan untuk merespons pertanyaan Anda.
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-deep px-6 text-[0.88rem] font-semibold text-brand-offwhite transition-colors hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Mengirim…
            </>
          ) : (
            <>
              Kirim Pesan
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence initial={false}>
          {status === "success" ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-green/25 bg-leaf-50 p-4"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-green"
                aria-hidden="true"
              />
              <div>
                <p className="text-[0.86rem] font-semibold text-brand-deep">
                  Formulir berhasil divalidasi
                </p>
                <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-soft/80">
                  {serverMessage}
                </p>
              </div>
            </motion.div>
          ) : null}

          {status === "error" && serverMessage ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4"
            >
              <TriangleAlert
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                aria-hidden="true"
              />
              <p className="text-[0.8rem] leading-relaxed text-amber-900">
                {serverMessage}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
