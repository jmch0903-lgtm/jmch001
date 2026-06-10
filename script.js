document.addEventListener('DOMContentLoaded', () => {

  /* 1. Header Scroll Effect */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* 2. Mobile Nav Toggle */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* 3. FAQ Accordion */
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* 4. Intersection Observer for Fade-in Animations */
  const fadeElements = document.querySelectorAll('.fade-in-element');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });

  /* 5. Highlight Nav Link on Scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset for header
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* 6. Mouse Hover Glow Effect for Curriculum Cards */
  const cards = document.querySelectorAll('.curriculum-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* 7. Button Ripple Effect */
  const rippleButtons = document.querySelectorAll('.ripple-effect');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      
      let ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'ripple';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* 8. Count-Up Animation for Stats */
  const counters = document.querySelectorAll('.counter');
  const statsSection = document.querySelector('.stats');
  
  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const isFloat = counter.getAttribute('data-target').includes('.');
    const duration = 2000; // 2 seconds animation
    const stepTime = 30; // 30ms updates
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        counter.textContent = isFloat ? target.toFixed(1) : Math.round(target).toLocaleString('ko-KR');
      } else {
        counter.textContent = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString('ko-KR');
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => countUp(counter));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* 9. Floating QR Code Close Handler */
  const qrCloseBtn = document.getElementById('qr-close');
  const qrContainer = document.getElementById('floating-qr');
  
  if (qrCloseBtn && qrContainer) {
    qrCloseBtn.addEventListener('click', () => {
      qrContainer.classList.add('hidden');
    });
  }
});
