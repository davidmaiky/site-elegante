// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateStats() {
  if (hasAnimated) return;
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateStat = () => {
      current += step;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateStat);
      } else {
        stat.textContent = target;
      }
    };
    
    updateStat();
  });
  
  hasAnimated = true;
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Trigger animations when scrolling
window.addEventListener('scroll', () => {
  const aboutSection = document.querySelector('#about');
  if (isInViewport(aboutSection)) {
    animateStats();
  }
});

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || filter === category) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Form label animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    if (input.value === '') {
      input.parentElement.classList.remove('focused');
    }
  });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    console.log('Form submitted:', { name, email, subject, message });
    
    // Reset form
    contactForm.reset();
    
    // Show success message (you can replace this with a more elegant solution)
    alert('Mensagem enviada com sucesso!');
  });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input').value;
    
    // Here you would typically send the email to a server
    console.log('Newsletter subscription:', email);
    
    // Reset form
    newsletterForm.reset();
    
    // Show success message
    alert('Inscrição realizada com sucesso!');
  });
}

// Add dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize any animations or effects that should run on page load
  
  // Reveal animations for sections as they come into view
  const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .about-image');
  
  function revealOnScroll() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on initial load
});
