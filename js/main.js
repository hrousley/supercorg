var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

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
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);