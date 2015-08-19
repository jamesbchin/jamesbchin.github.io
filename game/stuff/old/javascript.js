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

var increment = 2; //Number of Pixels Moved Per Cycle
var incrementIncrease = .6;

var acquiredArraySize = 0;

var acquiredArray = new Array;

var codeArray = new Array;

function addAcquired(color) {
	var array = [
		document.getElementById('acquired1').style,
		document.getElementById('acquired2').style,
		document.getElementById('acquired3').style,
		document.getElementById('acquired4').style,
		document.getElementById('acquired5').style,
		document.getElementById('acquired6').style,
		document.getElementById('acquired7').style,
		document.getElementById('acquired8').style,
		document.getElementById('acquired9').style,
		document.getElementById('acquired10').style];
	array[acquiredArraySize].background = color;
	acquiredArray.push(color);
	console.log("A",color);
	console.log("C",codeArray[acquiredArraySize]);
	printArray(acquiredArray);
	console.log(acquiredArraySize);
	if (color != codeArray[acquiredArraySize]) {
		resetGame();
	}
	else {
		acquiredArraySize++;
	}
}

//I didn't write this, it was originally found on the internet and was modified by me
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
	direction = 1;
	move();
    }
    else if (e.keyCode == '40') {
	direction = 2;
	move();
    }
    else if (e.keyCode == '37') {
	direction = 3;
	move();
    }
    else if (e.keyCode == '39') {
	direction  = 4
	move();
    }

}

function collision(object) {
	dom = document.getElementById(object).style;
	//console.log("(",x_coord,",",y_coord,")");
	//console.log("(",Number.parseInt(dom.top),",",Number.parseInt(dom.left),")");
	var playerX = x_coord + (playerSize / 2);
	var playerY = y_coord + (playerSize / 2);
	var targetX = Number.parseInt(dom.left) + (targetSize / 2);
	var targetY = Number.parseInt(dom.top) + (targetSize / 2);
	//console.log("X Distance:",Math.abs(playerX - targetX));
	//console.log("Y Distance:",Math.abs(playerY - targetY));
	if ((Math.abs(playerX - targetX) <= (playerSize/2 + targetSize/2)) && (Math.abs(playerY - targetY) <= (playerSize/2 + targetSize/2))) {
		addAcquired(dom.background);
		increment+=incrementIncrease;
		randomizeTarget(object);
		if (acquiredArraySize == 10) {
			window.alert("You Won!");
			resetGame();
		}
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
	if ((y_coord < 0) || (x_coord < 0) || (y_coord > window.innerHeight - 40 - playerSize) || (x_coord > window.innerWidth - 140 - 
playerSize)) {
		resetGame();
	}
}

function printArray(a) {
	for (i = 0; i < a.length; i++) {
		console.log(a[i]);
	}
}

function randomizeCode() {
	var array = [
		document.getElementById('code1').style,
		document.getElementById('code2').style,
		document.getElementById('code3').style,
		document.getElementById('code4').style,
		document.getElementById('code5').style,
		document.getElementById('code6').style,
		document.getElementById('code7').style,
		document.getElementById('code8').style,
		document.getElementById('code9').style,
		document.getElementById('code10').style];
	for (i = 0; i < array.length; i++) {
		var num = Math.round(2*Math.random());
		if (num == 0) {
			array[i].background = "#F00";
		}
		else if (num == 1) {
			array[i].background = "#0F0";
		}
		else {
			array[i].background = "#00F";
		}
		codeArray[i] = array[i].background;
	}
}

function randomizeTarget(target) {
	dom = document.getElementById(target).style;
	//console.log("Width:",window.innerWidth);
	//console.log("Height:",window.innerHeight);
	var numX = Math.round((window.innerWidth - 181 - targetSize) * Math.random()) + 20;
	var numY = Math.round((window.innerHeight - 81 - targetSize) * Math.random()) + 20;
	//console.log("Coordinates: (",numX,",",numY,").");
	dom.top = numY;
	dom.left = numX;
}

function resetGame() {
	window.alert("You Lost.");
	direction = 0;
	increment = 2;
	console.log("You have died.");
	x_coord = (window.innerWidth / 2) - 70 - (window.innerWidth / 40);
	y_coord = (window.innerHeight / 2) - 20 - (window.innerHeight / 40);
	randomizeCode();
	randomizeTarget("target1");
	randomizeTarget("target2");
	randomizeTarget("target3");
	var array = [
		document.getElementById('acquired1').style,
		document.getElementById('acquired2').style,
		document.getElementById('acquired3').style,
		document.getElementById('acquired4').style,
		document.getElementById('acquired5').style,
		document.getElementById('acquired6').style,
		document.getElementById('acquired7').style,
		document.getElementById('acquired8').style,
		document.getElementById('acquired9').style,
		document.getElementById('acquired10').style];
	for (i = 0; i < array.length; i++) {
		array[i].background = "#ccc";
		acquiredArray.pop();
	}
	acquiredArraySize = 0;
}

function printCoord() {
	console.log("X-Coord = ",x_coord);
	console.log("Y-Coord = ",y_coord);
}
