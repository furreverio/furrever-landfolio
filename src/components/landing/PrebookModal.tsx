import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import dogRunning from "@/assets/dog-running.jpg";
import catSleep from "@/assets/cat-sleep.jpg";
import {
  rememberPetType,
  readLastPetType,
  type PetType,
} from "./prebook-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const requiredCheck = (message: string) =>
  z.boolean().refine((v) => v === true, { message });

const prebookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(120, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d][\d\s-]{8,}$/, "Enter a valid phone number"),
  city: z.string().trim().min(2, "Enter your city").max(80, "City is too long"),
  petType: z.enum(["dog", "cat"], {
    required_error: "Pick who you're a pet parent to",
  }),
  acceptTerms: requiredCheck("Please agree to the Terms and Privacy Policy"),
  acceptContact: z.boolean(),
});

type PrebookValues = z.infer<typeof prebookSchema>;

const petOptions: {
  value: PetType;
  label: string;
  image: string;
}[] = [
  { value: "dog", label: "Dog", image: dogRunning },
  { value: "cat", label: "Cat", image: catSleep },
];

const STORAGE_KEY = "furrever-prebook-leads";
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL as string | undefined;

type Lead = PrebookValues;

function saveLead(values: Lead) {
  const entry = {
    ...values,
    submittedAt: new Date().toISOString(),
  };
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, entry]));
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry]));
  }
}

async function notifyDiscord(lead: Lead) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn("VITE_DISCORD_WEBHOOK_URL is not set; skipping Discord notify");
    return;
  }

  const petLabel = { dog: "Dog parent", cat: "Cat parent" }[lead.petType];
  const yesNo = (v: boolean) => (v ? "Yes" : "No");
  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "New founding pet parent signup",
          color: 0x2dd4a8,
          fields: [
            { name: "Name", value: lead.name, inline: true },
            { name: "Email", value: lead.email, inline: true },
            { name: "Phone", value: lead.phone, inline: true },
            { name: "City", value: lead.city, inline: true },
            { name: "Pet parent type", value: petLabel, inline: true },
            {
              name: "Agreed to Terms & Privacy",
              value: yesNo(lead.acceptTerms),
              inline: true,
            },
            {
              name: "Happy to be contacted",
              value: yesNo(lead.acceptContact),
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Discord webhook failed (${res.status})`);
  }
}

export function PrebookModal({
  open,
  onOpenChange,
  initialPetType = null,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPetType?: PetType | null;
}) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PrebookValues>({
    resolver: zodResolver(prebookSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      acceptTerms: false,
      acceptContact: false,
    },
  });

  const petType = watch("petType");
  const acceptTerms = watch("acceptTerms");
  const acceptContact = watch("acceptContact");

  useEffect(() => {
    if (!open) return;
    const picked = initialPetType ?? readLastPetType();
    if (picked) {
      setValue("petType", picked, { shouldValidate: true, shouldDirty: Boolean(initialPetType) });
    }
  }, [open, initialPetType, setValue]);

  const selectPetType = (value: PetType) => {
    setValue("petType", value, { shouldValidate: true, shouldDirty: true });
    rememberPetType(value);
  };

  const onSubmit = handleSubmit(async (values) => {
    rememberPetType(values.petType);
    saveLead(values);
    try {
      await notifyDiscord(values);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    }
  });

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      window.setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 200);
      if (window.location.hash === "#prebook") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[min(92svh,100dvh)] w-[calc(100%-1.5rem)] overflow-y-auto overscroll-contain border-border bg-card p-5 sm:w-full sm:max-w-md sm:rounded-2xl sm:p-6">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-brand" />
            <DialogHeader className="mt-4 items-center">
              <DialogTitle className="font-display text-2xl">You're on the list</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Thanks for joining as a founding pet parent. We'll reach out with launch details and
                next steps.
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              className="mt-8 rounded-full bg-gradient-brand px-8 text-primary-foreground"
              onClick={() => handleOpenChange(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Be a founding pet parent</DialogTitle>
              <DialogDescription>
                Launch price under ₹7,000. One quick form - fully refundable.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <PetTypeStrip
                value={petType}
                onChange={selectPetType}
                error={errors.petType?.message}
              />

              <Field label="Full name" error={errors.name?.message}>
                <Input placeholder="Your name" autoComplete="name" {...register("name")} />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  {...register("email")}
                />
              </Field>

              <Field label="Phone" error={errors.phone?.message}>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  {...register("phone")}
                />
              </Field>

              <Field label="City" error={errors.city?.message}>
                <Input placeholder="Mumbai" autoComplete="address-level2" {...register("city")} />
              </Field>

              <div className="space-y-3">
                <ConsentCheck
                  checked={acceptTerms === true}
                  error={errors.acceptTerms?.message}
                  onCheckedChange={(checked) =>
                    setValue("acceptTerms", checked, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-foreground underline underline-offset-2">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-foreground underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </ConsentCheck>

                <ConsentCheck
                  checked={acceptContact === true}
                  error={errors.acceptContact?.message}
                  onCheckedChange={(checked) =>
                    setValue("acceptContact", checked, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  I'm happy to be contacted about my founding pet parent reservation.
                </ConsentCheck>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-full bg-gradient-brand text-primary-foreground shadow-brand"
              >
                {isSubmitting ? "Submitting..." : "Be A Founding Pet Parent"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PetTypeStrip({
  value,
  onChange,
  error,
}: {
  value?: PetType;
  onChange: (value: PetType) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2.5">
      <Label className="text-sm font-normal text-muted-foreground">
        Who&apos;s joining with you?
      </Label>
      <div
        className="grid grid-cols-2 gap-2"
        role="radiogroup"
        aria-label="Pet parent type"
      >
        {petOptions.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                "active:scale-[0.98]",
                selected
                  ? "border-brand shadow-md shadow-brand/15"
                  : "border-border hover:border-brand/40",
              )}
            >
              <span className="relative block aspect-[5/4] w-full overflow-hidden bg-surface-2">
                <img
                  src={option.image}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                {selected ? (
                  <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-sm">
                    <CheckCircle2 className="h-3 w-3" aria-hidden />
                  </span>
                ) : null}
              </span>
              <span
                className={cn(
                  "block px-2 py-2 text-center font-display text-sm",
                  selected ? "text-brand" : "text-foreground",
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function ConsentCheck({
  checked,
  error,
  onCheckedChange,
  children,
}: {
  checked: boolean;
  error?: string;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-start gap-3 text-sm leading-snug text-muted-foreground">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          className="mt-0.5"
        />
        <span>{children}</span>
      </label>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
