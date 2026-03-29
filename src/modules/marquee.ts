const MARQUEE_ROW_1: [string, string][] = [
  ['devicon-angular-plain', 'Angular'],
  ['devicon-typescript-plain', 'TypeScript'],
  ['devicon-nestjs-original', 'NestJS'],
  ['devicon-postgresql-plain', 'PostgreSQL'],
  ['devicon-redis-plain', 'Redis'],
  ['fa-solid fa-message', 'RabbitMQ'],
  ['devicon-dotnetcore-plain', '.NET'],
  ['devicon-docker-plain', 'Docker'],
  ['fa-solid fa-bolt', 'WebSocket'],
  ['devicon-azure-plain', 'Azure'],
  ['devicon-graphql-plain', 'GraphQL'],
  ['fa-solid fa-shield-halved', 'Security'],
];

const MARQUEE_ROW_2: [string, string][] = [
  ['devicon-react-original', 'React'],
  ['devicon-nodejs-plain', 'Node.js'],
  ['fa-solid fa-diagram-project', 'TypeORM'],
  ['devicon-rxjs-plain', 'RxJS'],
  ['fa-solid fa-magnifying-glass', 'Typesense'],
  ['devicon-mysql-plain', 'MySQL'],
  ['fa-solid fa-plug', 'REST'],
  ['fa-solid fa-key', 'JWT'],
  ['devicon-css3-plain', 'SCSS'],
  ['devicon-jest-plain', 'Jest'],
  ['fa-solid fa-list-check', 'Agile'],
  ['fa-solid fa-arrows-spin', 'CI/CD'],
];

function renderPill([icon, label]: [string, string]): string {
  return `<div class="marquee__pill"><i class="${icon}"></i><span>${label}</span></div>`;
}

export function initMarquee(): void {
  const track1 = document.getElementById('marquee-1');
  const track2 = document.getElementById('marquee-2');

  if (track1) {
    track1.innerHTML = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map(renderPill).join('');
  }

  if (track2) {
    track2.innerHTML = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map(renderPill).join('');
  }
}
