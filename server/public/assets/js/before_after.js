$(document).on('click', '.map-point-sm', function (e) {
    var show = $(this).data('show');

    $(show).removeClass("hide").siblings().addClass("hide");
    $(this).addClass("mlod_link_active").siblings().removeClass("mlod_link_active");
});

$("#slider").on("input change", (e) => {
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $(".foreground-img").css("width", `${sliderPos}%`);
    // Update the position of the slider button
    $(".slider-button").css("left", `calc(${sliderPos}% - 18px)`);
});

$("#slider2").on("input change", (e) => {
    const sliderPos2 = e.target.value;
    // Update the width of the foreground image
    $(".foreground-img2").css("width", `${sliderPos2}%`);
    // Update the position of the slider button
    $(".slider-button2").css("left", `calc(${sliderPos2}% - 18px)`);
});

$("#slider3").on("input change", (e) => {
    const sliderPos3 = e.target.value;
    // Update the width of the foreground image
    $(".foreground-img3").css("width", `${sliderPos3}%`);
    // Update the position of the slider button
    $(".slider-button3").css("left", `calc(${sliderPos3}% - 18px)`);
});
