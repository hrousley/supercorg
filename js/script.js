var corg = {

    corgi: $("#corgi"),

    init: function () {
        corg.setListeners();
        corg.keyHandler();
        keyControls.init();
    },
    setListeners: function () {
      //window resize
      //request animation frame for overall site
      console.log("setListeners function");
    },
    corgLoop: function () {
      window.requestAnimationFrame(corg.keyHandler);
      //console.log("corgLoop");
    },
    keyHandler: function () {
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
      if (keyControls.upPressed && keyControls.rightPressed) {
        corgFlying.moveUpRight();
      }
      if (keyControls.downPressed && keyControls.rightPressed) {
        corgFlying.moveDownRight();
      }
      corg.corgLoop();
    }
};

jQuery(document).ready(function ($) {
    corg.init();
    //console.log($("#corgi"));
    //console.log(corg.corgi);
    //console.log(corgi[0]);
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
      //corg.keyHandler();
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
      //corg.keyHandler();
    });
  }
  
}

var corgFlying = corgFlying || {

  moveRight: function () {
    $("#corgi").removeClass().addClass("happy").css({
      left: "+=10"
    });
  },

  moveLeft: function () {
    $("#corgi").removeClass().addClass("happy-flip").css({
      left: "-=10"
    });
  },

  moveUp: function () {
    $("#corgi").removeClass().addClass("determined-up").css({
      top: "-=10"
    });
  },

  moveDown: function () {
    $("#corgi").removeClass().addClass("determined-down").css({
      top: "+=10"
    });    
  },

  moveUpRight: function () {
    $("#corgi").removeClass().addClass("determined-up-right"); 
  },

  moveDownRight: function() {
    $("#corgi").removeClass().addClass("determined-down-right"); 
  }

};