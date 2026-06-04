const modal = document.getElementById("infraModal");
const modalImg = document.getElementById("infraModalImg");
const counter = document.getElementById("infraCounter");
const images = document.querySelectorAll(".infra-slide img");
const slides = document.querySelectorAll(".infra-slide");
const dotsContainer = document.querySelector(".infra-dots");

let current = 0;
let dots

let currentIndex = 0;
let isZoomed = false;

function showSlide(index) {

  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

slides.forEach((_, index) => {
  const dot = document.createElement("button");

  dot.classList.add("infra-dot");

  if (index === 0) {
      dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
      showSlide(index);
  });

  dotsContainer.appendChild(dot);
});

dots = document.querySelectorAll(".infra-dot");

/* Open modal */
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.style.display = "flex";
  });
});

/* Show image */
function showImage() {
  modalImg.src = images[currentIndex].src;
  counter.textContent = `${currentIndex + 1} / ${images.length}`;

  preloadNext();

  // reset zoom
  modalImg.classList.remove("zoomed");
  isZoomed = false;
}

/* Preload next image */
function preloadNext() {
  const nextIndex = (currentIndex + 1) % images.length;
  const img = new Image();
  img.src = images[nextIndex].src;
}

/* Navigation */
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

/* Arrows */
document.querySelector(".infra-nav.right").onclick = nextImage;
document.querySelector(".infra-nav.left").onclick = prevImage;

/* Close */
document.querySelector(".infra-close").onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

let startX = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextImage();
    else prevImage();
  }
});

/* 🔍 Zoom (tap/click) */
modalImg.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent modal close

  isZoomed = !isZoomed;
  modalImg.classList.toggle("zoomed");
});

document.querySelector(".next").addEventListener("click", () => {
    showSlide((current + 1) % slides.length);
});

document.querySelector(".prev").addEventListener("click", () => {
    showSlide((current - 1 + slides.length) % slides.length);
});

setInterval(() => {
    showSlide((current + 1) % slides.length);
}, 5000);