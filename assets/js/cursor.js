const folder = "assets/images/cursor1";
const frameCount = 8; 
const frames = [];

for (let i = 1; i <= frameCount; i++) {
  const imgPath = `${folder}/frame${i}.png`;
  frames.push(imgPath);
  
  const preloadImg = new Image();
  preloadImg.src = imgPath; 
}

let index = 0;
const fps = 10;
const customCursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
  customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

setInterval(() => {
  customCursor.style.backgroundImage = `url('${frames[index]}')`;
  index = (index + 1) % frames.length;
}, 2000 / fps);