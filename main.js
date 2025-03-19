// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  // Scale effect on hover over links and buttons
  const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.opacity = '0.5';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '1';
    });
  });
});

// Header scroll effect
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');

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
  
  // Animate hamburger to X
  const bars = document.querySelectorAll('.bar');
  if (menuToggle.classList.contains('active')) {
    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Animate stats counter when in viewport
const stats = document.querySelectorAll('.stat-number');
let counted = false;

function animateStats() {
  if (isInViewport(document.querySelector('.stats')) && !counted) {
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      let count = 0;
      const duration = 2000; // ms
      const increment = Math.ceil(target / (duration / 16)); // 60fps
      
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = count;
        }
      }, 16);
    });
    
    counted = true;
  }
}

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 200);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 500);
      }
    });
  });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = 'Enviar Mensagem';
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    }
  });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input');
    const submitBtn = newsletterForm.querySelector('button');
    
    if (emailInput.value) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        emailInput.value = '';
        
        setTimeout(() => {
          submitBtn.innerHTML = 'Inscrever';
        }, 3000);
      }, 2000);
    }
  });
}

// Scroll animations
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Animate elements when they come into view
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .contact-item');
  
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animate');
    }
  });
  
  animateStats();
}

// Initial check and scroll event
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const shapes = document.querySelectorAll('.shape');
  
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
  
  shapes.forEach((shape, index) => {
    shape.style.transform = `translateY(${scrollPosition * (0.1 * (index + 1))}px)`;
  });
});

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
});
