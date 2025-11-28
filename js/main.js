document.addEventListener('DOMContentLoaded', () => {
  // ===== BURGER MENU TOGGLE =====
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  const searchBtn = document.querySelector(".header__search-btn");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
      
      if (window.innerWidth <= 1600 && searchBtn) {
        searchBtn.classList.toggle("visible");
      }
    });
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  function observeElements(selector, options = { threshold: 0.3 }) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(el => {
      if (window.getComputedStyle(el).display !== 'none') {
        observer.observe(el);
      }
    });
  }

  // Apply animations to sections
  observeElements('.about__paragraph, .about__block');
  observeElements('.stages__title, .stages__item', { threshold: 0.2 });
  observeElements('.advantages__item, .advantages__bottom-title, .advantages__bottom-text, .advantages__mobile-item');

  // ===== ADVANTAGES SECTION ANIMATIONS =====
  const advantagesContainer = document.querySelector('.advantages__container');
  const advantagesItems = document.querySelectorAll(
    '.advantages__item, .advantages__bottom-title, .advantages__bottom-text, .advantages__mobile-item'
  );

  if (advantagesContainer && advantagesItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          advantagesItems.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, index * 150);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(advantagesContainer);
  }

  // ===== VIDEO PLAYER CONTROLS =====
  const video = document.querySelector('.advantages__video');
  const playBtn = document.querySelector('.advantages__play');

  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      video.play();
      playBtn.style.opacity = '0';
      playBtn.style.pointerEvents = 'none';
    });

    video.addEventListener('pause', () => {
      playBtn.style.opacity = '1';
      playBtn.style.pointerEvents = 'auto';
    });

    video.addEventListener('ended', () => {
      playBtn.style.opacity = '1';
      playBtn.style.pointerEvents = 'auto';
    });
  }

  // ===== CIRCULAR SVG ANIMATION =====
  const svgContainer = document.querySelector(".advantages__svg");
  if (svgContainer) {
    const size = 824;
    const radius = 440;
    const stroke = 1.6;
    const center = size / 2;
    const ringColor = "rgba(48,70,28,0.3)";
    const pointColor = "#30461C";

    svgContainer.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svgContainer.innerHTML = "";
    svgContainer.style.transform = "translate(-50%, -50%) rotate(-90deg)";
    const svgNS = "http://www.w3.org/2000/svg";

    // Convert polar coordinates to Cartesian
    function polarToCartesian(cx, cy, r, deg) {
      const rad = (deg - 90) * Math.PI / 180;
      return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad)
      };
    }

    // Create arc path
    const startAngle = 150;
    const endAngle = 390;
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    const arc = document.createElementNS(svgNS, "path");
    arc.setAttribute("d", `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`);
    arc.setAttribute("fill", "none");
    arc.setAttribute("stroke", ringColor);
    arc.setAttribute("stroke-width", stroke);
    svgContainer.appendChild(arc);

    // Create points around the circle
    [60, 120, 180, 240, 300].forEach(deg => {
      const pos = polarToCartesian(center, center, radius, deg + 90);
      const dot = document.createElementNS(svgNS, "circle");
      dot.setAttribute("cx", pos.x);
      dot.setAttribute("cy", pos.y);
      dot.setAttribute("r", 6);
      dot.setAttribute("fill", pointColor);
      svgContainer.appendChild(dot);
    });
  }
});

