import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useConsent } from "./context";

export function ConsentChip() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);

  if (!consent?.ready || consent.consent !== "rejected") return null;

  return (
    <div className="pointer-events-none fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 sm:right-5">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto text-[11px] text-white/35 hover:text-white/60"
        >
          Analytics
        </button>
      ) : (
        <div className="pointer-events-auto flex items-center gap-2 text-[11px] text-white/45">
          <Link to="/privacy" className="hover:text-white/70">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <button type="button" onClick={consent.reject} className="hover:text-white/70">
            No
          </button>
          <button type="button" onClick={consent.accept} className="hover:text-white/70">
            Allow
          </button>
        </div>
      )}
    </div>
  );
}
