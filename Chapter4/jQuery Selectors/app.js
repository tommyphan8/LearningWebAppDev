var main = function () {
	"use strict;"

	$("p:not(.a)").css("color","red");
};

$(document).ready(main);