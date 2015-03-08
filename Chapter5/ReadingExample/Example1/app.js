var main = function() {
	"use strict";

	console.log("Hello World!");

	$.getJSON("cards/aceOfSpades.json", function (card) {
		// create an element to hold the card
		var $cardParagraph = $("<p>");

		//c create the 
		$cardParagraph.text(card.rank + " of " + card.suit);

		//append the card paragraph to main
		$("main").append($cardParagraph);
	});

	$.getJSON("cards/hand.json", function (hand) {
		var $list = $("<ul>");

		hand.forEach(function(card){
			var $card = $("<li>");
			$card.text(card.rank + " of " + card.suit);
			$list.append($card);

		});

		$("main").append($list);
	});
};

$(document).ready(main);