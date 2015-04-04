var main = function (){
	"use strict";
	$('#button').on('click', function(){
		$('.result').empty();
		var temp = {"link": ""};
		temp.link = $("#linkParse").val();
		console.log(temp);
		$.post('link', temp, function (response) {
			$(".result").append($("<p>").append("Original Long Url: " + response.longL));
			$(".result").append($("<p>").append("Short Url: " + response.shortL));

			// if (response.whichLink === 0) {
			// 	$(".result").append($("<p>").append("Original Long Url" + response.longL));
			// 	console.log(response.longL);
			// } else {
			// 	$(".result").append($("<p>").append("Short Url: localhost:3000/" + response.shortL));
			// 	console.log("localhost:3000/" + response.shortL);
			// }
		});
		

	});

};

$(document).ready(main);