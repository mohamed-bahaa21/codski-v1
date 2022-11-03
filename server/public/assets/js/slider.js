jQuery(document).ready(function ($) {

    $('#checkbox').change(function () {
        setInterval(function () {
            moveRight();
        }, 3000);
    });

    var slideCount = $('#slider ul li').length + 1;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider').css({ width: slideWidth, height: slideHeight });

    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function (event) {
        event.preventDefault();
        moveLeft();
    });

    $('a.control_next').click(function (event) {
        event.preventDefault();
        moveRight();
    });

    $(function () {
        // Slideshow 3
        $("#slider3").responsiveSlides({
            auto: true,                         // Boolean: Animate automatically, true or false
            speed: 500,                         // Integer: Speed of the transition, in milliseconds
            timeout: 3000,                      // Integer: Time between slide transitions, in milliseconds
            pager: false,                       // Boolean: Show pager, true or false
            nav: false,                         // Boolean: Show navigation, true or false
            random: false,                      // Boolean: Randomize the order of the slides, true or false
            pause: false,                       // Boolean: Pause on hover, true or false
            pauseControls: true,                // Boolean: Pause when hovering controls, true or false
            prevText: "Previous",               // String: Text for the "previous" button
            nextText: "Next",                   // String: Text for the "next" button
            maxwidth: "",                       // Integer: Max-width of the slideshow, in pixels
            navContainer: "",                   // Selector: Where controls should be appended to, default is after the 'ul'
            manualControls: '#slider3-pager',   // Selector: Declare custom pager navigation
            namespace: "rslides",               // String: Change the default namespace used
            before: function () { },            // Function: Before callback
            after: function () { }              // Function: After callback
        });

    });

});
