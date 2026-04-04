/*
 * Fading Background — scroll-driven section crossfade for Squarespace
 * © 2026 Unmilaya Studio — unmilayastudio.com
 *
 * Permission is granted to use this script on personal and commercial websites.
 * This script may NOT be resold, redistributed, or included in templates
 * or digital products for sale without written permission from Unmilaya Studio.
 *
 * Requires: GSAP + ScrollTrigger (loaded separately)
 * Install:  Paste the <script> tags into Settings > Advanced > Code Injection > Footer
 */

(function () {
  "use strict";

  var START_DISTANCE = 200;

  function init() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("Unmilaya Fading Background: GSAP or ScrollTrigger not found.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var sections = document.querySelectorAll(".page-section");

    if (!sections.length) return;

    gsap.set("footer", { zIndex: 999, position: "relative" });

    sections.forEach(function (section, index) {

      var bg = section.querySelector(".section-background");
      if (!bg) return;

      gsap.set(bg, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: index === 0 ? 1 : 0,
        pointerEvents: "none",
        zIndex: 5 + index,
      });

      var content = section.querySelector(".content-wrapper");
      if (content) {
        content.style.position = "relative";
        content.style.zIndex = 200;
      }

      if (index === 0) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top-=" + START_DISTANCE + "px top",
        end: "top top",
        scrub: true,
        animation: gsap.to(bg, { opacity: 1, duration: 1 }),
      });

    });

    window.addEventListener("resize", function () {
      ScrollTrigger.refresh();
    });
  }

  document.addEventListener("DOMContentLoaded", init);

})();
