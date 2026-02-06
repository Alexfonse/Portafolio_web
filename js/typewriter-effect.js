/**
 * Typewriter Effect for Profile Name
 * Types out text character by character with a blinking cursor.
 */

document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('profile-name');
    if (!element) return;

    const textToType = element.getAttribute('data-typing-text') || element.innerText;
    element.innerText = ''; // Clear initial text
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '|';
    element.appendChild(cursor);

    let charIndex = 0;
    const typeSpeed = 100; // ms per char
    const startDelay = 500; // ms before starting

    function type() {
        if (charIndex < textToType.length) {
            // Insert character before cursor
            const char = textToType.charAt(charIndex);
            const textNode = document.createTextNode(char);
            element.insertBefore(textNode, cursor);
            
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            // Typing finished
            
            // 1. Remove cursor after short delay
            setTimeout(() => {
                cursor.style.display = 'none'; // Hide cursor
                
                // 2. Add glitch class to the H1 element
                element.classList.add('glitch-active');
            }, 1000); // Wait 1s after typing before hiding cursor and starting glitch
        }
    }

    setTimeout(type, startDelay);
});
