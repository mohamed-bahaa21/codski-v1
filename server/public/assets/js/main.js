/*jslint browser: true*/
/*global $, jQuery ,AOS*/
(function ($) {
    "use strict";
    var $window = $(window),
        $body = $('body'),
        $horizonMenu = $('.horizon-header'),
        $countUp = $('.fact-box h5'),
        $otherFeaturesSlider = $('.other-features-slider'),
        $screenshotsSlider = $('.screenshots-slider'),
        $testimonialSslider = $('.testimonial-slider'),
        $teamSlider = $('.team-slider'),
        $logosSlider = $('.logos-slider'),
        $recentNewsSlider = $('.recent-news-slider');

    /*START PRELOADER JS & REFRESH AOS*/
    $window.on('load', function () {
        // $('.preloader').delay(350).fadeOut('slow');
        // AOS.refresh();
        $(".stack").addClass("loaded");
    });

    if (window.matchMedia('(max-width: 768px)').matches) {
        $('#hero-right').insertBefore('#hero-left')
    }

    /*END PRELOADER JS & REFRESH AOS*/
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //>=, not <=
        var currentLink = $(this);
        if (scroll >= 500) {
            //clearHeader, not clearheader - caps H
            $(".stack").removeClass("loaded");
            $(".rslides").css('opacity', "1");
            $("#mySidenav").css('opacity', "0");
            $("#mySidenav2").css('opacity', "0");
        } else if (scroll >= 50) {
            $horizonMenu.addClass("sticky");
            $("#page_progress").addClass("prog_sticky");
        } else {
            $horizonMenu.removeClass("sticky");
            $("#page_progress").removeClass("prog_sticky");
            $(".stack").addClass("loaded");
            $(".rslides").css('opacity', "0.1");
            $("#mySidenav").css('opacity', "1");
            $("#mySidenav2").css('opacity', "1");
        }
    }); //missing );


    $(document).ready(function () {
        $('.dropdown-toggle').on('click', function () {
            $(this).siblings('.submenu').toggleClass('submenu_display');
        });

        $('.themes-colors span').on('click', function () {
            $('.themes-colors').toggleClass('open');
        });

        $('.themes-colors ul li a').on('click', function () {
            var styleSrc = $(this).attr("data-style");
            $('.themes-colors ul li').removeClass('active');
            $('#themes_colors').attr("href", "assets/css/" + styleSrc + ".css");
            $(this).parent().toggleClass('active');
        });

        /*START AOS JS*/
        AOS.init({
            disable: 'mobile',
            once: true,
            duration: 600
        });
        /*END AOS JS*/

        /*START SCROLL SPY JS*/
        $body.scrollspy({
            target: '#main_menu',
        });
        /*END SCROLL SPY JS*/

        /*START MENU JS*/
        $('a.anchor').on('click', function (e) {
            var anchor = $(this);
            var ancAtt = $(anchor.attr('href'));
            $('html, body').stop().animate({
                scrollTop: ancAtt.offset().top
            }, 1000);
            e.preventDefault();
        });
        /*END MENU JS*/

        /*START OTHER FEATURES SLIDER JS*/
        if ($otherFeaturesSlider.length > 0) {
            $otherFeaturesSlider.slick({
                centerMode: true,
                centerPadding: '150px',
                slidesToShow: 3,
                infinite: false,
                focusOnSelect: true,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {}
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '0',
                    }
                },
                ]
            });
        }
        /*END OTHER FEATURES SLIDER JS*/

        /*START SCREENSHOTS SLIDER JS*/
        if ($screenshotsSlider.length > 0) {
            $screenshotsSlider.slick({
                centerMode: true,
                centerPadding: '150px',
                slidesToShow: 3,
                infinite: false,
                focusOnSelect: true,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {}
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '0',
                    }
                },
                ]
            });
        }
        /*END SCREENSHOTS SLIDER JS*/

        /*START TESTIMONIAL SLIDER JS*/
        if ($testimonialSslider.length > 0) {
            $testimonialSslider.slick({
                centerPadding: '150px',
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                infinite: false,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {}
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                ]
            });
        }
        /*END TESTIMONIAL SLIDER JS*/

        /*START COUNTUP JS*/
        $countUp.counterUp({
            delay: 10,
            time: 2000
        });
        /*END COUNTUP JS*/

        /*START TEAM SLIDER JS*/
        if ($teamSlider.length > 0) {
            $teamSlider.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
                infinite: false,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {}
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                ]
            });
        }
        /*END TEAM SLIDER JS*/

        /*START LOGOS SLIDER JS*/
        if ($logosSlider.length > 0) {
            $logosSlider.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                dots: false,
                infinite: false,
                arrows: true,
                responsive: [{
                    breakpoint: 1200,
                    settings: {}
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                ]
            });
        }
        /*END LOGOS SLIDER JS*/

        /*START RECENT NEWS SLIDER JS*/
        if ($recentNewsSlider.length > 0) {
            $recentNewsSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                infinite: false,
                arrows: false,
                responsive: [{
                    breakpoint: 1200,
                    settings: {}
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                ]
            });
        }
        /*END RECENT NEWS SLIDER JS*/

    });

}(jQuery));

// 
$('li#contact-route').click(function () {
    positionabout = $('#contact').offset().top - $('.horizon-header').height() * 2;
    $("html, body").animate({
        scrollTop: positionabout
    }, '500', 'swing');
})