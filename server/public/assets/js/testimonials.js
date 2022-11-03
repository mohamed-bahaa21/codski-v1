$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [990, 1],
        itemsTablet: [768, 1],
        itemsMobile: [650, 1],
        pagination: true,
        navigation: false,
        autoPlay: true
    });
});