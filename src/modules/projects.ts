export function initProjects(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const searchInput = document.getElementById('project-search') as HTMLInputElement | null;
  const cards = document.querySelectorAll<HTMLElement>('.project-card');

  if (cards.length === 0) return;

  let activeFilter = 'all';
  let searchTerm = '';

  function filterCards(): void {
    cards.forEach((card) => {
      const category = card.dataset.category || '';
      const tags = (card.dataset.tags || '').toLowerCase();
      const title = (card.querySelector('.project-card__title')?.textContent || '').toLowerCase();

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch =
        searchTerm === '' ||
        tags.includes(searchTerm) ||
        title.includes(searchTerm);

      const isVisible = matchesFilter && matchesSearch;
      card.classList.toggle('is-hidden', !isVisible);

      // Re-trigger animation
      if (isVisible) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s, transform 0.4s';
            card.style.opacity = '1';
            card.style.transform = 'none';
          });
        });
      }
    });
  }

  // Filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      activeFilter = btn.dataset.filter || 'all';
      filterCards();
    });
  });

  // Search
  searchInput?.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    filterCards();
  });
}
