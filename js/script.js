let menuToggle = document.querySelector('.toggle');
let menu = document.querySelector('.menu');
menuToggle.onclick = function () {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
};

const list = document.querySelectorAll('li');
function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) => item.addEventListener('click', activeLink));

// Animación con delay antes de redirigir
list.forEach((item) => {
    const link = item.querySelector('a');
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Evita navegación inmediata
        const target = link.getAttribute('href'); // Obtén el destino

        // Aplica la animación
        link.classList.add('animate-click');

        // Redirige después de x segundos (tiempo de animación)
        setTimeout(() => {
            if (target.startsWith('#')) {
                document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = target;
            }
        }, 1000);
    });
});

// Seleccionamos todos los enlaces del menú
const menuLinks = document.querySelectorAll('.menu li a');

menuLinks.forEach(link => {
  // Al pasar el mouse por encima
  link.addEventListener('mouseenter', () => {
    if (!link.classList.contains('clicked')) {
      link.classList.add('show-label');
    }
  });

  // Al salir el mouse, reseteamos el estado
  link.addEventListener('mouseleave', () => {
    link.classList.remove('show-label');
    link.classList.remove('clicked');
  });

  // Al hacer click
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Evita la navegación inmediata
    // Forzamos que se muestre el ícono (quitando la clase show-label) y añadimos clicked
    link.classList.remove('show-label');
    link.classList.add('clicked');
    // Opcional: se activa la animación de click que ya tenías
    link.classList.add('animate-click');
    const target = link.getAttribute('href');
    setTimeout(() => {
      if (target.startsWith('#')) {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = target;
      }
    }, 1000);
  });
});



// Seleccionamos todas las imágenes dentro de .list
const images = document.querySelectorAll('.list img');
const modal = document.getElementById('myModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Función para abrir el modal y mostrar una imagen
function openModal(index) {
    const img = images[index];
    modal.style.display = 'block';
    modalImg.src = img.src;
    currentIndex = index;
}

// Función para cambiar a la siguiente imagen
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

// Función para cambiar a la imagen anterior
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

// Event listeners para abrir el modal
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openModal(index);
    });
});

// Event listeners para cerrar el modal
closeBtn.addEventListener('click', () => {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
    }, 300);
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('closing');
        }, 300);
    }
});

// Event listeners para navegar entre imágenes
document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width") + "%"; // Obtener porcentaje
        bar.style.width = "0%"; // Asegurar que comienza vacío
        
        setTimeout(() => {
            bar.style.width = targetWidth; // Aplicar el ancho correcto
        }, 300); // Pequeño retraso para hacer visible la animación
    });
});

