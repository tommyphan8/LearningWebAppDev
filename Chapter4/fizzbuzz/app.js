var main = function() {
	"use strict";
	var addComment = function(num) {
		var $new_comment;

		$new_comment = $("<p>").text(num);
		$("body").append($new_comment);


	};

	var print = function(num1, num2) {
		var num;

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
	};

	var fizzbuzz_1 = function() {
		

		print(1, 100);
	};

	var fizzbuzz_2 = function(start_num, end_num) {
		print(start_num, end_num);
	};

	var fizzbuzz_3 = function(arr) {
		var num;
		for (num = 0; num <= arr.length; num++) {
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
	};

	var fizzbuzz_4 = function(obj) {
		var num;

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

	};

	var fizzbuzz_5 = function(arr, obj) {
		var num;
		for (num = 0; num <= arr.length; num++) {
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

	};

	

	fizzbuzz_5([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],{ divisibleByThree: "foo", divisibleByFive: "bar"});
	//fizzbuzz_1();
	//fizzbuzz_2(200, 300);
	//fizzbuzz_3([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]);

};

$(document).ready(main);