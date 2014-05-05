var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var enemyIndex = 0;

$(document).ready(function () {
	
	$(document).keydown(function(e){

		switch (e.keyCode) {

		case 39:
			rightPressed = true;
			break;
		case 37:
			leftPressed = true;
			break;
		case 38:
			upPressed = true;
			break;
		case 40:
			downPressed = true;
			break;
		case 32:
			spacePressed = true;
			break;
		}
	});


	$(document).keyup(function(e){
		switch (e.keyCode) {

		case 39:
			rightPressed = false;
			break;
		case 37:
			leftPressed = false;
			break;
		case 38:
			upPressed = false;
			break;
		case 40:
			downPressed = false;
			break;
		case 32:
			spacePressed = false;
			break;
		}
	});
});



function repeatOften() {
  if (rightPressed) {
  	$("#corgi").removeClass("happy-flip determined-down determined-up determined-up-right determined-down-right");
		$("#corgi").addClass("happy").css({
		left: "+=10"
	});
  }
  if (leftPressed) {
	$("#corgi").removeClass("happy determined-down determined-up determined-up-right determined-down-right");
	$("#corgi").addClass("happy-flip").css({
		left: "-=10"
	});
  }
  if (downPressed) {
	$("#corgi").removeClass("happy happy-flip determined-up determined-up-right determined-down-right");
	$("#corgi").addClass("determined-down").css({
		top: "+=10"
	});
  }
  if (upPressed) {
	$("#corgi").removeClass("happy happy-flip determined-down determined-up-right determined-down-right");
	$("#corgi").addClass("determined-up").css({
		top: "-=10"
	});
  }
  if (upPressed && rightPressed) {
	$("#corgi").removeClass("happy happy-flip determined-down determined-up determined-down-right");
	$("#corgi").addClass("determined-up-right");
  }
  if (downPressed && rightPressed) {
	$("#corgi").removeClass("happy happy-flip determined-down determined-up determined-up-right");
	$("#corgi").addClass("determined-down-right");
  }
  if (spacePressed) {
  	$(".lazr").show();
  }
  if (!spacePressed) {
  	$(".lazr").hide();
  }
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);

function enemyGenerator () {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	console.log(windowHeight,windowWidth);

	function getRandom(min,max) {
		return Math.random() * (max-min + 1) + min;
	}

	$("#enemy-container").append("<div id='enemy-"+ enemyIndex +"' class='enemy'><img src='img/enemy.png'/></div>");

	$("#enemy-"+enemyIndex).css({
		top: getRandom(0,windowHeight), 
		left: getRandom(0,windowWidth)
	});

	enemyIndex++;

	setTimeout(function() {
		enemyGenerator();
	}, 5000);

}
enemyGenerator();