"use strict";

const init = () => {
  console.clear();
  // gsap config
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.clearScrollMemory("manual");
  ScrollTrigger.refresh();
  if (window.innerWidth < 1024) {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
  }
  // app height
  appHeight();
  if (document.getElementById("homepage")) {
    // init loader
    initLoader();
    // logo shrink
    scrollEvents();
  }
  // lazy load
  const ll = new LazyLoad({
    threshold: 0,
  });
  // session storage loading
  // document.body.classList.remove("fadeout");
  sessionStorage.setItem("opening-displayed", !0);
};

// ===== lenis =====
const lenis = new Lenis({
  lerp: 0.05,
  smoothWheel: true,
});
lenis.on("scroll", ScrollTrigger.update);
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== init loader =====
const initLoader = () => {
  lenis.stop();
  const preloader = gsap.timeline({
    onComplete: () => {
      lenis.start();
    },
  });

  if (sessionStorage.getItem("opening-displayed") === "true") {
    document.querySelector("[data-loading]").remove();
    lenis.start();
    preloader.to("[data-fv], [data-scrolldown]", {
      opacity: 1,
    });
  } else {
    preloader
      .to("[data-loading-logo]", {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: Power4.easeInOut,
      })
      .to("[data-loading-overlay]", {
        top: 0,
        duration: 1.8,
        delay: 1,
        ease: Power4.easeOut,
      })
      .to("[data-loading]", {
        opacity: 0,
      }, "-=0.5")
      .to("[data-loading]", {
        zIndex: "-100",
      })
  }
};

// ===== app height =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== scroll events page =====
const scrollEvents = () => {
  let mmg = gsap.matchMedia(),
    breakPoint = 1024;

  // ==== create
  mmg.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isMobile } = context.conditions;

      // scroll hide header logo and scrolldown
      ScrollTrigger.create({
        trigger: "[data-offset-top]",
        start: "top+=50 top",
        end: "top top",
        toggleActions: "play none reverse none",
        markers: false,
        onEnter: () => {
          if (isMobile) {
            gsap.to("[data-scrolldown]", {
              opacity: 0,
              duration: 0.2,
            });
          }
        },
        onEnterBack: () => {
          if (isMobile) {
            gsap.to("[data-scrolldown]", {
              opacity: 1,
              duration: 0.2,
            });
          }
        },
      });
      // scroll hide chacott logo
      ScrollTrigger.create({
        trigger: "[data-anni]",
        start: "top bottom",
        end: "top bottom",
        markers: false,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(".top_chacott_inner, [data-scrolldown]", {
            opacity: 0,
            duration: 0.2,
          });
        },
        onEnterBack: () => {
          gsap.to(".top_chacott_inner, [data-scrolldown]", {
            opacity: 1,
            duration: 0.2,
          });
        },
      });
      // scroll fixed logo show/hide scrolldown
      if (isMobile) {
        // scroll sticky anni logo
        gsap.to(".anni_logo", {
          scrollTrigger: {
            trigger: ".anni",
            start: "top top",
            pin: ".anni_logo",
            markers: false,
          },
        });
      }
    }
  );
};

if (window.innerWidth < 1024) {
  ScrollTrigger.create({
    trigger: "[data-top-chacott]",
    start: "bottom bottom",
    end: "bottom bottom",
    markers: false,
    invalidateOnRefresh: true,
    onEnter: () => {
      gsap.to("[data-scrolldown]", {
        opacity: 1,
        duration: 0.2,
      });
    },
    onEnterBack: () => {
      gsap.to("[data-scrolldown]", {
        opacity: 0,
        duration: 0.2,
      });
    },
  });
}

// ===== scroll fade up content =====
const [fadeInArray] = [document.querySelectorAll("[data-fadein]")];
const addFadeOnElements = function (elements) {
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      let elem = elements[i];
      let distInView =
        elem.getBoundingClientRect().top - window.innerHeight + 100;
      if (distInView < 0) {
        elem.classList.add("--visible");
      }
    }
  }
};
"pageshow scroll".split(" ").forEach((evt) => {
  window.addEventListener(evt, function () {
    addFadeOnElements(fadeInArray)
  });
});

let panels = gsap.utils.toArray("[data-section]");
panels.pop(); // get rid of the last one (don't need it in the loop)
panels.forEach((panel, i) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "bottom bottom",
      pinSpacing: false,
      pin: true,
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
      onRefresh: () => {
        gsap.set(panel, {
          transformOrigin:
            "center " +
            (window.innerHeight + panel.offsetHeight - window.innerHeight / 2) +
            "px",
        });
      },
    },
  });
});

// ===== reszie refresh scroll trigger =====
window.addEventListener("resize", () => {
  if (window.innerWidth > 1023) {
    ScrollTrigger.refresh();
  }
});

// ===== click add fadeout =====
document.addEventListener("click", function (e) {
  const link = e.target.closest(
    'a:not([href^="#"]):not([target]):not([href^="mailto"]):not([href^="tel"])'
  );
  if (!link) return;

  e.preventDefault();
  const url = link.getAttribute("href");

  if (url && url !== "") {
    const idx = url.indexOf("#");
    const hash = idx !== -1 ? url.substring(idx) : "";

    if (hash && hash !== "#") {
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return false;
        }
      } catch (err) {
        console.error("Invalid hash selector:", hash, err);
      }
    }

    document.body.classList.add("fadeout");
    setTimeout(function () {
      window.location = url;
    }, 500);
  }

  return false;
});

// ===== click hash =====
const handleHash = function () {
  const hash = window.location.hash;
  if (hash) {
    ScrollTrigger.refresh();
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 0 },
          onComplete: () => {
            window.history.replaceState(
              null,
              document.title,
              window.location.pathname + window.location.search
            );
            gsap.to(
              "[data-scrolldown]",
              {
                opacity: 0,
              }
            );
            setTimeout(() => {
              document.body.classList.remove("fadeout");
            }, 200);
          },
        });
      }
    }, 100);
  } else {
    document.body.classList.remove("fadeout");
  }
}
"pageshow load".split(" ").forEach((evt) => {
  window.addEventListener(evt, handleHash);
});

// ===== details page =====
if (document.getElementById("detailspage")) {
  document.body.classList.remove("fadeout");
  const detailsSwiper = new Swiper(".detail_gallery", {
    breakpoints: {
      0: {
        slidesPerView: 1.235,
        spaceBetween: 15,
        allowTouchMove: true,
        draggable: true,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        draggable: false,
        allowTouchMove: false,
      },
    },
  });
}

// DOMContentLoaded
window.addEventListener("load", init);
