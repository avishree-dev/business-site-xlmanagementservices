const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add("show");
      animateObserver.unobserve(entry.target);
    }

  });
},{
  threshold:0.2
});

document.querySelectorAll(".animate-on-scroll").forEach(el => {
  animateObserver.observe(el);
});


const stats = document.querySelectorAll('.stat-item');
const counters = document.querySelectorAll('.counter');

function startCounter(counter){
  const target = +counter.getAttribute('data-target');
  const speed = 200;

  const updateCount = () => {
    const count = +counter.innerText.replace(/,/g, "");
    const increment = Math.max(target / speed, 1);

    if(count < target){
      counter.innerText = Math.ceil(count + increment).toLocaleString();
      setTimeout(updateCount,10);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  updateCount();
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){

      entry.target.classList.add('show');

      const counter = entry.target.querySelector('.counter');
      if(!counter.classList.contains("counted")){
        startCounter(counter);
        counter.classList.add("counted");
      }

      statsObserver.unobserve(entry.target);
    }
  });
});

stats.forEach(stat => statsObserver.observe(stat));

const processSection = document.querySelector(".process");
const steps = document.querySelectorAll(".process-step");
const marker = document.querySelector(".timeline-marker");
const progress = document.querySelector(".timeline-progress");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      steps.forEach((step, index) => {

        setTimeout(() => {

          step.classList.add("active");

          const position = step.offsetLeft + step.offsetWidth / 2;

          marker.style.left = position + "px";
          progress.style.width = position + "px";

        }, index * 650);

      });

      observer.unobserve(processSection);

    }

  });

}, { threshold: 0.3 });

observer.observe(processSection);