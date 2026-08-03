import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
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

const prebookSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[+\d][\d\s-]{8,}$/, "Enter a valid phone number"),
  city: z.string().trim().min(2, "Enter your city"),
  petType: z.enum(["dog", "cat", "both"], {
    required_error: "Select your pet type",
  }),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: "Please accept the terms to continue",
  }),
});

type PrebookValues = z.infer<typeof prebookSchema>;

const STORAGE_KEY = "furrever-prebook-leads";

function saveLead(values: Omit<PrebookValues, "acceptTerms">) {
  const entry = {
    ...values,
    acceptedAt: new Date().toISOString(),
  };
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, entry]));
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry]));
  }
}

export function PrebookModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
    },
  });

  const petType = watch("petType");
  const acceptTerms = watch("acceptTerms");

  const onSubmit = handleSubmit(async (values) => {
    const { acceptTerms: _accepted, ...lead } = values;
    saveLead(lead);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
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
                Thanks for pre-booking. We'll reach out with launch details and next steps.
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
              <DialogTitle className="font-display text-2xl">Pre-book Furrever</DialogTitle>
              <DialogDescription>
                Launch price under ₹7,000. Leave your details and we'll reserve your spot.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="mt-2 space-y-4">
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

              <div className="space-y-2">
                <Label>Pet type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["dog", "Dog"],
                      ["cat", "Cat"],
                      ["both", "Both"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setValue("petType", value, { shouldValidate: true, shouldDirty: true })
                      }
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm transition-colors",
                        petType === value
                          ? "border-brand bg-brand/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-brand/40",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors.petType ? (
                  <p className="text-xs text-destructive">{errors.petType.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-3 text-sm leading-snug text-muted-foreground">
                  <Checkbox
                    checked={acceptTerms === true}
                    onCheckedChange={(checked) =>
                      setValue("acceptTerms", checked === true, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className="mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms" className="text-foreground underline underline-offset-2">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-foreground underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    , and I'm happy to be contacted about my pre-booking.
                  </span>
                </label>
                {errors.acceptTerms ? (
                  <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-full bg-gradient-brand text-primary-foreground shadow-brand"
              >
                {isSubmitting ? "Submitting..." : "Confirm pre-book"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
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
