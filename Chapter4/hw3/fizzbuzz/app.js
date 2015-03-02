var main = function() {
	"use strict";

	var $newP;
	var $h1;
	var addComment = function(num) {
		var $new_comment;

		$new_comment = $("<span>").text(num + " ");
		$("body").append($new_comment);


	};

	var print = function(num1, num2) {
		var num;
		$newP = $("<p>");
		for (num = num1; num <= num2; num++) {
			if (num%3 === 0 && num%5 ===0) {
				addComment("FizzBuzz");
			} else if (num%5 === 0) {
				addComment("Buzz");
			} else if (num% 3 === 0) {
				addComment("Fizz");
			} else {
				addComment(num);
			}	
		}
		$("body").append($newP);
	};

	var fizzbuzz_1 = function() {
		$h1 = $("<h1>").text("fizz_buzz1");
		$("body").append($h1);

		print(1, 100);

	};

	var fizzbuzz_2 = function(start_num, end_num) {
		$h1 = $("<h1>").text("fizz_buzz2");
		$("body").append($h1);
		print(start_num, end_num);
	};

	var fizzbuzz_3 = function(arr) {
		var num;
		$newP = $("<p>");
		$h1 = $("<h1>").text("fizz_buzz3");
		$("body").append($h1);
		for (num = 0; num < arr.length; num++) {
			if (arr[num]%3 === 0 && arr[num]%5 === 0) {
				addComment("FizzBuzz");
			} else if (arr[num]%5 === 0) {
				addComment("Buzz");
			} else if (arr[num]%3 === 0) {
				addComment("Fizz");
			} else {
				addComment(arr[num]);
			}

		}
		$("body").append($newP);
	};

	var fizzbuzz_4 = function(obj) {
		var num;
		$newP = $("<p>");
		$h1 = $("<h1>").text("fizz_buzz4");
		$("body").append($h1);
		for (num = 1; num <= 100; num++) {
			if (num%3 === 0 && num%5 ===0) {
				addComment(obj.divisibleByThree + obj.divisibleByFive);
			} else if (num%5 === 0) {
				addComment(obj.divisibleByFive);
			} else if (num% 3 === 0) {
				addComment(obj.divisibleByThree);
			} else {
				addComment(num);
			}	
		}
		$("body").append($newP);

	};

	var fizzbuzz_5 = function(arr, obj) {
		var num;
		$newP = $("<p>");
		$h1 = $("<h1>").text("fizz_buzz5");
		$("body").append($h1);
		for (num = 0; num < arr.length; num++) {
			if (arr[num]%3 === 0 && arr[num]%5 === 0) {
				addComment(obj.divisibleByThree + obj.divisibleByFive);
			} else if (arr[num]%5 === 0) {
				addComment(obj.divisibleByFive);
			} else if (arr[num]%3 === 0) {
				addComment(obj.divisibleByThree);
			} else {
				addComment(arr[num]);
			}
		}
		$("body").append($newP);

	};

	


	fizzbuzz_1();
	fizzbuzz_2(200, 300);
	fizzbuzz_3([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]);
	fizzbuzz_4({ divisibleByThree: "foo", divisibleByFive: "bar"});
	fizzbuzz_5([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],{ divisibleByThree: "foo", divisibleByFive: "bar"});
};

$(document).ready(main);