import './styles/index.css';

import { initLoader } from './modules/loader';
import { initParticles } from './modules/particles';
import { initCursor } from './modules/cursor';
import { initNavbar } from './modules/navbar';
import { initTyping } from './modules/typing';
import { initFaceLighting } from './modules/face-lighting';
import { initScrollAnimations, initProgressBar, initBackToTop } from './modules/scroll';
import { initCounters } from './modules/counters';
import { initMarquee } from './modules/marquee';
import { initProjects } from './modules/projects';
import { initContactForm } from './modules/contact';

// Boot immediately — loader handles the visual wait
initLoader();

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursor();
  initNavbar();
  initTyping();
  initFaceLighting();
  initScrollAnimations();
  initProgressBar();
  initBackToTop();
  initCounters();
  initMarquee();
  initProjects();
  initContactForm();
});
