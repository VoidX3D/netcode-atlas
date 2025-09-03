// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initNavbar();
  initScrollEffects();
  initAnimations();
  initAccessibility();
});

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const userAvatar = document.querySelector('.user-avatar');
  const userDropdown = document.querySelector('.user-dropdown');
  
  // Sticky navbar on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', 
        navMenu.classList.contains('active').toString());
    });
  }
  
  // User dropdown toggle
  if (userAvatar && userDropdown) {
    userAvatar.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    });
  }
  
  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Scroll effects and animations
function initScrollEffects() {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.fade-in');
  
  const revealOnScroll = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', revealOnScroll);
  // Trigger once on load
  window.addEventListener('load', revealOnScroll);
}

// Animation helpers
function initAnimations() {
  // Add animation class to elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  animatedElements.forEach(element => {
    const animation = element.getAttribute('data-animate');
    element.classList.add('animate__animated', `animate__${animation}`);
  });
}

// Accessibility features
function initAccessibility() {
  // Add keyboard navigation to dropdowns
  const dropdownTriggers = document.querySelectorAll('[aria-haspopup="true"]');
  
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.classList.add('skip-link');
  skipLink.textContent = 'Skip to main content';
  document.body.prepend(skipLink);
  
  skipLink.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.focus();
      setTimeout(() => target.removeAttribute('tabindex'), 1000);
    }
  });
}

// Toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Close notification">×</button>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Add show class after a delay
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Close button functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => hideToast(toast));
  
  // Auto hide after 5 seconds
  setTimeout(() => hideToast(toast), 5000);
}

function hideToast(toast) {
  toast.classList.remove('show');
  setTimeout(() => toast.remove(), 300);
}

// Add toast styles dynamically
const toastStyles = `
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg);
  color: var(--text);
  padding: 1rem;
  border-radius: var(--radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-left: 4px solid var(--primary);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10000;
  max-width: 350px;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

.toast-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.toast-close {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-success {
  border-left-color: #4ade80;
}

.toast-error {
  border-left-color: #f87171;
}

.toast-warning {
  border-left-color: #fbbf24;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: var(--bg);
  padding: 0.5rem 1rem;
  z-index: 10000;
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", navMenu.classList.contains("active"));
});
