
var main = function (toDoObjects) {
    "use strict";
    console.log("SANITY CHECK");
    var socket = io.connect("http://localhost:3000");

    //Receive broadcast of message
    socket.on("message", function(msg) {
        toDoObjects = msg;
        toDos = toDoObjects.map(function (toDo) {
          return toDo.description;

      });
        var $content,
        i;
        $("main .content").empty();
           // var temp = $("#.tabs .active").text();
           if ($(".tabs .active").text() === "Newest") {
            tabNew(toDos);

        } else if ($(".tabs .active").text() === "Oldest") {
            tabOld(toDos);

        } else if ($(".tabs .active").text() === "Tags") {
            tabTags(toDoObjects);

        }
        $("main .content").append($content);
    });

    //console.log("testing: "+ $(".tabs .active").text());


    var toDos = toDoObjects.map(function (toDo) {
          // we'll just return the description
          // of this toDoObject
          return toDo.description;
      });

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

                //console.log(toDos);

                tabNew(toDos);
            } else if ($element.parent().is(":nth-child(2)")) {
                tabOld(toDos);

            } else if ($element.parent().is(":nth-child(3)")) {
                tabTags(toDoObjects);


            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                $inputLabel = $("<p>").text("Description: "),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Tags: "),
                $button = $("<span>").text("+");
                $button.on("click", function () {

                    var description = $input.val(),
                    tags = $tagInput.val().split(","),
                    newToDo = {"description":description, "tags":tags};

                    $.post("todos", newToDo, function (result) {
                        //console.log(result);

                        //toDoObjects.push(newToDo);
                        toDoObjects = result;
                        //emits new updated result after post
                        socket.emit('list', result);
                        // update toDos
                        toDos = toDoObjects.map(function (toDo) {

                            return toDo.description;
                        });



                        $input.val("");
                        $tagInput.val("");
                    });
                });

                $content = $("<div>").append($inputLabel)
                .append($input)
                .append($tagLabel)
                .append($tagInput)
                .append($button);
            }

            $("main .content").append($content);

            return false;
        });
});

$(".tabs a:first-child span").trigger("click");
};

var tabNew = function(toDos) {
    //console.log("test: " + toDos);
    $content = $("<ul>");
    for (i = toDos.length-1; i >= 0; i--) {
        $content.append($("<li>").text(toDos[i]));
    }
    $("main .content").append($content);
};

var tabOld = function(toDos) {
    $content = $("<ul>");
    toDos.forEach(function (todo) {
        $content.append($("<li>").text(todo));
    });
    $("main .content").append($content);
};

var tabTags = function(toDoObjects) {
 //console.log("Tags");
 var tags = [];

 toDoObjects.forEach(function (toDo) {
    toDo.tags.forEach(function (tag) {
        if (tags.indexOf(tag) === -1) {
            tags.push(tag);
        }
    });
});
 //console.log(tags);

 var tagObjects = tags.map(function (tag) {
    var toDosWithTag = [];

    toDoObjects.forEach(function (toDo) {
        if (toDo.tags.indexOf(tag) !== -1) {
            toDosWithTag.push(toDo.description);
        }
    });

    return { "name": tag, "toDos": toDosWithTag };
});

 //console.log(tagObjects);

 tagObjects.forEach(function (tag) {
    var $tagName = $("<h3>").text(tag.name),
    $content = $("<ul>");


    tag.toDos.forEach(function (description) {
        var $li = $("<li>").text(description);
        $content.append($li);
    });

    $("main .content").append($tagName);
    $("main .content").append($content);
});


};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
