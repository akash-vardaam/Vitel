import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const PRACTITIONER_TYPES = [
  "Medical Doctor (MD)",
  "Osteopathic Physician (DO)",
  "Nurse Practitioner (NP)",
  "Physician Assistant (PA)",
  "Functional Medicine Practitioner",
  "Longevity Specialist",
  "Health Coach",
  "Nutritionist / Dietitian",
  "Personal Trainer",
  "Strength & Conditioning Coach",
  "Physical Therapist",
  "Chiropractor",
  "Wellness Clinic",
  "Med Spa",
  "Biohacking / Performance Lab",
  "Holistic Practitioner",
  "Integrative Medicine",
  "Other",
];

const CALENDLY_URL = "https://calendly.com";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const RECAPTCHA_SCRIPT_ID = "google-recaptcha-script";

export default function RequestDemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [message, setMessage] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      return;
    }

    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = async () => {
    if (!RECAPTCHA_SITE_KEY) {
      throw new Error("Missing reCAPTCHA site key configuration.");
    }

    const recaptcha = window.grecaptcha;
    if (!recaptcha) {
      throw new Error("reCAPTCHA has not loaded yet. Please try again.");
    }

    return new Promise<string>((resolve, reject) => {
      recaptcha.ready(() => {
        recaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: "submit_demo_form" })
          .then((token) => resolve(token))
          .catch(() => reject(new Error("Unable to verify reCAPTCHA. Please try again.")));
      });
    });
  };

  const toggleType = (t: string) => {
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const submitUrl = new URL(
        "submit.php",
        API_BASE_URL?.trim() || document.baseURI
      ).toString();

      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          practice,
          practitionerTypes: types,
          recaptchaToken,
        }),
      });

      const rawBody = await response.text();
      let result: {
        success?: boolean;
        code?: string;
        status?: number;
        message?: string;
        errorDetails?: Array<{ code?: string; message?: string }>;
      } | null = null;

      if (rawBody) {
        try {
          result = JSON.parse(rawBody);
        } catch {
          result = null;
        }
      }

      if (!result || !response.ok || !result.success) {
        const details = Array.isArray(result?.errorDetails)
          ? result.errorDetails
              .map((item: { code?: string; message?: string }) =>
                item?.code && item?.message ? `${item.code}: ${item.message}` : null
              )
              .filter(Boolean)
          : [];
        const detailText = details.length > 0 ? ` ${details.join(" | ")}` : "";
        const fallbackMessage = !rawBody
          ? `Server returned an empty response (HTTP ${response.status}). Make sure the PHP backend endpoint is running.`
          : `Server returned an invalid response format (HTTP ${response.status}).`;
        const statusCode = result?.status ?? response.status;
        const errorCodeText = result?.code ? ` [${result.code}]` : "";
        throw new Error(
          `HTTP ${statusCode}${errorCodeText}: ${result?.message || fallbackMessage}${detailText}`
        );
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPractice("");
      setMessage("");
      setTypes([]);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your request right now."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative max-w-xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 border border-primary/30 mb-8 shadow-[0_0_40px_-5px_hsl(var(--primary)/0.5)]">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          You're in
        </h3>
        <p className="text-base text-foreground-muted mb-10">
          We'll reach out shortly to schedule your demo.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary hover:text-primary-glow transition-colors"
        >
          Or book directly →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-xl mx-auto text-left space-y-6 animate-fade-in"
    >
      {/* Name */}
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-foreground-muted mb-3">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full bg-background-card/60 border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground-subtle outline-none transition-all duration-200 focus:border-primary/60 focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
        />
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-foreground-muted mb-3">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full bg-background-card/60 border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground-subtle outline-none transition-all duration-200 focus:border-primary/60 focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
        />
      </div>

      {/* Practice */}
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-foreground-muted mb-3">
          Practice Name
        </label>
        <input
          type="text"
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          placeholder="Your practice or business name"
          className="w-full bg-background-card/60 border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground-subtle outline-none transition-all duration-200 focus:border-primary/60 focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
        />
      </div>

      {/* Multi-select */}
      <div ref={dropdownRef}>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-foreground-muted mb-3">
          What type of practitioner are you?
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-3 bg-background-card/60 border rounded-xl px-5 py-4 text-base text-left transition-all duration-200 outline-none ${
              open
                ? "border-primary/60 shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
                : "border-border"
            }`}
          >
            <span className={types.length === 0 ? "text-foreground-subtle" : "text-foreground"}>
              {types.length === 0
                ? "Select one or more"
                : `${types.length} selected`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-foreground-muted transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto bg-background-elevated border border-border rounded-xl shadow-lg backdrop-blur-xl animate-fade-in-fast">
              {PRACTITIONER_TYPES.map((t) => {
                const selected = types.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleType(t)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-3 text-sm text-left hover:bg-primary/10 transition-colors"
                  >
                    <span className={selected ? "text-foreground" : "text-foreground-muted"}>
                      {t}
                    </span>
                    {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected chips */}
        {types.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {types.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 chip chip-primary text-[11px]"
              >
                {t}
                <button
                  type="button"
                  onClick={() => toggleType(t)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${t}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-foreground-muted mb-3">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a little about what you want to see in the demo"
          required
          rows={5}
          className="w-full resize-y bg-background-card/60 border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-foreground-subtle outline-none transition-all duration-200 focus:border-primary/60 focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="group relative w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span>{submitting ? "Sending…" : "Request Demo"}</span>
          {!submitting && (
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          )}
        </button>
        <p className="text-center text-xs text-foreground-muted tracking-wide mt-5">
          We're currently onboarding a limited number of practitioners.
        </p>
        {error && (
          <p className="text-center text-sm text-red-400 mt-4">{error}</p>
        )}
      </div>
    </form>
  );
}
