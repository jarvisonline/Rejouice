function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locoScroll();

function cursorEffect() {
  var page1Content = document.querySelector("#page1-content");

  var cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });
  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}

cursorEffect();

function page2Animation() {
  gsap.from("#page2-top h3,#page2-top h4", {
    y: 120,
    duration: 1.5,
    scrollTrigger: {
      trigger: "#anime",
      scroller: "#main",
      start: "top",
      end: "top",
      scrub: 2,
    },
  });
  gsap.from(".elem h1", {
    y: 120,
    stagger: 0.5,
    duration: 1.5,
    scrollTrigger: {
      trigger: "#anime",
      scroller: "#main",
      start: "top",
      end: "top",
      scrub: 2,
    },
  });

  gsap.fromTo(
    "hr",
    { scaleX: 0, transformOrigin: "left center" }, // Start state
    {
      scaleX: 1,
      duration: 10,
      delay: 3,
      scrollTrigger: {
        trigger: "#anime",
        scroller: "#main",
        start: "top",
        end: "top",
        scrub: 3,
      },
    }
  );
}

page2Animation();

var tl = gsap.timeline();

tl.from("#loader h3", {
  x: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
});
tl.to("#loader h3", {
  x: -15,
  duration: 1,
  opacity: 0,
  stagger: 0.1,
});
tl.to("#loader", {
  opacity: 0,
});
tl.from("#page1-content h1 span", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5,
  delay: -0.5,
});
tl.to("#loader", {
  display: "none",
});

function menuAnim() {
  const menuBtn = document.querySelector("#menu");
  const menu = document.querySelector("#page1 .menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector("#page1 .menu #menu-content #close");
  const closeMoBtn = document.querySelector(
    "#page1 .mobile-menu #menu-content #close"
  );
  const video = document.querySelector("#video-box video");
  const playReel = document.querySelector(".menu-sec #video-box .play");
  const Links = document.querySelectorAll(
    ".menu .menu-sec .links h2, .menu .menu-sec .links button"
  );
  const moLinks = document.querySelectorAll(".mobile-menu .menu-sec .links h2");

  menuBtn.addEventListener("click", () => {
    gsap.to(mobileMenu, {
      top: 0,
      duration: 1.5,
      opacity: 1,
    });
    gsap.from(moLinks, {
      x: 500,
      duration: 1,
      stagger: 0.5,
    });
  });
  menuBtn.addEventListener("click", () => {
    gsap.to(menu, {
      top: 0,
      duration: 1.5,
      opacity: 1,
    });

    gsap.from(video, {
      scale: 0.1,
      duration: 2,
    });
    gsap.from(playReel, {
      y: 100,
      duration: 1.1,
      opacity: 0,
    });

    gsap.from(Links, {
      x: 700,
      duration: 0.7,
      stagger: 0.1,
    });
  });
  closeBtn.addEventListener("click", () => {
    gsap.to(menu, {
      top: "-100vh",
      duration: 1.5,
      opacity: 0,
    });
  });
  closeMoBtn.addEventListener("click", () => {
    gsap.to(mobileMenu, {
      top: "-100vh",
      duration: 1.5,
      opacity: 0,
    });
  });
}

menuAnim();
