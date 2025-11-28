"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // ===== BURGER MENU TOGGLE =====
  var burger = document.querySelector(".header__burger");
  var nav = document.querySelector(".header__nav");
  var searchBtn = document.querySelector(".header__search-btn");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      nav.classList.toggle("active");

      if (window.innerWidth <= 1600 && searchBtn) {
        searchBtn.classList.toggle("visible");
      }
    });
  } // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====


  function observeElements(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      threshold: 0.3
    };
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, options);
    elements.forEach(function (el) {
      if (window.getComputedStyle(el).display !== 'none') {
        observer.observe(el);
      }
    });
  } // Apply animations to sections


  observeElements('.about__paragraph, .about__block');
  observeElements('.stages__title, .stages__item', {
    threshold: 0.2
  });
  observeElements('.advantages__item, .advantages__bottom-title, .advantages__bottom-text, .advantages__mobile-item'); // ===== ADVANTAGES SECTION ANIMATIONS =====

  var advantagesContainer = document.querySelector('.advantages__container');
  var advantagesItems = document.querySelectorAll('.advantages__item, .advantages__bottom-title, .advantages__bottom-text, .advantages__mobile-item');

  if (advantagesContainer && advantagesItems.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          advantagesItems.forEach(function (el, index) {
            setTimeout(function () {
              el.classList.add('visible');
            }, index * 150);
          });
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    observer.observe(advantagesContainer);
  } // ===== VIDEO PLAYER CONTROLS =====


  var video = document.querySelector('.advantages__video');
  var playBtn = document.querySelector('.advantages__play');

  if (video && playBtn) {
    playBtn.addEventListener('click', function () {
      video.play();
      playBtn.style.opacity = '0';
      playBtn.style.pointerEvents = 'none';
    });
    video.addEventListener('pause', function () {
      playBtn.style.opacity = '1';
      playBtn.style.pointerEvents = 'auto';
    });
    video.addEventListener('ended', function () {
      playBtn.style.opacity = '1';
      playBtn.style.pointerEvents = 'auto';
    });
  } // ===== CIRCULAR SVG ANIMATION =====


  var svgContainer = document.querySelector(".advantages__svg");

  if (svgContainer) {
    // Convert polar coordinates to Cartesian
    var polarToCartesian = function polarToCartesian(cx, cy, r, deg) {
      var rad = (deg - 90) * Math.PI / 180;
      return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad)
      };
    }; // Create arc path


    var size = 824;
    var radius = 440;
    var stroke = 1.6;
    var center = size / 2;
    var ringColor = "rgba(48,70,28,0.3)";
    var pointColor = "#30461C";
    svgContainer.setAttribute("viewBox", "0 0 ".concat(size, " ").concat(size));
    svgContainer.innerHTML = "";
    svgContainer.style.transform = "translate(-50%, -50%) rotate(-90deg)";
    var svgNS = "http://www.w3.org/2000/svg";
    var startAngle = 150;
    var endAngle = 390;
    var largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    var start = polarToCartesian(center, center, radius, endAngle);
    var end = polarToCartesian(center, center, radius, startAngle);
    var arc = document.createElementNS(svgNS, "path");
    arc.setAttribute("d", "M ".concat(start.x, " ").concat(start.y, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArc, " 0 ").concat(end.x, " ").concat(end.y));
    arc.setAttribute("fill", "none");
    arc.setAttribute("stroke", ringColor);
    arc.setAttribute("stroke-width", stroke);
    svgContainer.appendChild(arc); // Create points around the circle

    [60, 120, 180, 240, 300].forEach(function (deg) {
      var pos = polarToCartesian(center, center, radius, deg + 90);
      var dot = document.createElementNS(svgNS, "circle");
      dot.setAttribute("cx", pos.x);
      dot.setAttribute("cy", pos.y);
      dot.setAttribute("r", 6);
      dot.setAttribute("fill", pointColor);
      svgContainer.appendChild(dot);
    });
  }
});