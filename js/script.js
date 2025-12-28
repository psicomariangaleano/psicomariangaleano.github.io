/**
 * Main JavaScript for Psicóloga María Angélica Galeano Website
 * Author: Juan Sebastián Frásica
 * Year: 2026
 */

// ===================================
// LIGHTBOX FUNCTIONALITY
// ===================================

const galleryImages = [
  './assets/images/IMG_1986.jpeg',
  './assets/images/IMG_1965.jpeg',
  './assets/images/IMG_1983.jpeg'
];

let currentImageIndex = 0;

/**
 * Opens the lightbox at the specified image index
 * @param {number} index - Index of the image to display
 */
function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  
  if (!lightbox || !img) {
    console.error('Lightbox elements not found');
    return;
  }
  
  img.src = galleryImages[currentImageIndex];
  img.alt = `Imagen ${currentImageIndex + 1} del consultorio psicológico`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the lightbox
 * @param {Event} event - Click event
 */
function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
    event.stopPropagation();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
}

/**
 * Changes the displayed image in the lightbox
 * @param {number} direction - Direction to move (-1 for previous, 1 for next)
 * @param {Event} event - Click event
 */
function changeImage(direction, event) {
  event.stopPropagation();
  
  currentImageIndex += direction;
  
  // Wrap around if at the beginning or end
  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }
  
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = galleryImages[currentImageIndex];
      img.alt = `Imagen ${currentImageIndex + 1} del consultorio psicológico`;
      img.style.opacity = '1';
    }, 150);
  }
}

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', function(event) {
  const lightbox = document.getElementById('lightbox');
  
  if (lightbox && lightbox.classList.contains('active')) {
    switch(event.key) {
      case 'Escape':
        event.preventDefault();
        closeLightbox({ target: lightbox });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        changeImage(-1, event);
        break;
      case 'ArrowRight':
        event.preventDefault();
        changeImage(1, event);
        break;
    }
  }
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add keyboard accessibility to gallery items
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add shadow when scrolled
  if (scrollTop > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ===================================
// LAZY LOADING FOR IMAGES (Native)
// ===================================

// Modern browsers support native lazy loading
// Images already have loading="lazy" attribute in HTML

// ===================================
// FORM VALIDATION (if forms are added in future)
// ===================================

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validates phone number format (Colombia)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
function isValidPhone(phone) {
  const regex = /^(\+57)?3\d{9}$/;
  return regex.test(phone.replace(/\s/g, ''));
}

// ===================================
// ANALYTICS & TRACKING (Future)
// ===================================

/**
 * Tracks button clicks for analytics
 * @param {string} buttonName - Name of the button clicked
 */
function trackButtonClick(buttonName) {
  // Google Analytics 4 event tracking (when implemented)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'button_click', {
      'button_name': buttonName
    });
  }
}

// Add tracking to CTA buttons
document.querySelectorAll('.btn-primary, .btn-white').forEach(button => {
  button.addEventListener('click', function() {
    const buttonText = this.textContent.trim();
    trackButtonClick(buttonText);
  });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Preload critical images
const criticalImages = [
  './assets/images/marian.JPG'
];

criticalImages.forEach(src => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hola! ', 'color: #D81B60; font-size: 20px; font-weight: bold;');
console.log('%c¿Eres desarrollador? Este sitio fue creado con ❤️ por Juan Sebastián Frásica', 'color: #666; font-size: 12px;');
console.log('%cLinkedIn: https://www.linkedin.com/in/sebastianfrasic/', 'color: #0077B5; font-size: 12px;');

// ===================================
// ERROR HANDLING
// ===================================

window.addEventListener('error', function(event) {
  console.error('Error capturado:', event.error);
  // En producción, enviar errores a servicio de monitoreo
});

// ===================================
// EXPORT FUNCTIONS (if using modules)
// ===================================

// If using ES6 modules, export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    openLightbox,
    closeLightbox,
    changeImage,
    isValidEmail,
    isValidPhone,
    trackButtonClick
  };
}