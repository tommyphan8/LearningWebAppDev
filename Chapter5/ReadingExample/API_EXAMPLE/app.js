var main = function() {
	"use strict";
	var $film;
	var url = "http://api.themoviedb.org/3/search/movie?" +
	"api_key=ae22cfb91b3d2c0a8179d99a29831489&query="
	
	$(".comment-input button").on("click", function (event){
		$film = $(".comment-input input").val();
		url = url + $film

		$.getJSON(url, function (movieDB){
			console.log(movieDB.results[0]);
			movieDB.results.forEach(function(movie){
				var $p = $("<li>").hide();
				$p.text(movie.original_title);
				$("body ul").append($p);
				$p.fadeIn();
				$(".comment-input input").val("");
				console.log(movie.original_title);

			});

		});

	});
	

};

$(document).ready(main);