export function initFaceLighting(): void {
  const allContainers = document.querySelectorAll<HTMLElement>(
    '.face-container, .about-photo__frame'
  );
  if (allContainers.length === 0) return;

  let scrollY = window.scrollY;
  let ticking = false;

  function updateLighting(): void {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / Math.max(maxScroll, 1), 1);

    const lightX = 25 + progress * 50;
    const lightY = 15 + progress * 60;
    const glowAngle = progress * 360;

    allContainers.forEach((container) => {
      container.style.setProperty('--light-x', `${lightX}%`);
      container.style.setProperty('--light-y', `${lightY}%`);
      container.style.setProperty('--glow-angle', `${glowAngle}deg`);
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateLighting);
      ticking = true;
    }
  }, { passive: true });

  // Mouse-interactive light for BOTH hero face and about photo
  allContainers.forEach((container) => {
    container.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty('--light-x', `${x}%`);
      container.style.setProperty('--light-y', `${y}%`);
    }, { passive: true });

    container.addEventListener('mouseleave', () => {
      container.style.setProperty('--light-x', '50%');
      container.style.setProperty('--light-y', '30%');
    });
  });

  updateLighting();
}
