document.addEventListener("DOMContentLoaded", () => {

  // ===== SCROLL ANIMATION =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    observer.observe(el);
  });

  // ===== COUNTERS =====
  const counters = document.querySelectorAll(".counter");

  function animateCounter(counter) {
    const target = +counter.dataset.target;
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const value = Math.floor(eased * target);
      counter.innerText = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;

        if (!counter.classList.contains("counted")) {
          animateCounter(counter);
          counter.classList.add("counted");
        }

        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ===== SCROLL PROGRESS =====
  const progressBar = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;

    const progress = (scroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  });

  // ===== IMAGE FADE =====
  document.querySelectorAll("img.lazy-fade").forEach(img => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });


  //Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  //select-buttons
  document.querySelectorAll(".enquiry-options button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".enquiry-options button")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      document.querySelector('input[name="type"]').value =
        btn.dataset.value;
    });
  });

  //Global-image Slide
    const images = document.querySelectorAll(".global-slide img");
    const slides = document.querySelectorAll(".global-slide");

    let current = 0;

    function showSlide(index) {

    slides[current].classList.remove("active");

    current = index;

    slides[current].classList.add("active");
  }

  if (slides.length > 1) {
    setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 5000);
  }

});