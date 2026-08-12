import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const pageSections = [
  { id: "top", label: "Launch" },
  { id: "care", label: "Care" },
  { id: "collar", label: "Collar" },
  { id: "scores", label: "Scores" },
  { id: "lifestyle", label: "Activity" },
  { id: "science", label: "Science" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "FAQ" },
  { id: "prebook", label: "Join" },
] as const;

export function SectionNav() {
  const [active, setActive] = useState<string>(pageSections[0].id);

  useEffect(() => {
    const onScroll = () => {
      const trigger = 96 + (window.visualViewport?.offsetTop ?? 0);
      let current = pageSections[0].id;

      for (const section of pageSections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger) {
          current = section.id;
        }
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-2 rounded-full border border-white/8 bg-black/25 px-2 py-3 backdrop-blur-md">
        {pageSections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => goTo(section.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to ${section.label}`}
                className="group relative flex h-4 w-8 items-center justify-end"
              >
                <span className="pointer-events-none absolute right-full mr-3 hidden rounded-md bg-black/70 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 opacity-0 whitespace-nowrap shadow-sm backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 xl:block">
                  {section.label}
                </span>
                <span
                  className={cn(
                    "block h-px rounded-full transition-all duration-300",
                    isActive
                      ? "w-5 bg-brand"
                      : "w-2.5 bg-white/35 group-hover:w-3.5 group-hover:bg-white/70",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
