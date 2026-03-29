export function initTestimonials(): void {
  const track = document.getElementById('testimonial-track') as HTMLElement | null;
  const dotsContainer = document.getElementById('testimonial-dots') as HTMLElement | null;
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll<HTMLElement>('.testimonial-card');
  const totalCards = cards.length;
  if (totalCards === 0) return;

  let currentIndex = 0;
  let autoPlayTimer: ReturnType<typeof setInterval>;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  // Create dots
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('is-active');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index: number): void {
    currentIndex = Math.max(0, Math.min(index, totalCards - 1));
    const card = cards[currentIndex];
    const offset = card.offsetLeft - track!.offsetLeft;
    track!.style.transform = `translateX(-${offset}px)`;

    // Update dots
    dotsContainer!.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  function next(): void {
    goTo((currentIndex + 1) % totalCards);
  }

  // Auto-play
  function startAutoPlay(): void {
    autoPlayTimer = setInterval(next, 5000);
  }

  function stopAutoPlay(): void {
    clearInterval(autoPlayTimer);
  }

  // Drag support
  track.addEventListener('mousedown', (e: MouseEvent) => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = currentIndex;
    stopAutoPlay();
  });

  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    const diff = e.pageX - startX;
    if (Math.abs(diff) > 60) {
      if (diff < 0 && currentIndex < totalCards - 1) {
        goTo(currentIndex + 1);
      } else if (diff > 0 && currentIndex > 0) {
        goTo(currentIndex - 1);
      }
      isDragging = false;
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      startAutoPlay();
    }
  });

  // Touch support
  track.addEventListener('touchstart', (e: TouchEvent) => {
    startX = e.touches[0].pageX;
    stopAutoPlay();
  }, { passive: true });

  track.addEventListener('touchend', (e: TouchEvent) => {
    const diff = e.changedTouches[0].pageX - startX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
    startAutoPlay();
  }, { passive: true });

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();
}
