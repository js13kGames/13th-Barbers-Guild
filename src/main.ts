import './style.css';
import {createWalls} from './walls';


function runApp() {
  const root = document.querySelector<HTMLDivElement>('#app');
  if(!root) {
    return
  }
  root.innerHTML = createWalls();
}

runApp();
