const platform = (document.querySelector(".myImg").src =
  "./res/img/platform.png");
const ground = (document.querySelector(".myImg").src = "./res/img/ground.png");
const background = (document.querySelector(".myImg").src =
  "./res/img/background.jpg");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const timer = document.getElementById("timer");
const play = document.getElementById("play");
const leave = document.getElementById("leave");
const game = document.getElementById("game");
const mainMenu = document.getElementById("mainMenu");
const music = document.getElementById("music");

const audio = document.getElementById("audio");

window.open('', '_self', '');

canvas.width = 1500;
canvas.height = 1000;

const gravity = 1.5;

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
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
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

//images
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const groundImage = createImage(ground);
const platformImage = createImage(platform);
const backgroundImage = createImage(background);

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

//spawn
const player = new Player(); //spawn player

const platforms = [
  //ground
  new Platform({ x: 0, y: 865, image: groundImage }),
  new Platform({ x: groundImage.width - 1, y: 865, image: groundImage }),
  new Platform({ x: groundImage.width + 856, y: 865, image: groundImage }),
  //platforms
  new Platform({ x: 800, y: 670, image: platformImage }),
];

const genericObjects = [
  new GenericObject({ x: 0, y: 0, image: backgroundImage }),
];

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
  c.clearRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.position.x -= 2;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.position.x += 2;
      });
    }
  }
  if (keys.up.pressed) {
    player.velocity.y = -20;
  }

  //colision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width &&
      player.position.y + player.velocity.y <=
        platform.position.y + platform.height
    ) {
      player.velocity.y = 0;
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
  leave.innerHTML = `fuuu`;
  setTimeout(() =>{
    window.close();
  }, 1000)
};
leave.onmouseover = () => {
      leave.style.transition = "1s";
      leave.style.marginLeft = "400px";
      leave.style.marginTop = "400px";
      leave.innerHTML = `lmao no`;
};
music.onclick = () => {
  if (music.innerHTML == `🔇`) {
    audio.pause();
    audio.currentTime = 0;
    music.innerHTML = `🔊`;
  } else {
    audio.play();
    audio.volume = 0.2;
    music.innerHTML = `🔇`;
  }
};
