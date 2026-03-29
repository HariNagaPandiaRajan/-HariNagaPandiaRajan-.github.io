export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('.counter');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el: HTMLElement): void {
  const target = parseInt(el.dataset.target || '0', 10);
  const duration = 1800;
  const startTime = performance.now();

  function update(now: number): void {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(eased * target);

    el.textContent = String(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
