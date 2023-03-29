const platform = "./img/platform.png";
const hills = "/img/hills.png";
const background = "/img/background.png";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 0.1;
const playerSpeedX = 1;
const playerSpeedY = 5;
let scrollOffset = 0;
const parallaxOffset = 0.2;
const platformImage = new Image();
platformImage.src = platform;
const hillsImage = new Image();
hillsImage.src = hills;
const backgroundImage = new Image();
backgroundImage.src = background;
const keysPressed = {
  right: false,
  left: false,
  up: false,
  down: false,
};
//classes
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 30;
    this.height = 50;
    this.velocity = {
      x: 0,
      y: 1,
    };
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    //update movement
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    //add gravity
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
    this.draw();
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
class SceneryObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function animate() {
  requestAnimationFrame(animate);
  //clear canvas and redraw
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  sceneryObjects.forEach((object) => {
    object.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();
  //check for movement
  if (keysPressed.right && player.position.x < 400) {
    player.velocity.x = playerSpeedX;
  } else if (keysPressed.left && player.position.x > 100) {
    player.velocity.x = -playerSpeedX;
  } else {
    player.velocity.x = 0;
    if (keysPressed.right) {
      scrollOffset += playerSpeedX;
      platforms.forEach((platform) => {
        platform.position.x -= playerSpeedX;
      });
      sceneryObjects.forEach((object) => {
        object.position.x -= playerSpeedX + parallaxOffset;
      });
    } else if (keysPressed.left) {
      scrollOffset -= playerSpeedX;
      platforms.forEach((platform) => {
        platform.position.x += playerSpeedX;
      });
      sceneryObjects.forEach((object) => {
        object.position.x += playerSpeedX - parallaxOffset;
      });
    }
  }
  if (keysPressed.up) {
    player.velocity.y = -playerSpeedY;
  }
  //check for player and platform collision
  platforms.forEach((platform) => {
    if (
      //player bottom and platform top
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      // player right and platform left
      player.position.x + player.width >= platform.position.x &&
      //player left and platform right
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  //check win condition
  if (scrollOffset > 1000) {
    console.log("WIN");
  }
}
//event listeners for movement
addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      keysPressed.up = true;
      break;
    case "a":
      keysPressed.left = true;
      break;
    case "s":
      break;
    case "d":
      keysPressed.right = true;
      break;
  }
});
addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keysPressed.up = false;
      break;
    case "a":
      keysPressed.left = false;
      break;
    case "s":
      break;
    case "d":
      keysPressed.right = false;
      break;
  }
});

const player = new Player();
const platforms = [
  new Platform({ image: platformImage, x: -1, y: 470 }),
  new Platform({ image: platformImage, x: platformImage.width - 3, y: 470 }),
];
const sceneryObjects = [
  new SceneryObject({ image: backgroundImage, x: -1, y: -1 }),
  new SceneryObject({ image: hillsImage, x: -1, y: -1 }),
];
animate();
