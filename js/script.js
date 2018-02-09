var corg = {

    corgi: $("#corgi"),
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    score: 0,
    gameLength: 5, //in seconds

    init: function () {
        corg.setListeners();
        corg.keyHandler();
        keyControls.init();
    },
    setListeners: function () {

      $("#start").click(function(){
        console.log("start");
        gameControls.timer();
        gameControls.start();
      });

      $("#reset").click(function() {
        console.log("reset");
        //gameControls.reset();
      });

    },
    corgLoop: function () {
      window.requestAnimationFrame(corg.keyHandler);
    },
    getRandom: function(min, max) {
      return Math.random() * (max-min + 1) + min;
    },
    keyHandler: function () {
      if (keyControls.rightPressed) {
        corgFlying.moveRight();
      }
      if (keyControls.leftPressed) {
       corgFlying.moveLeft();
      }
      if (keyControls.downPressed) {
       corgFlying.moveDown();
      }
      if (keyControls.upPressed) {
       corgFlying.moveUp();
      }
      if (keyControls.upPressed && keyControls.rightPressed) {
        corgFlying.moveUpRight();
      }
      if (keyControls.downPressed && keyControls.rightPressed) {
        corgFlying.moveDownRight();
      }
      if (keyControls.spacePressed) {
        corgFlying.attack();
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
    console.log("score", corg.score);
});

var gameControls = gameControls || {

  timer: function () {

    clearInterval(timer);

    timer = setInterval(function() {

      $("#timer").html(corg.gameLength + " seconds");
      corg.gameLength = corg.gameLength-1;

      if (corg.gameLength === -1) {
        console.log("done");
        gameControls.gameOver();
      }

    }, 1000);

  },

  start: function () {
    enemies.generator();
  },

  gameOver: function() {
    console.log("GO called");
    
    clearInterval(timer);
    clearInterval(enemies.addEnemies);
    clearInterval(enemies.removeEnemies);
    $(".enemy").remove();

    if(corg.score >= 2) {
     $("#game-container").html("You won.");
    }
    else {
     $("#game-container").html("You lost. Try again.");
    }
  },

  reset: function () {

  }

}

var keyControls = keyControls || {

  rightPressed:false,
  leftPressed:false,
  upPressed:false,
  downPressed:false,
  spacePressed:false,

  init: function () {

    $(document).keydown(function(e){

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
    });

    $(document).keyup(function(e){

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
    });
  }
  
}

var enemies = enemies || {

  enemyIndex: 0,
  enemyClasses: ["flysquirrel", "sheep", "siamese"],
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

    setTimeout(function() {
      enemies.generator();
    }, 2500);
  },

  removeEnemies: function(enemyID) {

    setTimeout(function() {
     if ($(enemyID).length > 0) {
       $(enemyID).remove();
     }
    }, 3000);
  }

};

var hitDetect = hitDetect || {

  init: function(hitbox,enemybox) {
    
    if(hitbox.x < enemybox.x + enemybox.width && hitbox.x + hitbox.width > enemybox.x && hitbox.y < enemybox.y + enemybox.height && hitbox.y + hitbox.height > enemybox.y) {
      return true
    }
    return false
  }

};

var score = score || {

  init: function(selector) {
    console.log("score init");
    // var points = {
    //   squirrel: 10,
    //   sheep: 5,
    //   cats: 5
    // };
    var deadEnemy = selector;
    // if (deadEnemy.classList.contains("squirrel")) {
    //   console.log("squirrel dead");
    // }
    // else if (deadEnemy.classList.contains("sheep")) {
    //   console.log("sheep dead");
    // }
    // else if (deadEnemy.classList.contains("siamese")) {
    //   console.log("siamese dead");
    // }
    corg.score++;
    console.log("score", corg.score);
    $("#score").html(corg.score);
  }

};

var corgFlying = corgFlying || {

  attack: function () {

    $(".lazrhitbox").each(function(){
      var hitbox = {
        x: $(this).offset().left,
        y: $(this).offset().top,
        width: 20,
        height: 10
      };

      $(".enemy").each(function() {
        var enemybox = {
          x: $(this).offset().left,
          y: $(this).offset().top,
          width: 125,
          height: $(this).height()
        },
        hit = hitDetect.init(hitbox, enemybox);

        if (hit) {
          $(this).addClass("dead").delay(1000).queue(function() {
            $(this).remove();

            var selector = $(this);
            console.log(selector);

            score.init(selector);
          });
        }
        else { }

      }); //enemy each function

    }); //hitbox each function

    //corg.hitDetect();
  },

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
