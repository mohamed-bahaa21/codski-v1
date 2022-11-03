// luckywheel animation with Greensock  ---------------------------------

$(document).ready(function () {
    $("#wheel").click(function () {
        if ($('#follow_section').hasClass('follow_center')) {
            $('#follow_section').toggleClass('follow_center');
            $("#blur").toggleClass('blured');
            $(".arrow").toggleClass('arrow_move');
        }
        $('#wheel_section').toggleClass('wheel_center');
        $("#blur").toggleClass('blured');
        $(".arrow").toggleClass('arrow_move');
    });

    $("#follow").click(function () {
        $('#follow_section').toggleClass('follow_center');
        $("#blur").toggleClass('blured');
        $(".arrow").toggleClass('arrow_move');
    });

    //  Setup variables
    var wheel = $(".wheel"),
        active = $(".active"),
        currentRotation,
        lastRotation,
        tolerance,
        deg,

        $btnPlay = $("#btnPlay"),
        $btnPhone = $("#btnPhone"),
        $btnVerify = $("#btnVerify"),
        $btnSlowMo = $("#btnSlowMo");

    // Random degree
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // var deg = getRandomInt(-30, 330);
    // var deg = 690;
    var deg = getRandomInt(690, 1410);
    // console.log("degree: ", deg);

    // var { phone } = req.body;
    // var { digit_1, digit_2, digit_3, digit_4, digit_5, digit_6 } = req.body;
    // let phone_form = document.getElementById('phone_form');
    let phone = '+201002140722';
    // let code = '000000';

    // Creating the Timeline
    var indicator = new TimelineMax();
    var spinWheel = new TimelineMax();

    indicator
        .to(active, .13, { rotation: -10, transformOrigin: "65% 36%", ease: Power3.easeOut })
        .to(active, .13, { rotation: 5, ease: Power4.easeOut })
        .add("end");

    // Luckywheel animation
    //   Buttons
    function startWheel() {
        spinWheel
            .to(wheel, 5, {
                rotation: deg, transformOrigin: "50% 50%", ease: Power4.easeInOut,
                onUpdate: (function () {
                    currentRotation = Math.round(this.target[0]._gsTransform.rotation);    //_gsTransform: current position of the wheel
                    tolerance = currentRotation - lastRotation;
                    if (Math.round(currentRotation) % (360 / 12) <= tolerance) {
                        if (indicator.progress() > .2 || indicator.progress() === 0) {
                            indicator.play(0);
                        }
                    }
                    lastRotation = currentRotation;

                    // console.log("lastRot: " + lastRotation);
                    // console.log("currentRot: " + currentRotation);
                    // console.log("tol: " + tolerance);
                    // console.log(indicator.progress());
                    // console.log("spinwheelprogress: " + spinWheel.progress());
                    if (spinWheel.progress() == 1) {
                        // console.log("spinwheelprogress: " + spinWheel.progress());
                        return getData(deg);
                    }
                })
            });
        spinWheel.add("end");

        indicator.timeScale(1).seek(0);
        spinWheel.timeScale(1).seek(0);
    }

    // ===========================================================

    $btnPlay.click(
        function () {
            $("#wheel_view").css({ 'display': 'none' });
            $("#phone_view").css({ 'display': 'block' });
            $('#wheel_message').text(`First, verify with your phone`);
            $('#wheel_message').addClass('msg');
        }
    );
    $btnPhone.click(
        function () {
            postPhone(phone);
        }
    );
    $btnVerify.click(
        function () {
            let $digit_1 = $("#digit_1").val();
            let $digit_2 = $("#digit_2").val();
            let $digit_3 = $("#digit_3").val();
            let $digit_4 = $("#digit_4").val();
            let $digit_5 = $("#digit_5").val();
            let $digit_6 = $("#digit_6").val();
            let code = $digit_1 + $digit_2 + $digit_3 + $digit_4 + $digit_5 + $digit_6;
            // console.log("code: ", code);

            postVerify(code)
        }
    );

    $btnSlowMo.click(
        function () {
            indicator.timeScale(.2).seek(.5);
            spinWheel.timeScale(.2).seek(.5);
        }
    );

    // ================================================

    const getData = (get_deg) => axios.post(`/ejs_axios_get_data`, { deg: get_deg }).then(
        function (response) {
            //your code for handling API data
            // console.log(response.data)
            if(response.data == "Try Again") {
                $btnPlay.css({ 'display': 'block' });
                $('#wheel_message').text(`${response.data}`);
                $('#wheel_message').addClass('msg');
            } else {
                $('#wheel_message').text(`${response.data}`);
                $('#wheel_message').addClass('msg');
            }
            // deg = getRandomInt(330, 1110);
        }
    ).catch(
        function (err) {
            //your code for handling API error
            // console.log(err);
        }
    );

    const postPhone = (phone) => axios.post(`/wheel`, { phone: phone }).then(
        function (response) {
            //your code for handling API data
            // console.log(response.data)
            if (response.data == "We sent the new verification code" || response.data == "We already have sent a code, check it out !") {
                $("#phone_view").css({ 'display': 'none' });
                $("#verify_view").css({ 'display': 'block' });
                $('#wheel_message').text(`${response.data}`);
                $('#wheel_message').addClass('msg');
            } else {
                $('#wheel_message').text(`${response.data}`);
                $('#wheel_message').addClass('msg');
            }
        }
    ).catch(
        function (err) {
            //your code for handling API error
            // console.log(err);
        }
    );


    const postVerify = (code) => axios.post(`/wheel/verify`, { code: code }).then(
        function (response) {
            //your code for handling API data
            if (response.data == 'Accepted, Let us spin the wheeeeeeel!') {
                // console.log(response.data)
                $btnPlay.css({ 'display': 'none' });
                $("#verify_view").css({ 'display': 'none' });
                $("#wheel_view").css({ 'display': 'block' });

                $('#wheel_message').text(`${response.data}`);
                $('#wheel_message').addClass('msg');
                startWheel();
            } else {
                // console.log(response.data)
                $('#wheel_message').text(`${response.data}`);
                $('#wheel_message').addClass('msg');
            }
        }
    ).catch(
        function (err) {
            //your code for handling API error
            // console.log(err);
        }
    );


    // document.getElementById('btnPlay').addEventListener('click', getData());

    // function reqListener() {
        // console.log(this.responseText);
    // }
    // var oReq = new XMLHtttpRequest();
    // oReq.addEventListener('load', reqListener);
    // oReq.open('GET', 'http://www.example.org/example.txt');
    // oReq.send();
});
