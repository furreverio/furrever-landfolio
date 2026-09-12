import { type ReactNode } from "react";
import { usePrebook, type PrebookSource } from "./prebook-context";

export function PrebookButton({
  children = "Be A Founding Pet Parent",
  className,
  source,
}: {
  children?: ReactNode;
  className?: string;
  source: PrebookSource;
}) {
  const { openPrebook } = usePrebook();

  return (
    <button
      type="button"
      data-analytics-target={`prebook-${source}`}
      onClick={() => openPrebook(undefined, source)}
      className={className}
    >
      {children}
    </button>
  );
}
