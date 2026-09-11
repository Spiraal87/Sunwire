// Run after React commits the newly selected content, not during hydration.
export function revealContent(id: string, mobileOnly = true) {
  if (mobileOnly && !window.matchMedia("(max-width: 767px)").matches) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) return;
    const header = document.querySelector("body header.sticky");
    const offset = (header?.getBoundingClientRect().height ?? 80) + 16;
    target.focus({ preventScroll: true });
    window.scrollTo({
      top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }));
}
