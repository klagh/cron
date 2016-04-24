function update_cron_expr(cron_expr, period, value, is_repeat){
    console.log(cron_expr, period, value, is_repeat);
	var period_position = {"m":0, "h":1, "d":2, "w":3, "M":4};
	var elements = cron_expr.split(" ");
	elements[period_position[period]] = update_cron_element(elements[period_position[period]], value, is_repeat);
	return elements.join(" ");
}

function update_cron_element(cron_element, value, is_repeat){
	if( is_repeat){
		if (cron_element.lastIndexOf("/") > cron_element.lastIndexOf(",")){
			return cron_element.substr(0, cron_element.lastIndexOf("/")) + "/" + value;
		} else {
			return cron_element+"/"+value;
		}
	} else {
		if (cron_element =="*"){
			return value;
		} else {
			return cron_element + "," + value;
		}
	}
}
//
////test
//var ce = "* * * * *"
//
//console.log(update_cron_expr(ce, 'm', "5", false));
//console.log(update_cron_expr(ce, 'h', "3-6", false));
//console.log(update_cron_expr(ce, 'd', "2", true));
//console.log(update_cron_expr(ce, 'M', "5", false));
//
//var c1 = update_cron_expr(ce, 'm', '5', false);
//var c2 = update_cron_expr(c1, 'h', "4-8", false);
//var c3 = update_cron_expr(c2, 'd', "2", true);
//var c4 = update_cron_expr(c3, 'm', '15-30', false);
//var c5 = update_cron_expr(c4, 'd', "3", true);
//var c6 = update_cron_expr(c5, 'w', "2", false);
//var c7 = update_cron_expr(c6, 'w', "3", true);
//
//console.log(c7);