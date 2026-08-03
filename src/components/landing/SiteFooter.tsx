import { Link } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-brand" />
            <span className="font-display text-xl">Furrever</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Pet health. Fitness. Longevity. Building a healthier, happier and longer life for every
            pet.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Product</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" hash="prebook" className="hover:text-brand">
                Pre-book
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-brand">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="hover:text-brand">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-brand">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Locapaw Technologies Pvt Ltd</span>
          <span>Made for pets, in India.</span>
        </div>
      </div>
    </footer>
  );
}
