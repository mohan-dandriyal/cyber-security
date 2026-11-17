"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion as useMotionPreference } from "framer-motion";

const subscribe = () => () => {};
const serverSnapshot = () => false;

// Use the same initial markup on the server and during hydration.
export function useReducedMotion() {
  const preference = useMotionPreference();
  return useSyncExternalStore(subscribe, () => preference ?? false, serverSnapshot);
}
