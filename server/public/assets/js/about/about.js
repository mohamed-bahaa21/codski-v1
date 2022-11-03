/*jslint browser: true*/
/*global $, jQuery ,AOS*/

// var str = $('p').html();
// str = str.replace(/&nbsp;/g, ' ');
// $('#ckeditor').html(str);

(function ($) {
    "use strict";
    var $window = $(window),
        $body = $('body'),
        $horizonMenu = $('.horizon-header');

    /*START PRELOADER JS & REFRESH AOS*/
    $window.on('load', function () {
        $('.preloader').delay(350).fadeOut('slow');
        AOS.refresh();
    });
    /*END PRELOADER JS & REFRESH AOS*/


    $(document).ready(function () {

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

    });

}(jQuery));