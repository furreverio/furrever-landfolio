import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAnalytics, type PrebookSource } from "@/lib/analytics";
import { PrebookModal } from "./PrebookModal";

export type { PrebookSource };

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
  openPrebook: (petType?: PetType, source?: PrebookSource) => void;
  initialPetType: PetType | null;
};

const PrebookContext = createContext<PrebookContextValue | null>(null);

export function PrebookProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialPetType, setInitialPetType] = useState<PetType | null>(null);

  const openPrebook = useCallback((petType?: PetType, source: PrebookSource = "header") => {
    setInitialPetType(petType ?? null);
    setOpen(true);
    const props = petType ? { source, pet_type: petType } : { source };
    getAnalytics().track("prebook_opened", props);
  }, []);

  const handleSetOpen = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setInitialPetType(null);
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#prebook") {
        setOpen((was) => {
          if (!was) getAnalytics().track("prebook_opened", { source: "hash" });
          return true;
        });
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
