document.addEventListener("DOMContentLoaded", async function () {
  const slideShow = document.querySelector("#slide-show");
  const ducks = document.querySelectorAll(".duck");
  const scrollRight = document.querySelector("#scroll-right");
  const scrollLeft = document.querySelector("#scroll-left");

  const images = [
    "../../images/duck1.jpg",
    "../../images/duck2.jpg",
    "../../images/duck3.jpg",
    "../../images/duck4.jpg",
    "../../images/duck5.jpg",
  ];

  let duckStart = 0;

  // Asynchronously load and set the images
  async function loadImages() {
    for (let i = 0; i < ducks.length; i++) {
      const img = new Image();
      img.src = images[i];
      await img.decode(); // Wait for the image to be decoded (loaded).
      ducks[i].src = img.src;
    }
  }

  await loadImages(); // Load images when the page loads.

  scrollLeft.addEventListener("click", async () => {
    duckStart++;
    for (let i = 0; i < ducks.length; i++) {
      ducks[i].src = images[(duckStart + i) % images.length];
    }
  });

  scrollRight.addEventListener("click", async () => {
    duckStart--;
    if (duckStart < 0) duckStart = images.length - 1;
    for (let i = 0; i < ducks.length; i++) {
      ducks[i].src = images[(duckStart + i) % images.length];
    }
  });
});
