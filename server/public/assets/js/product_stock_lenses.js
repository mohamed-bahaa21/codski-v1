$(".question").click(function () {
    //console.log("click click!");
    $(this).toggleClass("question-active");
    $(this).next().slideToggle(300);
    $(this).children("svg.arrow").toggleClass("arrow-active");
});