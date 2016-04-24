var period_min_val = {'m' : 0, 'h' : 0, 'd': 1, 'w' : 0, 'M':1};
var period_max_val = {'m' : 59, 'h' : 23, 'd': 31, 'w' : 7, 'M':12};

$(document).ready(function () {
    $("#btn_reset").click(function () {
        // $("#cron_expr").removeAttr("value");
       //  $("#cron_expr").attr("value","");
        $("#cron_expr").attr("value", "* * * * * ");
    });
    $("#form_at").submit(function (event) {
       event.preventDefault();
        console.log("At submited");
        $("#cron_expr").attr("value", update_cron_expr($("#cron_expr").attr("value"), $("#at_period").val(), $("#at_value").val(), false));
    });
    $("#form_range").submit(function (event) {
        event.preventDefault();
        console.log("Range submited");
        var value = $("#range_from").val() + "-" + $("#range_to").val();
        $("#cron_expr").attr("value", update_cron_expr($("#cron_expr").attr("value"), $("#range_period").val(), value, false));
    });
    $("#form_every").submit(function (event) {
        event.preventDefault();
        console.log("Every submited");
        $("#cron_expr").attr("value", update_cron_expr($("#cron_expr").attr("value"), $("#every_period").val(), $("#every_value").val(), true));
    });
    $('select#at_period').on('change', function(){
        $(this).prev().attr('min', period_min_val[$(this).val()]);
        $(this).prev().attr('max', period_max_val[$(this).val()]);
    });
    $('select#range_period').on('change', function(){
        $(this).prev().attr('min', period_min_val[$(this).val()]);
        $(this).prev().prev().prev().attr('min', period_min_val[$(this).val()]);
        $(this).prev().attr('max', period_max_val[$(this).val()]);
        $(this).prev().prev().prev().attr('max', period_max_val[$(this).val()]);
    });
    $('select#every_period').on('change', function(){
        $(this).prev().attr('min', period_min_val[$(this).val()]);
        $(this).prev().attr('max', period_max_val[$(this).val()]);
    });
});
