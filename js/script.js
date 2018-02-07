var corg = {

    corgi: $("#corgi"),
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,

    init: function () {
        corg.setListeners();
        corg.keyHandler();
        keyControls.init();
        enemies.generator();
    },
    getRandom: function(min, max) {
      return Math.random() * (max-min + 1) + min;
    },
    setListeners: function () {
      //window resize
      //request animation frame for overall site
      //console.log("setListeners function");
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
      if (keyControls.spacePressed) {
        //corgFlying.attack();
        $(".lazr").show();
      }
      // Lasers are hidden by default with CSS but this flag needs to be here to shut them off on key release/keyup
      if (!keyControls.spacePressed) {
        $(".lazr").hide();
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

var enemies = enemies || {

  enemyIndex: 0,
  enemyClasses: ["flysquirrel", "sheep"],
  container: $("#enemy-container"),
  //enemyID: '#enemy' + this.enemyIndex,
  //html: "<div id='enemy" + this.enemyIndex + "' class='enemy'></div>",


  generator: function () {
    var enemyID = '#enemy-'+ enemies.enemyIndex,
    html = "<div id='enemy-" + enemies.enemyIndex + "' class='enemy'></div>";
    //console.log(enemies.container, corg.windowWidth, corg.windowHeight);

    //enemies.container.append(enemies.html);
    $("#enemy-container").append(html);

    $("#enemy-" + enemies.enemyIndex).css({
      top: corg.getRandom(0,corg.windowHeight), 
      left: corg.getRandom(0,corg.windowWidth)
     })
    .addClass(enemies.enemyClasses[~~(Math.random()*enemies.enemyClasses.length)]);

    //console.log(enemies.enemyIndex, html);
    //console.log(enemyID);

    enemies.enemyIndex++;

    //console.log("after ++", enemies.enemyIndex,html);
    //console.log("after ++", enemyID);

    enemies.addEnemies();

    //if (enemyID > 0) {
      enemies.removeEnemies(enemyID);
    //}
  },

  addEnemies: function () {
    //console.log("addEnemies called");

    setTimeout(function() {
      enemies.generator();
    }, 2500);
  },

  removeEnemies: function(enemyID) {
    //console.log("removeEnemies called");

    setTimeout(function() {
     if ($(enemyID).length > 0) {
       $(enemyID).remove();
     }
    }, 3000);
  }

};


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