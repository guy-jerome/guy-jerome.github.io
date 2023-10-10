document.addEventListener("DOMContentLoaded", function () {
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
  
    // Initialize the images
    for (let i = 0; i < ducks.length; i++) {
      ducks[i].src = images[i];
    }
  
    scrollLeft.addEventListener("click", () => {
      duckStart++;
      for (let i = 0; i < ducks.length; i++) {
        ducks[i].src = images[(duckStart + i) % images.length];
      }
    });
  
    scrollRight.addEventListener("click", () => {
      duckStart--;
      if (duckStart < 0) duckStart = images.length - 1;
      for (let i = 0; i < ducks.length; i++) {
        ducks[i].src = images[(duckStart + i) % images.length];
      }
    });
  });
  