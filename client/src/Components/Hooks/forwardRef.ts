// useFixedFooterRef.ts
import { useRef } from "react";

// Define a custom hook to create and return the reusable ref
export function useAllTradesRef() {
  return useRef<HTMLDivElement | null>(null);
}
