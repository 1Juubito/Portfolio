const folder = "assets/images/cursor1";  
const frameCount = 8; 

const frames = [];

for (let i = 1; i <= frameCount; i++) {
  frames.push(`${folder}/frame${i}.png`);
}

let index = 0;
const fps = 10;

setInterval(() => {
  document.body.style.cursor = `url(${frames[index]}), auto`;
  index = (index + 1) % frames.length;
}, 2000 / fps);