// this script for the v2.0 of the news section theme
var swiper = new Swiper(".news-slider", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: ".news-slider__pagination",
    clickable: true,
  },
});
