// script.js
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 0.5,
    easing: (t) => t * (2 - t),
    smooth: true,
  });

  // Update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});

var timeout;
const circle = document.querySelector("#miniCircle");
let lastMouseX = 0;
let lastMouseY = 0;
let scrollY = 0;

function firstPageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: "0",
    duration: "1.5",
    ease: Expo.easeInOut,
    stagger: ".1",
  })
    .from(".boundingElm", {
      y: "-120%",
      stagger: "0.2",
      delay: "-.5",
    })
    .from("#herofotter", {
      y: "130%",
      opacity: "0",
      stagger: ".1",
    })
    .to("#miniCircle", {
      opacity: "100",
    });
}

const updateCirclePosition = (xScale, yScale) => {
  const translateY = lastMouseY + scrollY - 5; // Adjust for the -5 offset
  circle.style.transform = `translate(${
    lastMouseX - 5
  }px, ${translateY}px) scale(${xScale}, ${yScale})`;
  requestAnimationFrame(updateCirclePosition);
};
window.addEventListener("mousemove", (e) => {
  clearTimeout(timeout);
  let xScale = gsap.utils.clamp(0.6, 1.2, e.clientX - lastMouseX);
  let yScale = gsap.utils.clamp(0.6, 1.2, e.clientY - lastMouseY);

  updateCirclePosition(xScale, yScale);

  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  timeout = setTimeout(() => {
    updateCirclePosition(1, 1);
  }, 100);
});
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});
requestAnimationFrame(updateCirclePosition);

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mousemove", (dets) => {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    console.log("done");

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      display: "block",
      ease: Power1,
      top: diff - 125,
      left: dets.clientX - 125,
      rotate: gsap.utils.clamp(-15, 15, diffrot),
    });
  });

  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      display: "none",
      ease: Power1,
    });
  });
});

updateCirclePosition();
firstPageAnimation();
