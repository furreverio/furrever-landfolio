import { type ReactNode } from "react";
import { usePrebook } from "./prebook-context";

export function PrebookButton({
  children = "Be A Founding Pet Parent",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { openPrebook } = usePrebook();

  return (
    <button type="button" onClick={() => openPrebook()} className={className}>
      {children}
    </button>
  );
}
