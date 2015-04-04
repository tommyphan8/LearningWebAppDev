#!/usr/bin/env node

"use strict";

var http = require("http"),
	playerChoice,
	server;
	

var	result = {
	outcome: "NONE",
	wins:  0,
	losses:  0,
	ties: 0
};

function checkLogic(res, playerChoice) {
	var possiblePlay = ["rock", "paper" , "scissor", "lizard", "spock"];
	//https://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
	var aiChoice =  possiblePlay[Math.floor(Math.random() * 5)];  

	if (aiChoice === playerChoice) {
		result.ties = result.ties + 1;
		result.outcome = "tie";

	} else if (playerChoice === "rock") {
		if (aiChoice === "paper") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else if (aiChoice === "lizard") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else if (aiChoice === "spock") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else {
			result.wins = result.wins + 1;
			result.outcome = "win";
		}

	} else if (playerChoice === "paper") {
		if (aiChoice === "rock") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else if (aiChoice === "lizard") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else if (aiChoice === "spock") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else {
			result.losses = result.losses + 1;
			result.outcome = "lose";
		}

	} else if (playerChoice === "scissor") {
		if (aiChoice === "rock") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else if (aiChoice === "lizard") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else if (aiChoice === "spock") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else {
			result.wins = result.wins + 1;
			result.outcome = "win";
		}

	} else if (playerChoice === "lizard") {
		if (aiChoice === "rock") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else if (aiChoice === "scissor") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else if (aiChoice === "spock") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else {
			result.wins = result.wins + 1;
			result.outcome = "win";
		}

	} else if (playerChoice === "spock") {
		if (aiChoice === "rock") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else if (aiChoice === "lizard") {
			result.losses = result.losses + 1;
			result.outcome = "lose";

		} else if (aiChoice === "scissor") {
			result.wins = result.wins + 1;
			result.outcome = "win";

		} else {
			result.losses = result.losses + 1;
			result.outcome = "lose";
		}

	}

	var a = JSON.stringify(result);
	var b = JSON.parse(a);
	res.write(result);
	//writeResults(res, aiChoice);
}

function writeResults(res, aiChoice) {

	writeBeginHtml(res);
	res.write("<p> Results! <p>\n");
	res.write("<p> You chose: " + playerChoice + "</p>\n");
	res.write("<p> AI chose: " + aiChoice + "</p>\n");
	res.write("<p> Outcome: " + result.outcome + "</p>\n");
	res.write("<p> Wins: " + result.wins + "</p>\n");
	res.write("<p> Losses: " + result.losses + "</p>\n");
	res.write("<p> Ties: " + result.ties + "</p>\n");
	writeEndHtml(res);



}
function writeBeginHtml(res) {
	res.write("<!doctype html>\n");
	res.write("<head>\n");
	res.write("<title>Assignment 5</title>\n");
	res.write("</head>\n");
	res.write("<body>\n");
	res.write("<main>\n");

}

function writeEndHtml(res) {
	res.write("</main>\n");
	res.write("</body>\n");
	res.write("</html>\n");
	res.end();

}

//https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Sending_and_retrieving_form_data
function writeInitHTML(res) {
	writeBeginHtml(res);
	res.write("<p>Choose!</p>\n");
	res.write("<form method='POST' action='/play/rock'><input type = 'submit' value = 'Rock'></form>\n");
	res.write("<form method='POST' action='/play/paper'><input type = 'submit' value = 'Paper'></form>\n");
	res.write("<form method='POST' action='/play/scissor'><input type = 'submit' value = 'Scissor'></form>\n");
	res.write("<form method='POST' action='/play/lizard'><input type = 'submit' value = 'Lizard'></form>\n");
	res.write("<form method='POST' action='/play/rock'><input type = 'submit' value = 'Spock'></form>\n");
	writeEndHtml(res);
	res.end();

}



function mainPage(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});

	if (req.url === "/play/rock") {
		playerChoice = "rock";
		checkLogic(res, playerChoice);

	} else if (req.method === "POST" && req.url === "/play/paper") {
		playerChoice = "paper";
		checkLogic(res, playerChoice);
	} else if (req.method === "POST" && req.url === "/play/scissor") {
		playerChoice = "scissor";
		checkLogic(res, playerChoice);
	} else if (req.method === "POST" && req.url === "/play/lizard") {
		playerChoice = "lizard";
		checkLogic(res, playerChoice);
	} else if (req.method === "POST" && req.url === "/play/spock") {
		playerChoice = "spock";
		checkLogic(res, playerChoice);
	} else {
		writeInitHTML(res);
	}
}

server = http.createServer(mainPage);
server.listen();
var address = server.address();
console.log("Game is listening at http://localhost:" + address.port + "/");

