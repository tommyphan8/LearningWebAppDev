/*use code from author below*/

var main = function () {
    var toDos = ["Get groceries",
                 "Make up some new ToDos",
                 "Prep for Monday's class",
                 "Answer emails",
                 "Take Gracie to the park",
                 "Finish writing this book"];


    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // input a new to-do
                $input = $("<input>"),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
            } else if ($element.parent().is(":nth-child(4)")) {
            	var $newP = $("<a>");
                var $newP2 = $("<a>");
                var $newP3 = $("<a>");
                var $newP4 = $("<a>");
            	var $newS = $("<script>");
            	$newS.text("jQuery('a.gallery').colorbox({ opacity:0.5 , rel:'group1', slideshow:true });");
            	$newP.addClass("gallery").attr("href", "pictures/image1.png").text("Photo_1 ");               
                $newP2.addClass("gallery").attr("href", "pictures/image2.png").text("Photo_2 ");
                $newP3.addClass("gallery").attr("href", "pictures/image3.png").text("Photo_ 3 ");
                $newP4.addClass("gallery").attr("href", "pictures/image4.png").text("Photo_4 ");

                $(".content").append($newP);
                $(".content").append($newP2);
                $(".content").append($newP3);
                $(".content").append($newP4);
            	$(".content").append($newS);




            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
