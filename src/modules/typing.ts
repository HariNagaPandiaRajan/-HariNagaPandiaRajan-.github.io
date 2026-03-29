const ROLES: string[] = [
  'Full Stack Developer',
  'Angular Specialist',
  'NestJS Engineer',
  'Backend Architect',
  'Security Practitioner',
];

export function initTyping(): void {
  const el = document.getElementById('typing-text');
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function tick(): void {
    if (isPaused) {
      isPaused = false;
      setTimeout(tick, 1200);
      return;
    }

    const currentWord = ROLES[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el!.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        isPaused = true;
      }
      setTimeout(tick, 60 + Math.random() * 30);
    } else {
      charIndex--;
      el!.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }
      setTimeout(tick, 30);
    }
  }

  setTimeout(tick, 600);
}
