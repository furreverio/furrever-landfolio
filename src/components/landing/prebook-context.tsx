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

export type PetType = "dog" | "cat";

const PET_MEMORY_KEY = "furrever-last-pet-type";

export function readLastPetType(): PetType | null {
  try {
    const value = localStorage.getItem(PET_MEMORY_KEY);
    if (value === "dog" || value === "cat") return value;
  } catch {
    /* ignore */
  }
  return null;
}

export function rememberPetType(petType: PetType) {
  try {
    localStorage.setItem(PET_MEMORY_KEY, petType);
  } catch {
    /* ignore */
  }
}

type PrebookContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openPrebook: (petType?: PetType) => void;
  initialPetType: PetType | null;
};

const PrebookContext = createContext<PrebookContextValue | null>(null);

export function PrebookProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialPetType, setInitialPetType] = useState<PetType | null>(null);

  const openPrebook = useCallback((petType?: PetType) => {
    setInitialPetType(petType ?? null);
    setOpen(true);
  }, []);

  const handleSetOpen = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setInitialPetType(null);
  }, []);

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
    () => ({ open, setOpen: handleSetOpen, openPrebook, initialPetType }),
    [open, handleSetOpen, openPrebook, initialPetType],
  );

  return (
    <PrebookContext.Provider value={value}>
      {children}
      <PrebookModal
        open={open}
        onOpenChange={handleSetOpen}
        initialPetType={initialPetType}
      />
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
