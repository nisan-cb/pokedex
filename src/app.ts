import { Manager } from "./scripts/manager";


window.addEventListener('load', () => {
  console.log("Let's start")
  const contentDiv = document.getElementById('content') as HTMLElement;
  const manager = new Manager(contentDiv);
  manager.render();
});

