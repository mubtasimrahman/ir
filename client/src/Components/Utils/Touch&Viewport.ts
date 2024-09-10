// Check for touchscreen and viewport width under 992px
export function isTouchScreenAndSmallViewport(): boolean {
  return (
    window.innerWidth < 992 &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}
