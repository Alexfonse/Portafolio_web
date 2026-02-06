/**
 * Arcane Flowchart Zoom & Pan Logic
 * Handles mouse wheel, drag-to-pan, and touch gestures.
 */

let scale = 1;
let panning = false;
let pointX = 0;
let pointY = 0;
let startX = 0;
let startY = 0;
const zoomSpeed = 0.1;
const flowContent = document.getElementById('arcane-flow-content');
const flowWrapper = document.querySelector('.flow-viewport-wrapper');

function setTransform() {
    flowContent.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

/* --- MOUSE CONTROLS --- */

flowWrapper.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startX = e.clientX - pointX;
    startY = e.clientY - pointY;
    panning = true;
    flowContent.style.cursor = 'grabbing';
});

flowWrapper.addEventListener('mouseup', () => {
    panning = false;
    flowContent.style.cursor = 'grab';
});

flowWrapper.addEventListener('mouseleave', () => {
    panning = false;
    flowContent.style.cursor = 'grab';
});

flowWrapper.addEventListener('mousemove', (e) => {
    if (!panning) return;
    e.preventDefault();
    pointX = e.clientX - startX;
    pointY = e.clientY - startY;
    setTransform();
});

flowWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    const newScale = Math.min(Math.max(0.5, scale + delta), 3); // Limit zoom 0.5x to 3x
    scale = newScale;
    setTransform();
});

/* --- TOUCH CONTROLS (Mobile) --- */
let initialDist = 0;
let initialScale = 1;

flowWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        // Pinch start
        initialDist = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        initialScale = scale;
    } else if (e.touches.length === 1) {
        // Pan start
        startX = e.touches[0].clientX - pointX;
        startY = e.touches[0].clientY - pointY;
        panning = true;
    }
});

flowWrapper.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent page scroll
    
    if (e.touches.length === 2) {
        // Pinch zoom
        const dist = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        const delta = dist - initialDist;
        // Sensitivity factor for pinch
        const pinchSpeed = 0.005; 
        scale = Math.min(Math.max(0.5, initialScale + delta * pinchSpeed), 3);
        setTransform();
    } else if (e.touches.length === 1 && panning) {
        // Pan move
        pointX = e.touches[0].clientX - startX;
        pointY = e.touches[0].clientY - startY;
        setTransform();
    }
});

/* --- BUTTON CONTROLS --- */

window.flowZoom = function(delta) {
    scale = Math.min(Math.max(0.5, scale + delta), 3);
    setTransform();
}

window.flowReset = function() {
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
}
