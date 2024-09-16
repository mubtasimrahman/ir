// Check for touchscreen and viewport width under 992px
export function isTouchScreenAndSmallViewport(): boolean {
  return (
    window.innerWidth < 992 &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}

export function getOperatingSystem(): string {
  const userAgent = window.navigator.userAgent.toLowerCase();
  console.log(userAgent);
  if (userAgent.includes("win")) {
    return "Windows";
  } else if (userAgent.includes("android")) {
    return "Android";
  } else if (userAgent.includes("linux")) {
    return "Linux";
  } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
    return "iOS";
  } else if (userAgent.includes("macintosh")) {
    return "macOS";
  } else {
    return "Unknown";
  }
}
