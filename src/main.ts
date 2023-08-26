import './style.css';
import {createWalls} from './walls';
import {createShadow} from './shadow';

function runApp() {
  const root = document.querySelector<HTMLDivElement>('#app');
  if(!root) {
    return
  }
  root.innerHTML = `<svg width="720" height="900" viewBox="0 0 720 900">${createWalls()}${createShadow()}</svg>`;
}

runApp();
