import './style.css';

const style = {
  bg: '#241c1c',
  wall: 'rgb(108,83,83)',
  l: 'rgba(255,0,255,0.3)',
}

function getWalls(_width: number, height: number) {
  const bg = `<rect width="1600" height="${height - 100}" style="fill:${style.wall};" />`;
  const floorPerspective = `
    <polygon
      points="-2,${height - 148} -2,${height - 98} 500,${height - 98}"
      style="fill:${style.bg}"
    />
  `;
  const roofPespective = `
    <polygon
      points="0,200 0,250 500,80 500,30"
      style="fill:${style.bg}"
    />
  `;
  const internalFloor = `
    <polygon
      points="0,50 160,0 420,0 580,50"
      style="fill:${style.bg}"
    />
  `;
  return `
    <svg width="1600" height="${height}" style="width: 1600px; height: ${height}px" viewBox="0 0 1600 ${height}" preserveAspectRatio="true">
      ${bg}
      ${floorPerspective}
      ${mirror(floorPerspective)}
      ${roofPespective}
      ${mirror(roofPespective)}
      ${pillar(480, 50)}
      ${pillar(1600 - 520, 50)}
      ${move(roofPespective, 601, 0)}
      ${move(mirror(roofPespective), -601, 0)}
      <rect x="680" y="91" width="240" height="50" style="fill:${style.bg};" />
      <rect x="500" y="141" width="580" height="480" style="fill:${style.wall};" />
      ${pillar(660, 92)}
      ${pillar(1600 - 700, 92)}
      ${move(internalFloor, 500, 617)}
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

function move(content: string, x: number, y: number) {
  return `
    <g transform="translate(${x},${y})">${content}</g>
  `
}

function runApp() {
  const root = document.querySelector<HTMLDivElement>('#app');
  if(!root) {
    return
  }
  root.innerHTML = getWalls(window.innerWidth, window.innerHeight);
}

runApp();
