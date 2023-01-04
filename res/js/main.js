const platform = (document.querySelector(".myImg").src =
  "./res/img/platform.png");
const platform2 = (document.querySelector(".myImg").src =
  "./res/img/platform2.png");
const ground = (document.querySelector(".myImg").src = "./res/img/ground.png");
const background = (document.querySelector(".myImg").src =
  "./res/img/background.jpg");
const playerImg = (document.querySelector(".myImg").src =
  "./res/img/player2.png");
const playerAnimation = (document.querySelector(".myImg").src =
  "./res/img/test4.png");
const enemyImg = (document.querySelector(".myImg").src =
  "./res/img/enemy.png");
const brko = (document.querySelector(".myImg").src =
  "./res/img/brkojakvysity.png");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const timer = document.getElementById("timer");
const play = document.getElementById("play");
const lore = document.getElementById("lore");
const back = document.getElementById("back");
const loreText = document.getElementById("loreText");
const leave = document.getElementById("leave");
const game = document.getElementById("game");
const mainMenu = document.getElementById("mainMenu");
const music = document.getElementById("music");
const hps = document.getElementsByClassName("heart");
const scoreCounter = document.getElementById("score");
const achievement = document.getElementById("achievement");
const achimenu = document.getElementById("achimenu");
const endings = document.getElementsByClassName("ending");
const accepts = document.getElementsByClassName("accept");
const trophys = document.getElementsByClassName("trophys");
const trueReset = document.getElementById("trueReset");
const leave2 = document.getElementById("leave2");

const audio = document.getElementById("audio");
const audio3 = document.getElementById("audio3");

window.open("", "_self", "");

canvas.width = 1500;
canvas.height = 950;

const gravity = 1;

let hp = 3;
let i = 2;
let score = 0;
//animation shit

const spriteWidth = 80;
const spriteHeight = 130;

let runRightX = 0;
let runLeftX = 5;
let jumpX = 0;
let jumpLeftX = 2.5;
let fallX = 0;
let fallLeftX = 2;

let gameFrame = 0;
const staggerFrames = 5;

let gut = false;
let bat = false;
let neutral = false;
let endingCheck = false;

window.onload = () =>{
  gut = localStorage.getItem("gut");
  bat = localStorage.getItem("bat");
  neutral = localStorage.getItem("neutral");
  
  if(gut == null && bat == null && neutral == null){
    endingCheck = true;
  }
  else{
    if(gut){
      trophys[3].style.display = "none";
      trophys[1].style.display = "block";
    }
    else if(bat){
      trophys[3].style.display = "none";
      trophys[2].style.display = "block";
    }
    else if(neutral){
      trophys[3].style.display = "none";
      trophys[0].style.display = "block";
    }
  }
}

class Player {
  constructor() {
    this.position = {
      x: 500,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = spriteWidth;
    this.height = spriteHeight;
    this.check = 0;
    this.groundCheck = false;
    this.platformCheck = false;
    this.platformCheck2 = false;
    this.canTakeDmg = true;
  }

  draw() {
    c.fillStyle = "red";
    if(this.velocity.y < 0 && keys.left.pressed){
      c.drawImage(
        playerAnim,
        jumpLeftX * spriteWidth + 33,
        3 * spriteHeight,
        58,
        98,
        this.position.x,
        this.position.y + 7,
        spriteWidth,
        spriteHeight
      );
    }
    else if(this.velocity.y > 0 && keys.left.pressed){
      c.drawImage(
        playerAnim,
        fallLeftX * spriteWidth + 14,
        3.75 * spriteHeight,
        58,
        98,
        this.position.x,
        this.position.y + 7,
        spriteWidth,
        spriteHeight
      );
    }
    else if (this.velocity.y < 0) {
      c.drawImage(
        playerAnim,
        jumpX * spriteWidth,
        0.75 * spriteHeight,
        58,
        98,
        this.position.x,
        this.position.y + 7,
        spriteWidth,
        spriteHeight
      );
    } else if (this.velocity.y > 0) {
      c.drawImage(
        playerAnim,
        fallX * spriteWidth,
        1.5 * spriteHeight,
        58,
        98,
        this.position.x,
        this.position.y + 7,
        spriteWidth,
        spriteHeight
      );
    } else if (keys.right.pressed) {
      c.drawImage(
        playerAnim,
        runRightX * spriteWidth,
        0 * spriteHeight,
        58,
        98,
        this.position.x,
        this.position.y + 7,
        spriteWidth,
        spriteHeight
      );
    } else if (keys.left.pressed){
      c.drawImage(
        playerAnim,
        runLeftX * spriteWidth + 11,
        2.25 * spriteHeight,
        58,
        98,
        this.position.x,
        this.position.y + 7,
        spriteWidth,
        spriteHeight
      );
    }
    else {
      c.drawImage(
        playerImage,
        this.position.x,
        this.position.y + 7,
        spriteWidth + 5,
        spriteHeight
      );
    }
  }

  update() {
    if (game.style.display == "block") {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }
}

//images
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const groundImage = createImage(ground);
const platformImage = createImage(platform);
const platformImage2 = createImage(platform2);
const backgroundImage = createImage(background);
const playerImage = createImage(playerImg);
const playerAnim = createImage(playerAnimation);
const enemyImage = createImage(enemyImg);
const brkoImage = createImage(brko);

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
  }
}

class Platform2 {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
  }
}

class Enemy {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Ground {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
  }
}

class Brko {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
  }
}

//spawn
const player = new Player(); //spawn player

const final = [new Brko({x: 9000, y:675, image: brkoImage})]

const platforms = [
  new Platform({ x: 1000, y: 625, image: platformImage }),
  new Platform({ x: 800, y: 625, image: platformImage }),
  new Platform({ x: 2200, y: 625, image: platformImage }),
  new Platform({ x: 1000, y: 425, image: platformImage }),
  new Platform({ x: 2000, y: 625, image: platformImage }),
  new Platform({ x: 2000, y: 425, image: platformImage }),
  new Platform({ x: 3600, y: 625, image: platformImage }),
  new Platform({ x: 3600, y: 425, image: platformImage }),
  new Platform({ x: 3300, y: 225, image: platformImage }),
  new Platform({ x: 3300, y: 25, image: platformImage }),
  new Platform({ x: 3300, y: -75, image: platformImage }),
  new Platform({ x: 4450, y: 625, image: platformImage }),
  new Platform({ x: 4450, y: 425, image: platformImage }),
  new Platform({ x: 4450, y: 250, image: platformImage }),
  new Platform({ x: 4450, y: -125, image: platformImage }),
  new Platform({ x: 4650, y: 625, image: platformImage }),
  new Platform({ x: 4650, y: 425, image: platformImage }),
  new Platform({ x: 7000, y: 625, image: platformImage }),
  new Platform({ x: 7000, y: 425, image: platformImage }),
  new Platform({ x: 7000, y: 225, image: platformImage }),
  new Platform({ x: 7800, y: 225, image: platformImage }),
  new Platform({ x: 7800, y: 25, image: platformImage }),
  new Platform({ x: 8100, y: 25, image: platformImage }),
  new Platform({ x: 8100, y: -175, image: platformImage }),
  new Platform({ x: 7800, y: -175, image: platformImage }),
  new Platform({ x: 8400, y: 625, image: platformImage }),
  new Platform({ x: 8400, y: 425, image: platformImage }),
  new Platform({ x: 8400, y: 225, image: platformImage }),
  new Platform({ x: 9500, y: 225, image: platformImage }),
  new Platform({ x: 9700, y: 225, image: platformImage }),
  new Platform({ x: 9900, y: 225, image: platformImage }),
  new Platform({ x: 10100, y: 225, image: platformImage }),
  new Platform({ x: 9500, y: 425, image: platformImage }),
  new Platform({ x: 9700, y: 425, image: platformImage }),
  new Platform({ x: 9900, y: 425, image: platformImage }),
  new Platform({ x: 10100, y: 425, image: platformImage }),
  new Platform({ x: 9500, y: 625, image: platformImage }),
  new Platform({ x: 9700, y: 625, image: platformImage }),
  new Platform({ x: 9900, y: 625, image: platformImage }),
  new Platform({ x: 10100, y: 625, image: platformImage }),
  new Platform({ x: 9500, y: 25, image: platformImage }),
  new Platform({ x: 9700, y: 25, image: platformImage }),
  new Platform({ x: 9900, y: 25, image: platformImage }),
  new Platform({ x: 10100, y: 25, image: platformImage }),
  new Platform({ x: 9500, y: -175, image: platformImage }),
  new Platform({ x: 9700, y: -175, image: platformImage }),
  new Platform({ x: 9900, y: -175, image: platformImage }),
  new Platform({ x: 10100, y: -175, image: platformImage }),
];

const platforms2 = [
  new Platform2({ x: 1200, y: 675, image: platformImage2}),
  new Platform2({ x: 0, y: 505, image: platformImage2}),
  new Platform2({ x: 1400, y: 425, image: platformImage2}),
  new Platform2({ x: 1600, y: 425, image: platformImage2}),
  new Platform2({ x: 2800, y: 725, image: platformImage2}),
  new Platform2({ x: 2600, y: 225, image: platformImage2}),
  new Platform2({ x: 3000, y: 725, image: platformImage2}),
  new Platform2({ x: 3100, y: 325, image: platformImage2}),
  new Platform2({ x: 2900, y: 625, image: platformImage2}),
  new Platform2({ x: 3800, y: 425, image: platformImage2}),
  new Platform2({ x: 4000, y: 425, image: platformImage2}),
  new Platform2({ x: 5000, y: 425, image: platformImage2}),
  new Platform2({ x: 5500, y: 425, image: platformImage2}),
  new Platform2({ x: 6000, y: 425, image: platformImage2}),
  new Platform2({ x: 6500, y: 375, image: platformImage2}),
  new Platform2({ x: 7200, y: 375, image: platformImage2}),
]

const genericObjects = [
  new GenericObject({ x: 0, y: 0, image: backgroundImage }),
  new GenericObject({ x: 1000, y: 0, image: backgroundImage }),
  new GenericObject({ x: 1000 * 2, y: 0, image: backgroundImage }),
  new GenericObject({ x: 1000 * 3, y: 0, image: backgroundImage }),
];

const grounds = [
  new Ground({ x: 0, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 2 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 3 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 4 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 5 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 6 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 7 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 8 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 9 - 1, y: 825, image: groundImage }),
  new Ground({ x: groundImage.width * 10 - 1, y: 825, image: groundImage }),
];

const enemies = [
  new Enemy({ x: 100, y: 765, image: enemyImage}),
  new Enemy({ x: 5, y: 445, image: enemyImage}),
  new Enemy({ x: 1700, y: 765, image: enemyImage}),
  new Enemy({ x: 1500, y: 365, image: enemyImage}),
  new Enemy({ x: 900, y: 565, image: enemyImage}),
  new Enemy({ x: 2500, y: 765, image: enemyImage}),
  new Enemy({ x: 2620, y: 165, image: enemyImage}),
  new Enemy({ x: 2820, y: 665, image: enemyImage}),
  new Enemy({ x: 3500, y: 765, image: enemyImage}),
  new Enemy({ x: 3900, y: 765, image: enemyImage}),
  new Enemy({ x: 5500, y: 765, image: enemyImage}),
  new Enemy({ x: 5300, y: 765, image: enemyImage}),
  new Enemy({ x: 5900, y: 765, image: enemyImage}),
  new Enemy({ x: 6100, y: 765, image: enemyImage}),
  new Enemy({ x: 7200, y: 315, image: enemyImage}),
  new Enemy({ x: 7200, y: 765, image: enemyImage}),
  new Enemy({ x: 7800, y: 765, image: enemyImage}),
  new Enemy({ x: 8200, y: 765, image: enemyImage}),
  new Enemy({ x: 8650, y: 765, image: enemyImage}),
  new Enemy({ x: 8900, y: 765, image: enemyImage}),
]

let offSet = 0;
let canAddOffSet = true;

//bind
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};

//animation / C# void Update()
function animation() {
  requestAnimationFrame(animation);
  if(keys.up.pressed && keys.left.pressed){
    if (gameFrame % staggerFrames == 0) {
      if (jumpLeftX > 0) {
        jumpLeftX -= 0.75;
      } else {
        jumpLeftX = 2.5;
      }
    }
  }
  else if (keys.up.pressed) {
    if (gameFrame % staggerFrames == 0) {
      if (jumpX < 2.5) {
        jumpX += 0.75;
      } else {
        jumpX = 0;
      }
    }
  } 
  else if (keys.right.pressed) {
    if (gameFrame % staggerFrames == 0) {
      if (runRightX < 5) {
        runRightX += 0.75;
      } else {
        runRightX = 0;
      }
    }
  } else if (keys.left.pressed) {
    if (gameFrame % staggerFrames == 0) {
      if (runLeftX > 0) {
        runLeftX -= 0.75;
      } else {
        runLeftX = 5;
      }
    }
  }
  else if (player.velocity.y > 0 && keys.left.pressed) {
    if (gameFrame % staggerFrames == 0) {
      if (fallLeftX > 0) {
        fallLeftX -= 0.75;
      } else {
        fallLeftX = 2;
      }
    }
  }
  else if (player.velocity.y > 0) {
    if (gameFrame % staggerFrames == 0) {
      if (fallX < 2) {
        fallX += 0.75;
      } else {
        fallX = 0;
      }
    }
  }
  gameFrame++;

  c.clearRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
    genericObject.update();
  });

  platforms2.forEach((platform2) => {
    platform2.draw();
    platform2.update();
  })

  platforms.forEach((platform) => {
    platform.draw();
    platform.update();
  });

  grounds.forEach((ground) => {
    ground.draw();
    ground.update();
  });

  enemies.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  })

  final.forEach((final) =>{
    final.draw();
    final.update();
  });

  if (player.position.x <= 600 && offSet == 0) {
    if (keys.right.pressed) {
      player.velocity.x = 5;
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      grounds.forEach((ground) => {
        ground.velocity.x = 0;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      });
    } else if (keys.left.pressed) {
      player.velocity.x = -5;
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      grounds.forEach((ground) => {
        ground.velocity.x = 0;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      });
    } else {
      player.velocity.x = 0;
    }
  } else if (keys.right.pressed && player.position.x < 600) {
    player.velocity.x = 5;
    platforms.forEach((platform) => {
      platform.velocity.x = 0;
    });
    platforms2.forEach((platform2) => {
      platform2.velocity.x = 0;
    });
    grounds.forEach((ground) => {
      ground.velocity.x = 0;
    });
    genericObjects.forEach((genericObject) => {
      genericObject.velocity.x = 0;
    });
    enemies.forEach((enemy) => {
      enemy.velocity.x = 0;
    })
    final.forEach((final) =>{
      final.velocity.x = 0;
    });
  } else if (keys.left.pressed && player.position.x > 300) {
    player.velocity.x = -5;
    platforms.forEach((platform) => {
      platform.velocity.x = 0;
    });
    platforms2.forEach((platform2) => {
      platform2.velocity.x = 0;
    });
    grounds.forEach((ground) => {
      ground.velocity.x = 0;
    });
    genericObjects.forEach((genericObject) => {
      genericObject.velocity.x = 0;
    });
    enemies.forEach((enemy) => {
      enemy.velocity.x = 0;
    })
    final.forEach((final) =>{
      final.velocity.x = 0;
    });
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      if (canAddOffSet) {
        offSet += 1;
      }
      player.check = 5;
      platforms.forEach((platform) => {
        platform.velocity.x = -5;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = -5;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.velocity.x = -2;
      });
      grounds.forEach((grounds) => {
        grounds.velocity.x = -5;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = -5;
      })
      final.forEach((final) =>{
        final.velocity.x = -5;
      });
    } else if (keys.left.pressed) {
      if (canAddOffSet) {
        offSet -= 1;
      }
      player.check = -5;
      platforms.forEach((platform) => {
        platform.velocity.x = 5;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 5;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.velocity.x = 2;
      });
      grounds.forEach((grounds) => {
        grounds.velocity.x = 5;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 5;
      })
      final.forEach((final) =>{
        final.velocity.x = 5;
      });
    } else {
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.velocity.x = 0;
      });
      grounds.forEach((grounds) => {
        grounds.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      });
      player.check = 0;
    }
  }
  if (keys.up.pressed) {
    if (player.platformCheck || player.groundCheck || player.platformCheck2) {
      player.velocity.y = -25;
    }
  }

  player.platformCheck = false
  player.platformCheck2 = false

  if (player.position.x + player.velocity.x <= 0) {
    player.velocity.x = 0;
  }

  //colision detection platforms
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width && 
      player.position.y + player.velocity.y <= platform.position.y + platform.height
    ) {
      player.velocity.y = 0;
      player.platformCheck = true;
    }
    if (
      player.position.x + player.width + player.velocity.x >=
        platform.position.x &&
      player.position.y + player.height >= platform.position.y &&
      player.position.y <= platform.position.y + platform.height &&
      player.position.x + player.velocity.x <=
        platform.position.x + platform.width
    ) {
      player.velocity.x = 0;
    }
    if (
      platform.position.x + platform.velocity.x <=
        player.position.x + player.width &&
      platform.position.y <= player.position.y + player.height &&
      platform.position.x + platform.velocity.x + platform.width >=
        player.position.x &&
      platform.position.y + platform.height >= player.position.y
    ) {
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      grounds.forEach((ground) => {
        ground.velocity.x = 0;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      });
      player.check = 0;
    }
  });

  platforms2.forEach((platform2) => {
    if (
      player.position.y + player.height + player.velocity.y >=
        platform2.position.y &&
      player.position.x + player.width >= platform2.position.x &&
      player.position.x <= platform2.position.x + platform2.width &&
      player.position.y + player.velocity.y <=
        platform2.position.y + platform2.height
    ) {
      player.velocity.y = 0;
      player.platformCheck2 = true
    }
    if (
      player.position.x + player.width + player.velocity.x >=
        platform2.position.x &&
      player.position.y + player.height >= platform2.position.y &&
      player.position.y <= platform2.position.y + platform2.height &&
      player.position.x + player.velocity.x <=
        platform2.position.x + platform2.width
    ) {
      player.velocity.x = 0;
    }
    if (
      platform2.position.x + platform2.velocity.x <=
        player.position.x + player.width &&
      platform2.position.y <= player.position.y + player.height &&
      platform2.position.x + platform2.velocity.x + platform2.width >=
        player.position.x &&
      platform2.position.y + platform2.height >= player.position.y
    ) {
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      grounds.forEach((ground) => {
        ground.velocity.x = 0;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      });
      player.check = 0;
    }
  });

  final.forEach((end) => {
    if (
      player.position.y + player.height + player.velocity.y >=
      end.position.y &&
      player.position.x + player.width >= end.position.x &&
      player.position.x <= end.position.x + end.width &&
      player.position.y + player.velocity.y <=
      end.position.y + end.height
    ) {
      player.velocity.y = 0;
      game.style.display = "none";
      if(score == 0 && endingCheck){
        endings[1].style.display = "block"
      }
      else if(score == 20000 && endingCheck){
        endings[2].style.display = "block"
      }
      else if(score < 20000 && endingCheck){
        endings[0].style.display = "block"
      }
      else{
        endings[3].style.display = "block"
      }
    }
    if (
      player.position.x + player.width + player.velocity.x >=
      end.position.x &&
      player.position.y + player.height >= end.position.y &&
      player.position.y <= end.position.y + end.height &&
      player.position.x + player.velocity.x <=
      end.position.x + end.width
    ) {
      player.velocity.x = 0;
    }
    if (
      end.position.x + end.velocity.x <=
        player.position.x + player.width &&
        end.position.y <= player.position.y + player.height &&
        end.position.x + end.velocity.x + end.width >=
        player.position.x &&
        end.position.y + end.height >= player.position.y
    ) {
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      grounds.forEach((ground) => {
        ground.velocity.x = 0;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      });
      player.check = 0;
    }
  });


  enemies.forEach((enemy) => {
    if (
      player.position.y + player.height + player.velocity.y >=
      enemy.position.y &&
      player.position.x + player.width >= enemy.position.x &&
      player.position.x <= enemy.position.x + enemy.width &&
      player.position.y + player.velocity.y <=
      enemy.position.y + enemy.height
    ) {
      player.velocity.y = 0;
      enemy.velocity.y = 15;
      score += 1000;
      scoreCounter.innerHTML = `Score: ${score}`;
      audio3.play();
    }
    if (
      player.position.x + player.width + player.velocity.x >=
      enemy.position.x &&
      player.position.y + player.height >= enemy.position.y &&
      player.position.y <= enemy.position.y + enemy.height &&
      player.position.x + player.velocity.x <=
      enemy.position.x + enemy.width
    ) {
      player.velocity.x = 0;
      if(player.canTakeDmg){
        hp--;
        player.canTakeDmg = false;
        setTimeout(() =>{
          player.canTakeDmg = true;
        },1000);
        hps[i].style.display = "none";
        i += -1;
        player.velocity.y = -20
      }
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (
      enemy.position.x + enemy.velocity.x <=
        player.position.x + player.width &&
        enemy.position.y <= player.position.y + player.height &&
        enemy.position.x + enemy.velocity.x + enemy.width >=
        player.position.x &&
        enemy.position.y + enemy.height >= player.position.y
    ) {
      platforms.forEach((platform) => {
        platform.velocity.x = 0;
      });
      platforms2.forEach((platform2) => {
        platform2.velocity.x = 0;
      });
      grounds.forEach((ground) => {
        ground.velocity.x = 0;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = 0;
      });
      enemies.forEach((enemy) => {
        enemy.velocity.x = 0;
      })
      final.forEach((final) =>{
        final.velocity.x = 0;
      })
      player.velocity.x = 0;
      if(player.canTakeDmg){
        hp--;
        player.canTakeDmg = false;
        setTimeout(() =>{
          player.canTakeDmg = true;
        },1000);
        hps[i].style.display = "none";
        i += -1;
        player.velocity.y = -20
      }
    }
  });
  
  if(hp == 0){
    location.reload();
  }

  if (
    (player.velocity.x == 0 && player.check == 5) ||
    (player.velocity.x == 0 && player.check == -5)
  ) {
    canAddOffSet = true;
  } else {
    canAddOffSet = false;
  }

  //grounds
  grounds.forEach((ground) => {
    if (
      player.position.y + player.height + player.velocity.y >=
        ground.position.y &&
      player.position.x + player.width >= ground.position.x &&
      player.position.x <= ground.position.x + ground.width &&
      player.position.y + player.velocity.y <= ground.position.y + ground.height
    ) {
      player.velocity.y = 0;
    }
    if (
      player.position.x + player.width + player.velocity.x >=
        ground.position.x &&
      player.position.y + player.height >= ground.position.y &&
      player.position.y <= ground.position.y + ground.height &&
      player.position.x + player.velocity.x <= ground.position.x + ground.width
    ) {
      player.velocity.x = 0;
    }
    if (player.position.y + player.height + 2 >= ground.position.y) {
      player.groundCheck = true;
    } else {
      player.groundCheck = false;
    }
  });
  player.update();
}

animation();

window.addEventListener("keydown", controls);
window.addEventListener("keyup", control);

function controls(e) {
  var x = e.keyCode;
  switch (x) {
    case 65: //A
      keys.left.pressed = true;
      break;
    case 83: //S
      keys.down.pressed = true;
      break;
    case 68: //D
      keys.right.pressed = true;
      break;
    case 87: //W
      keys.up.pressed = true;
      break;
  }
}
function control(e) {
  var x = e.keyCode;
  switch (x) {
    case 65: //A
      keys.left.pressed = false;
      break;
    case 83: //S
      keys.down.pressed = false;
      break;
    case 68: //D
      keys.right.pressed = false;
      break;
    case 87: //W
      keys.up.pressed = false;
      break;
  }
}

//buttons
play.onclick = () => {
  mainMenu.style.display = "none";
  game.style.display = "block";
  achievement.style.display = "none"

  //timer
  let sekunda = 0;
  let dessekunda = 0;
  let minuta = 0;
  setInterval(() => {
    if (
      dessekunda % 5 == 0 &&
      sekunda % 9 == 0 &&
      dessekunda != 0 &&
      sekunda != 0
    ) {
      dessekunda -= 5;
      sekunda -= 9;
      minuta++;
    } else if (sekunda % 9 == 0 && sekunda != 0) {
      sekunda -= 9;
      dessekunda++;
    } else {
      sekunda++;
    }
    timer.innerHTML = `${minuta}:${dessekunda}${sekunda}`;
    if (minuta == 60) {
      location.reload();
    }
  }, 1000);
};
leave.onclick = () => {
  leave.innerHTML = `oh cmon`;
  setTimeout(() => {
    window.close();
  }, 1000);
};
leave.onmouseover = () => {
  leave.style.transition = "1s";
  leave.style.marginLeft = "400px";
  leave.style.marginTop = "400px";
  leave.innerHTML = `yeeee... no`;
};
music.onclick = () => {
  if (music.innerHTML == `🔊`) {
    audio.pause();
    audio.currentTime = 0;
    music.innerHTML = `🔇`;
  } else {
    audio.play();
    audio.volume = 0.2;
    music.innerHTML = `🔊`;
  }
};

achievement.onclick = () =>{
  if(mainMenu.style.display == "flex"){
    achimenu.style.display = "flex";
    mainMenu.style.display = "none"
  }
  else{
    achimenu.style.display = "none";
    mainMenu.style.display = "flex"
  }
}

accepts[0].onclick = () =>{
  neutral = true;
  localStorage.setItem("neutral", neutral)
  window.close();
}

accepts[1].onclick = () =>{
  gut = true;
  localStorage.setItem("gut", gut)
  window.close();
}

accepts[2].onclick = () =>{
  bat = true;
  localStorage.setItem("bat", bat)
  window.close();
}

leave2.onclick = () =>{
  window.close();
}

trueReset.onclick = () =>{
  localStorage.clear();
  location.reload();
}

lore.onclick = () =>{
  mainMenu.style.display = "none";
  loreText.style.display = "block";
  achievement.style.display = "none";
}

back.onclick = () =>{
  mainMenu.style.display = "flex";
  loreText.style.display = "none";
  achievement.style.display = "block";
}