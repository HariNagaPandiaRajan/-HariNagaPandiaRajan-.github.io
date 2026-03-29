export function initLoader(): void {
  // Force scroll to top on page load
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      loader.classList.add('is-hidden');
    }, 400);
  });

  // Fallback: hide after 3s regardless
  setTimeout(() => {
    loader.classList.add('is-hidden');
  }, 3000);
}
