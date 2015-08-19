var direction = 0;
/*
* 0 = not moving
* 1 = up
* 2 = down
* 3 = left
* 4 = right
*/

var playerSize = 0;
var targetSize = 0;

var x_coord = (window.innerWidth / 2) - 70 - (playerSize / 2); //X Coordinate of the Player
var y_coord = (window.innerHeight / 2) - 20 - (playerSize / 2); //Y Coordinate of the Player

var initialIncrement = 2;
var increment = 0; //Number of Pixels Moved Per Cycle
var incrementIncrease = .4;

var score = 0;
var highscore = 0;

var pause = false;

//I didn't write this, it was originally found on the internet and was modified by me
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
	pause = false;
	direction = 1;
	move();
    }
    else if (e.keyCode == '40') {
	pause = false;
	direction = 2;
	move();
    }
    else if (e.keyCode == '37') {
	pause = false;
	direction = 3;
	move();
    }
    else if (e.keyCode == '39') {
	pause = false;
	direction  = 4
	move();
    }

    if (e.keyCode == '80') {
        pause = !pause;
    }

    if (e.keyCode == '83') {
        pause = true;
	alert("Score: " + score.toString() + "\nHighscore: " + highscore.toString());
	pause = false;	
    }

}

function collision(object) {
	dom = document.getElementById(object).style;
	dom1 = document.getElementById("code").style;
	//console.log("(",x_coord,",",y_coord,")");
	//console.log("(",Number.parseInt(dom.top),",",Number.parseInt(dom.left),")");
	var playerX = x_coord + (playerSize / 2);
	var playerY = y_coord + (playerSize / 2);
	var targetX = Number.parseInt(dom.left) + (targetSize / 2);
	var targetY = Number.parseInt(dom.top) + (targetSize / 2);
	//console.log("X Distance:",Math.abs(playerX - targetX));
	//console.log("Y Distance:",Math.abs(playerY - targetY));
	if ((Math.abs(playerX - targetX) <= (playerSize/2 + targetSize/2)) && (Math.abs(playerY - targetY) <= (playerSize/2 + targetSize/2))) {
		if (dom1.background != dom.background) {
			resetGame();
		}
		score++;
		console.log(score);
		randomizeCode();
		//increment+=incrementIncrease;
		increment = 1.25 * Math.sqrt(score+1)
		console.log(increment);
		randomizeTarget(object);
	}
}

function locateMouse(event) {
	var mouse_x = event.clientX;
	var mouse_y = event.clientY;
	//console.log(mouse_x);
	//console.log(mouse_y);
	var slope1 = window.innerHeight / window.innerWidth;
	var slope2 = -window.innerHeight / window.innerWidth;
	if ((mouse_x > mouse_y / slope1) && (mouse_x < (mouse_y - window.innerHeight) / slope2)) {
		direction = 1;
		//console.log('up: ',direction);
		//printCoord();
		move();
	}
	else if ((mouse_x < mouse_y / slope1) && (mouse_x > (mouse_y - window.innerHeight) / slope2)) {
		direction = 2;
		//console.log('down: ',direction);
		//printCoord();
		move();
	}
	else if ((mouse_x < mouse_y / slope1) && (mouse_x < (mouse_y - window.innerHeight) / slope2)) {
		direction = 3;
		//console.log('left: ',direction);
		//printCoord();
		move();
	}
	else {
		direction = 4;
		//console.log('right: ',direction);
		//printCoord();
		move();
	}
}

function move() {
	dom = document.getElementById('player').style;
	dom.top = y_coord;
	dom.left = x_coord;
	if (pause == false) {
		if (direction == 1) {
			y_coord -= increment;
		}
		if (direction == 2) {
			y_coord += increment;
		}
		if (direction == 3) {
			x_coord -= increment;
		}
		if (direction == 4) {
			x_coord += increment;
		}
		if ((y_coord < 0) || (x_coord < 0) || (y_coord > window.innerHeight - 40 - playerSize) || (x_coord > window.innerWidth - 140 - playerSize)) {
		resetGame();
	}
	}
}

function printArray(a) {
	for (i = 0; i < a.length; i++) {
		console.log(a[i]);
	}
}

function randomizeCode() {
	var num = Math.round(2*Math.random());
	dom = document.getElementById("code").style;
	if (num == 0) {
		dom.background = "#F00";
	}
	else if (num == 1) {
		dom.background = "#0F0";
	}
	else {
		dom.background = "#00F";
	}
	(document.getElementById("acquired").style).background = (dom.background);
}

function randomizeTarget(target) {
	dom = document.getElementById(target).style;
	//console.log("Width:",window.innerWidth);
	//console.log("Height:",window.innerHeight);
	var numX = Math.round((window.innerWidth - 221 - targetSize) * Math.random()) + 40;
	var numY = Math.round((window.innerHeight - 121 - targetSize) * Math.random()) + 40;
	//console.log("Coordinates: (",numX,",",numY,").");
	dom.top = numY;
	dom.left = numX;
}

function resetGame() {
	if (highscore < score) {
		highscore = score;
	}
	alert("You Lost.\nScore: " + score.toString() + "\nHighscore: " + highscore.toString());
	direction = 0;
	increment = initialIncrement;
	console.log("You have died.");
	x_coord = (window.innerWidth / 2) - 70 - (window.innerWidth / 40);
	y_coord = (window.innerHeight / 2) - 20 - (window.innerHeight / 40);
	randomizeCode();
	randomizeTarget("target1");
	randomizeTarget("target2");
	randomizeTarget("target3");
	score = 0;
}

function printCoord() {
	console.log("X-Coord = ",x_coord);
	console.log("Y-Coord = ",y_coord);
}
