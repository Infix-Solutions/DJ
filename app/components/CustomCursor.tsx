import type { RefObject } from "react";

type CustomCursorProps = {
  dotRef: RefObject<HTMLDivElement | null>;
  ringRef: RefObject<HTMLDivElement | null>;
};

export function CustomCursor({ dotRef, ringRef }: CustomCursorProps) {
  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
