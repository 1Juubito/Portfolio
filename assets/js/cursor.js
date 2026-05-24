document.addEventListener("DOMContentLoaded", () => {
    const isTouchDevice = 
        window.matchMedia("(pointer: coarse)").matches || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.innerWidth <= 768;

    const customCursor = document.getElementById('custom-cursor');

    if (isTouchDevice) {
        if (customCursor) {
            customCursor.style.display = 'none';
        }
        document.body.style.cursor = 'auto';
        
    } else {
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

        document.addEventListener('mousemove', (e) => {
            if (customCursor) {
                customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        });

        setInterval(() => {
            if (customCursor) {
                customCursor.style.backgroundImage = `url('${frames[index]}')`;
                index = (index + 1) % frames.length;
            }
        }, 2000 / fps);

        const mapaGPS = document.querySelector('iframe');
        
        if (mapaGPS && customCursor) {
            mapaGPS.addEventListener('mouseenter', () => {
                customCursor.style.opacity = '0'; 
            });
            
            mapaGPS.addEventListener('mouseleave', () => {
                customCursor.style.opacity = '1'; 
            });
        }
        
        document.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.style.opacity = '0';
            }
        });

        document.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.style.opacity = '1';
            }
        });
    }
});