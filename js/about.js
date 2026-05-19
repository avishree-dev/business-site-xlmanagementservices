const modal = document.getElementById("infraModal");
const modalImg = document.getElementById("infraModalImg");
const counter = document.getElementById("infraCounter");
const images = document.querySelectorAll(".infra-card-img img");

let currentIndex = 0;
let isZoomed = false;

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