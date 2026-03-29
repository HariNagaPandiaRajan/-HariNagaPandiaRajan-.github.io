export function initCursor(): void {
  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  window.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth follower
  function animateFollower(): void {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower!.style.left = `${followerX}px`;
    follower!.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover detection
  const hoverTargets = 'a, button, .project-card, .skill-card, .chip, .filter-btn, input, textarea, select';
  document.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(hoverTargets)) {
      cursor.classList.add('is-hovering');
      follower.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(hoverTargets)) {
      cursor.classList.remove('is-hovering');
      follower.classList.remove('is-hovering');
    }
  });
}
