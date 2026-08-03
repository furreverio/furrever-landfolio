import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PrebookModal } from "./PrebookModal";

type PrebookContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openPrebook: () => void;
};

const PrebookContext = createContext<PrebookContextValue | null>(null);

export function PrebookProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openPrebook = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#prebook") {
        setOpen(true);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, openPrebook }),
    [open, openPrebook],
  );

  return (
    <PrebookContext.Provider value={value}>
      {children}
      <PrebookModal open={open} onOpenChange={setOpen} />
    </PrebookContext.Provider>
  );
}

export function usePrebook() {
  const ctx = useContext(PrebookContext);
  if (!ctx) {
    throw new Error("usePrebook must be used within PrebookProvider");
  }
  return ctx;
}

export function PrebookButton({
  children = "Pre-book now",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { openPrebook } = usePrebook();
  return (
    <button type="button" onClick={openPrebook} className={className}>
      {children}
    </button>
  );
}
