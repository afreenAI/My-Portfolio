document.addEventListener('DOMContentLoaded', function () {
  
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      // Toggle icon
      const icon = mobileMenuButton.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
      } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  //TypeIt
   new TypeIt("#typing-text", {
    speed: 20,
    loop: true,
    breakLines: false
  })
  .type("Undergraduate Data Science Student")
  .pause(1000)
  .delete()
  .type("Tech Enthusiast")
  .pause(1000)
  .delete()
  .type("Problem Solver")
  .pause(1000)
  .delete()
  .type("Creative Coder")
  .pause(1000)
  .delete()
  .type("Explorer of New Ideas")
  .pause(1000)
  .delete()
  .go();

  // Popup message function for success/error
  function showPopupMessage(message, type = 'success') {
    // Remove existing popup
    const existingPopup = document.querySelector('.popup-message');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.classList.add(
      'popup-message',
      'fixed',
      'top-5',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      'px-6',
      'py-3',
      'rounded',
      'shadow-lg',
      'text-white',
      'font-semibold',
      'z-50',
      'transition-opacity',
      'duration-500',
      'pointer-events-none'
    );

    // Set message text
    popup.textContent = message;

    // Apply background based on type
    if (type === 'success') {
      popup.classList.add('bg-green-600');
    } else if (type === 'error') {
      popup.classList.add('bg-red-600');
    } else {
      popup.classList.add('bg-gray-600');
    }

    // Initially hidden
    popup.style.opacity = '0';

    // Append to DOM
    document.body.appendChild(popup);

    // Fade in
    setTimeout(() => {
      popup.style.opacity = '1';
      popup.style.pointerEvents = 'auto';
    }, 50);

    // Fade out after 3s and remove
    setTimeout(() => {
      popup.style.opacity = '0';
      popup.style.pointerEvents = 'none';
      setTimeout(() => {
        popup.remove();
      }, 500);
    }, 3000);
  }

  // Form validation and AJAX submission
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      let isValid = true;

      if (!name.value.trim()) {
        highlightError(name);
        isValid = false;
      } else {
        removeError(name);
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        highlightError(email);
        isValid = false;
      } else {
        removeError(email);
      }

      if (!subject.value.trim()) {
        highlightError(subject);
        isValid = false;
      } else {
        removeError(subject);
      }

      if (!message.value.trim()) {
        highlightError(message);
        isValid = false;
      } else {
        removeError(message);
      }

      if (!isValid) {
        // no popup on invalid form, just prevent submission
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonHTML = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="w-5 h-5 flex items-center justify-center mr-2"><i class="ri-loader-4-line animate-spin"></i></span> Sending...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          showPopupMessage('Your message has been sent successfully! I will get back to you soon.', 'success');
        } else {
          showPopupMessage('Oops! Something went wrong. Please try again later.', 'error');
        }
      } catch (error) {
        showPopupMessage('Network error. Please check your connection.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    });

    function highlightError(element) {
      element.classList.add('border-red-500', 'bg-red-50');
    }

    function removeError(element) {
      element.classList.remove('border-red-500', 'bg-red-50');
    }

    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', function () {
        removeError(this);
      });
    });
  }

  // Toggle projects button
  const btn = document.getElementById('toggle-projects');
  const hiddenProjects = document.querySelectorAll('.hidden-project');
  let isExpanded = false;

  if (btn) {
    btn.addEventListener('click', () => {
      if (!isExpanded) {
        hiddenProjects.forEach(proj => proj.style.display = 'block');
        btn.querySelector('span').textContent = 'Show Less';
        isExpanded = true;
      } else {
        hiddenProjects.forEach(proj => proj.style.display = 'none');
        btn.querySelector('span').textContent = 'View All Projects';
        isExpanded = false;
      }
    });
  }
  // Skill animation function
  function animateSkill(id, targetPercent, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const radius = 80;
    const lineWidth = 10;
    let currentPercent = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawCircle(percent) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background circle (gray)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - lineWidth / 2, 0, 2 * Math.PI);
      ctx.strokeStyle = "#e5e7eb"; // Tailwind's gray-200
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Progress arc
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius - lineWidth / 2,
        -Math.PI / 2,
        (2 * Math.PI * percent) / 100 - Math.PI / 2
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    function animate() {
      drawCircle(currentPercent);

      const label = document.querySelector(`.percent-label[data-id="${id}"]`);
      if (label) label.textContent = currentPercent + "%";

      if (currentPercent < targetPercent) {
        currentPercent++;
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  // Skill Circle Animation on Scroll (every time)
  const skills = [
    { id: "Python", percent: 70, color: "#3776AB" },
    { id: "Java", percent: 60, color: "#5382a1" },
    { id: "HTML", percent: 90, color: "#e44d26" },
    { id: "CSS", percent: 75, color: "#2965f1" },
    { id: "JavaScript", percent: 68, color: "#FAC826" },
    { id: "C", percent: 75, color: "#00599C" },
    { id: "MySQL", percent: 70, color: "#4479A1" }
  ];

  function animateSkill(id, percent, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;
    const lineWidth = 10;
    let currentPercent = 0;

    const percentLabel = document.querySelector(`.percent-label[data-id="${id}"]`);
    if (!percentLabel) return;

    function drawCircle(p) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Foreground progress
      ctx.beginPath();
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (2 * Math.PI * (p / 100));
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.stroke();
    }

    function animate() {
      if (currentPercent <= percent) {
        drawCircle(currentPercent);
        percentLabel.textContent = `${currentPercent}%`;
        currentPercent++;
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  const skillsSection = document.querySelector("#skills");

  if (skillsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skills.forEach(skill => animateSkill(skill.id, skill.percent, skill.color));
        }
      });
    }, { threshold: 0.1 });

    observer.unobserve(skillsSection);
  }

  // Certificate Modal logic
  function openCertificateModal(imagePath) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');
    modalImage.src = imagePath;
    modal.classList.remove('hidden');
  }

  function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.add('hidden');
  }

  // Make functions globally accessible if called from HTML buttons
  window.openCertificateModal = openCertificateModal;
  window.closeCertificateModal = closeCertificateModal;

  // Animate education cards on scroll
  const eduCards = document.querySelectorAll('.education-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        eduCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 300); // 300ms stagger delay
        });
      } else {
        eduCards.forEach(card => {
          card.classList.remove('visible');
        });
      }
    });
  }, {
    threshold: 0.4
  });

  const educationSection = document.querySelector('#education');
  if (educationSection) {
    observer.observe(educationSection);
  }
});




