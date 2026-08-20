import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-white.png";
import { PrebookButton } from "@/components/landing/PrebookButton";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Furrever logo" className="h-7 w-7" />
            <span className="font-display text-xl">Furrever</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Know your pet, beyond the obvious.
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
            Locapaw Technologies Pvt Ltd
            <br />
            2nd Floor, 235, Binnamangala, 13th Cross Road, Indira Nagar, 2nd Stage, Bengaluru Urban,
            Karnataka, 560038
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
              Product
            </h3>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4">
              <li>
                <PrebookButton className="hover:text-brand">Be A Founding Pet Parent</PrebookButton>
              </li>
              <li>
                <Link to="/" className="hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
              Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4">
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
              <li>
                <Link to="/refunds" className="hover:text-brand">
                  Refund &amp; Cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 sm:px-5 sm:py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Locapaw Technologies Pvt Ltd</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="mailto:kevin@furrever.com" className="hover:text-brand">
              kevin@furrever.com
            </a>
            <a href="tel:+919686660425" className="hover:text-brand">
              9686660425
            </a>
          </div>
          <span>Made for pets, in India.</span>
        </div>
      </div>
    </footer>
  );
}
