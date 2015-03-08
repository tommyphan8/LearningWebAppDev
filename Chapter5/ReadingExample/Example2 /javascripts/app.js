var main = function() {
	"use strict";

	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
			  "tags=nature&format=json&jsoncallback=?";
	$.getJSON(url, function (flickrResponse){

	console.log(flickrResponse);	
	});

	$.getJSON(url, function (flickrResponse){

		flickrResponse.items.forEach(function (photo) {
			var $img = $("<img>").hide();

			$img.attr("src", photo.media.m);
			$("main .photos").append($img);
			$img.fadeIn();
			console.log(photo.media.m);

		});

	});
};

$(document).ready(main);