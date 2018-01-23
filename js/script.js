var corg = {
    init: function () {
        corg.setListeners();
        keyControls.init();
        keyHandler.init();
    },
    setListeners: function () {
      //window resize
      //request animation frame for overall site
      console.log("setListeners function");
    }
};

jQuery(document).ready(function ($) {
    corg.init();
    // console.log($("#corgi"));
    // console.log(corgi);
    // console.log(corgi[0]);
});

var keyControls = keyControls || {

  rightPressed:false,
  leftPressed:false,
  upPressed:false,
  downPressed:false,
  spacePressed:false,

  init: function () {

    $(document).keydown(function(e){
      //console.log(e.keyCode, "keydown");

      switch (e.keyCode) {
        case 39 || 68:
        keyControls.rightPressed = true;
        break;
        case 37 || 65:
        keyControls.leftPressed = true;
        break;
        case 38 || 87:
        keyControls.upPressed = true;
        break;
        case 40 || 83:
        keyControls.downPressed = true;
        break;
        case 32:
        keyControls.spacePressed = true;
        break;
      }
      keyHandler.init();
    });

    $(document).keyup(function(e){
      //console.log(e.keyCode, "keyup");

      switch (e.keyCode) {
        case 39 || 68:
        keyControls.rightPressed = false;
        break;
        case 37 || 65:
        keyControls.leftPressed = false;
        break;
        case 38 || 87:
        keyControls.upPressed = false;
        break;
        case 40 || 83: 
        keyControls.downPressed = false;
        break;
        case 32:
        keyControls.spacePressed = false;
        break;
      }
      keyHandler.init();
    });
  }
  
}


var keyHandler = keyHandler || {

    init: function () {
    //window.requestAnimationFrame(corgFlying.init);

    if (keyControls.rightPressed) {
      corgFlying.moveRight();
      //console.log("keyPressed", "right", keyControls.rightPressed);
    }
    if (keyControls.leftPressed) {
      corgFlying.moveLeft();
      //console.log("keyPressed", "left", keyControls.leftPressed);
    }
    if (keyControls.downPressed) {
      corgFlying.moveDown();
      //console.log("keyPressed", "down", keyControls.downPressed);
    }
    if (keyControls.upPressed) {
      corgFlying.moveUp();
      //console.log("keyPressed", "up", keyControls.upPressed);
    }

   }

};

var corgFlying = corgFlying || {

  moveRight: function () {
    $("#corgi").css({
      left: "+=10"
    });
    //console.log("moveRight called", corgi);
  },

  moveLeft: function () {
    $("#corgi").css({
      left: "-=10"
    });
  },

  moveUp: function () {
    $("#corgi").css({
      top: "-=10"
    });
  },

  moveDown: function () {
    $("#corgi").css({
      top: "+=10"
    });    
  }

};