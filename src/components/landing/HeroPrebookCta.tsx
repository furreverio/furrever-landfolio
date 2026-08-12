import { useEffect, useRef, useState } from "react";
import dogRunning from "@/assets/dog-running.jpg";
import catSleep from "@/assets/cat-sleep.jpg";
import { cn } from "@/lib/utils";
import { rememberPetType, usePrebook, type PetType } from "./prebook-context";

const pets: { value: PetType; label: string; image: string }[] = [
  { value: "dog", label: "Dog", image: dogRunning },
  { value: "cat", label: "Cat", image: catSleep },
];

export function HeroPrebookCta({
  variant = "hero",
}: {
  variant?: "hero" | "brand";
}) {
  const { openPrebook } = usePrebook();
  const rootRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!expanded || canHover) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setExpanded(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded, canHover]);

  const pick = (petType: PetType) => {
    rememberPetType(petType);
    setExpanded(false);
    openPrebook(petType);
  };

  const isBrand = variant === "brand";

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative h-12 w-[min(100%,20.5rem)] sm:h-14 sm:w-[22rem]",
        isBrand && "h-12 w-full max-w-xs sm:h-12 sm:w-auto sm:min-w-[16rem]",
      )}
      onMouseEnter={() => canHover && setExpanded(true)}
      onMouseLeave={() => canHover && setExpanded(false)}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-label="Be a founding pet parent"
        onClick={() => {
          if (canHover) return;
          setExpanded((open) => !open);
        }}
        className={cn(
          "absolute inset-0 rounded-full px-8 transition-all duration-300",
          isBrand
            ? "bg-gradient-brand font-medium text-primary-foreground shadow-brand"
            : "border border-brand/80 bg-black/55 px-5 font-hero text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md sm:text-[13px] sm:tracking-[0.18em]",
          expanded
            ? "pointer-events-none scale-[0.98] opacity-0"
            : isBrand
              ? "opacity-100"
              : "opacity-100 hover:border-brand hover:bg-black/70",
        )}
      >
        Be A Founding Pet Parent
      </button>

      <div
        role="group"
        aria-label="Choose dog or cat"
        className={cn(
          "absolute inset-0 overflow-hidden rounded-full border border-white/15 bg-black/70 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300",
          expanded
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0",
        )}
      >
        <div className="grid h-full grid-cols-2">
          {pets.map((pet, index) => (
            <button
              key={pet.value}
              type="button"
              onClick={() => pick(pet.value)}
              className={cn(
                "group/pet relative overflow-hidden transition-colors",
                index === 0 ? "border-r border-white/15" : "",
              )}
            >
              <img
                src={pet.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover/pet:scale-110 group-hover/pet:opacity-100"
              />
              <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />
              <span className="relative z-10 flex h-full items-center justify-center font-hero text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[13px]">
                {pet.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
