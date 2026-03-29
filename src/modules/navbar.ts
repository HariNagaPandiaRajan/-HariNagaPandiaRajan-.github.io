export function initNavbar(): void {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__link');
  const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-menu__link');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');

  if (!nav) return;

  // Scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 60);
    highlightActiveSection();
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    mobileMenu?.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('is-active');
      mobileMenu?.classList.remove('is-open');
      hamburger?.setAttribute('aria-expanded', 'false');
      mobileMenu?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for data-scroll-to buttons
  document.querySelectorAll<HTMLElement>('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.scrollTo;
      if (targetId) {
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        hamburger?.classList.remove('is-active');
        mobileMenu?.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Active section highlighting
  function highlightActiveSection(): void {
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('nav__link--active', isActive);
    });
  }
}
