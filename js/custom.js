/**
 * Created by denischistyakov on 7/30/17.
 */

var availableKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '(', ')', 'g'];


$(function () {

    $('#calculate').on('click', function () {
        try {
            $('#result-label').text(eval($('#result').val()));
            $('#detailed_result').html('');
            $('#detailed_result').append(displayCalculations($('#result').val()));
        } catch (e) {
            alert(e);
        }
    });


    $('.calc-execute').on('click', function () {
        var currentResult = $('#result').val();
        $('#result').val((currentResult + $(this).text()).toString());
        $('#result').focus();
    });

    $('#clean').on('click', function () {
        $('#result').val('');
        $('#result-label').text(0);
        $('#detailed_result').html('');
    });

    $('#result').on('keyup', function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            $('#calculate').click();
        }

        if (e.keyCode == 27 || e.which == 27) {
            $('#clean').click();
        }

        if (e.key == 'g') {
            $('#btn-group').click();
            $('#result').val($('#result').val().replace('g', ''));
        }

        e.stopPropagation();
    });


    $(document).on('keyup', function (e) {
        if (e.keyCode != 13 || e.which != 13) {
            if($.inArray(e.key, availableKeys) != -1) {
                var currentResult = $('#result').val();
                $('#result').val((currentResult + e.key).toString());
                $('#result').focus();


                $( ".calc-execute").removeClass("active");
            }

            if (e.key == 'g') {
                $('#btn-group').click();
                $('#result').val($('#result').val().replace('g', ''));
            }
        }

        if (e.keyCode == 27 || e.which == 27) {
            $('#clean').click();
        }

    });

    $(document).on('keydown', function (e) {
        $(".calc-execute:contains('" + e.key + "')").addClass("active");
    });

    $('#result').on('keyup', function () {
        $( ".calc-execute").removeClass("active");
    });

    $('#btn-group').on('click', function () {
        var currentResult = $('#result').val();
        $('#result').val('(' + currentResult + ')');
        $('#result').focus();
    });

    $('#btn-ungroup').on('click', function () {
        var currentResult = $('#result').val();

        if (currentResult.charAt(0) == '(' && currentResult.charAt(currentResult.length - 1) == ')') {
            var newResult = currentResult.substring(1, currentResult.length);
            $('#result').val(newResult.substring(0, newResult.length - 1));
        }

        $('#result').focus();
    });




});

function displayCalculations (string) {

    var output = [];
    var reg = /\((.+?)\)/g;

    var item = "";
    for (i = 0; i < string.match(reg).length; i++) {
        output.push('<div class="col-xl-12">' + string.match(reg)[i] + " = " + eval(string.match(reg)[i]) + '</div>');
    }
    return output;
}


/** Detailed **/

$(function () {
    $('#calculate-detailed').on('click', function () {

        /** Back-end **/
        var back = parseFloat($('#back').val());
        var back_rate = parseFloat($('#back-rate').val());
        var back_result = back * back_rate;
        var back_result_display = (back_result > 0) ? ('$' + back_result) : 0;
        $('#backend-result').text(back_result_display);


        /** Front-end **/
        var front = parseFloat($('#front').val());
        var front_rate = parseFloat($('#front-rate').val());
        var front_result = front * front_rate;
        var front_result_display = (front_result > 0) ? ('$' + front_result) : 0;
        $('#frontend-result').text(front_result_display);


        /** iOS **/
        var ios = parseFloat($('#ios').val());
        var ios_rate = parseFloat($('#ios-rate').val());
        var ios_result = ios * ios_rate;
        var ios_result_display = (ios_result > 0) ? ('$' + ios_result) : 0;
        $('#ios-result').text(ios_result_display);


        /** Android **/
        var android = parseFloat($('#android').val());
        var android_rate = parseFloat($('#android-rate').val());

        var android_result = android * android_rate;
        $('#android-result').text('$' + android_result);


        /** QA **/
        var qa = parseFloat($('#qa').val());
        var qa_rate = parseFloat($('#qa-rate').val());

        var qa_result = qa * qa_rate;
        $('#qa-result').text('$' + qa_result);


        /** Design **/
        var design = parseFloat($('#design').val());
        var design_rate = parseFloat($('#design-rate').val());

        var design_result = design * design_rate;
        $('#design-result').text('$' + design_result);


        /** UX/Wireframes **/
        var ux = parseFloat($('#ux').val());
        var ux_rate = parseFloat($('#ux-rate').val());

        var ux_result = ux * ux_rate;
        $('#ux-result').text('$' + ux_result);


        /** Requirements **/
        var reqs = parseFloat($('#reqs').val());
        var reqs_rate = parseFloat($('#reqs-rate').val());

        var reqs_result = reqs * reqs_rate;
        $('#reqs-result').text('$' + reqs_result);


        /** Summary **/
        var summary = 0;

        if (back_result > 0) {
            summary = summary + back_result;
        }

        if (front_result > 0) {
            summary = summary + front_result;
        }

        if (ios_result > 0) {
            summary = summary + ios_result;
        }

        if (android_result > 0) {
            summary = summary + android_result;
        }

        if (qa_result > 0) {
            summary = summary + qa_result;
        }

        if (design_result > 0) {
            summary = summary + design_result;
        }

        if (ux_result > 0) {
            summary = summary + ux_result;
        }

        if (reqs_result > 0) {
            summary = summary + reqs_result;
        }

        $('#summary_detailed').find('span').text(summary);

    });
});
