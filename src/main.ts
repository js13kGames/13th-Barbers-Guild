import './style.css';

const style = {
  bg: '#241c1c',
}

function getWalls() {
  const bg = `<rect width="1600" height="1100" style="fill:rgb(108,83,83);" />`;
  const floorPerspective = `
    <polygon
      points="-2,952 -2,1102 500,1102"
      style="fill:${style.bg}"
    />
  `;
  const roofPespective = `
    <polygon
      points="0,200 0,250 500,80 500,30"
      style="fill:${style.bg}"
    />
  `;
  return `
    <svg style="height: 100%" viewBox="0 0 1600 1200"  preserveAspectRatio="true">
      ${bg}
      ${floorPerspective}
      ${mirror(floorPerspective)}
      ${roofPespective}
      ${mirror(roofPespective)}
      ${pillar(480, 50)}
      ${pillar(1600 - 500, 50)}
    </svg>
  `;
}

function pillar(x: number, y: number) {
  return `
    <rect x="${x}" y="${y}" width="20" height="1100" style="fill:${style.bg};" />
  `
}

function mirror(content: string) {
  return `
    <g style="transform: scale(-1, 1); transform-origin: center">${content}</g>;
  `
}

function runApp() {
  const root = document.querySelector<HTMLDivElement>('#app');
  if(!root) {
    return
  }
  root.innerHTML = getWalls();
}

runApp();
