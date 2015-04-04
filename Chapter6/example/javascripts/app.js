var main = function () {
	"use strict";

	var url = "http://localhost:56752/play/scissor";

	$.getJSON(url, function (flickrResponse) {
		// we'll simply print the response to the console
		// for the time being
		console.log(flickrResponse);
	});
};

$(document).ready(main);