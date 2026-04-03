/*
 * Fading Background — scroll-driven section crossfade for Squarespace
 * © 2026 Unmilaya Studio — unmilayastudio.com
 *
 * Permission is granted to use this script on personal and commercial websites.
 * This script may NOT be resold, redistributed, or included in templates
 * or digital products for sale without written permission from Unmilaya Studio.
 *
 * Requires: GSAP + ScrollTrigger (loaded separately)
 * Install:  Paste the <script> tag into Settings > Advanced > Code Injection > Footer
 */

(function () {
  "use strict";

  // How many px before the section reaches the top of the viewport
  // the crossfade begins. Increase for a longer, more gradual dissolve.
  var START_DISTANCE = 200;

  function init() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("Unmilaya Fading Background: GSAP or ScrollTrigger not found.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var sections = document.querySelectorAll(".page-section");

    if (!sections.length) {
      console.warn("Unmilaya Fading Background: no .page-section elements found.");
      return;
    }

    // Keep footer above fixed background layers
    gsap.set("footer", { zIndex: 999 });

    sections.forEach(function (section, index) {

      var bg = section.querySelector(".section-background");

      if (!bg) return;

      // Make each section background a fixed full-screen layer
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

      // Lift section content above background layers
      var overlay = section.querySelector(".section-background-overlay");
      if (overlay) {
        gsap.set(overlay, { zIndex: 50 + index });
      }

      // First section is already visible
      if (index === 0) return;

      // Fade each subsequent background in as it scrolls into view
      ScrollTrigger.create({
        trigger: section,
        start: "top-=" + START_DISTANCE + "px top",
        end: "top top",
        scrub: true,
        animation: gsap.to(bg, { opacity: 1, duration: 1 }),
      });

    });

    // Recalculate on resize
    window.addEventListener("resize", function () {
      ScrollTrigger.refresh();
    });
  }

  document.addEventListener("DOMContentLoaded", init);

})();
