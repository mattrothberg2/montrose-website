(function () {
  // Mobile nav
  const toggle = document.querySelector(".nav__toggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => observer.observe(el));

  // --- Google Analytics Custom Tracking ---
  
  // Track Clicks on Buttons and Links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a, button');
    if (!link) return;

    // specific tracking for .btn class or nav links
    if (link.matches('.btn, .navbar__links a, .brand')) {
        const text = link.innerText.trim() || link.getAttribute('aria-label') || 'Icon';
        const url = link.getAttribute('href');
        
        // Send event to GA4
        if (typeof gtag === 'function') {
            gtag('event', 'click_cta', {
                'event_category': 'engagement',
                'event_label': text,
                'link_url': url
            });
        }
    }
  });

  // Track Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'generate_lead', {
                'event_category': 'form',
                'event_label': 'contact_form'
            });
        }
    });
  }

})();
