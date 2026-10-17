/*
 * Shared performance utilities.
 * Detection happens once; weak hardware & phones get the light experience.
 */

export function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory ?? 4;
  const saveData = navigator.connection?.saveData;
  return cores <= 2 || memory <= 2 || saveData === true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/*
 * Touch-first devices (phones & tablets). Most phones report 6-8 cores,
 * so hardware specs alone cannot find them — check UA + pointer type.
 * Mobile GPUs choke on backdrop-filter & large blurred layers, so they
 * get the same light treatment as low-end hardware.
 */
export function isMobileDevice() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  const uaDataMobile = navigator.userAgentData?.mobile;
  const uaMobile =
    uaDataMobile ??
    /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(
      navigator.userAgent || "",
    );
  const touchOnly = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  )?.matches;
  return Boolean(uaMobile || touchOnly);
}

/* Heaviest decorative effects (glow orbs, blurred layers, particles)
   are skipped for: low-end hardware, phones/tablets, reduced-motion users. */
export const LIGHT_EFFECTS =
  isLowEndDevice() || isMobileDevice() || prefersReducedMotion();

export function useStaticBackground() {
  return LIGHT_EFFECTS;
}
