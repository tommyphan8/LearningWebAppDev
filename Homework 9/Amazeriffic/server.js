var express = require("express"),
    http = require("http"),
    // import the mongoose library
    mongoose = require("mongoose"),
    app = express(),
    server = http.createServer(app),
    socketIO = require("socket.io"),
    io = socketIO(server);
    // io = require("socket.io").listen(3001);

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

server.listen(3000);
// http.createServer(app).listen(3000);

//debug purposes
//determines when a user connects and when a user disconnects
io.on('connection', function(socket) {
	console.log("a user connected");
	socket.on("disconnect", function (){
		console.log("user disconnected");
	});
});


//
io.on("connection", function(socket) {
	socket.on("chat message", function(msg){
		console.log("message: " + msg);
	});
});

//list 
io.on("connection", function(socket) {
	socket.on("list", function(msg){
		socket.broadcast.emit("message", msg);
		console.log("list: " + msg);
	});
});

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
	res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function (err, result) {
	if (err !== null) {
	    // the element did not get saved!
	    console.log(err);
	    res.send("ERROR");
	} else {
	    // our client expects *all* of the todo items to be returned, so we'll do
	    // an additional request to maintain compatibility
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    res.send("ERROR");
		}
		res.json(result);
	    });
	}
    });
});

