const platform = "./img/platform.png";
const hills = "./img/hills.png";
const background = "./img/background.png";
const jumpPlatform = "./img/platformSmallTall.png";
const catIdleRight = "./img/catIdleRight.png";
const catIdleLeft = "./img/catIdleLeft.png";
const catRunRight = "./img/catRunRight.png";
const catRunLeft = "./img/catRunLeft.png";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 0.1;
const playerSpeedX = 3;
const playerSpeedY = 7;
const parallaxOffset = playerSpeedX / 2;
//sprites
const platformImage = new Image();
platformImage.src = platform;
const hillsImage = new Image();
hillsImage.src = hills;
const backgroundImage = new Image();
backgroundImage.src = background;
const jumpPlatformImage = new Image();
jumpPlatformImage.src = jumpPlatform;
const catIdleRightImage = new Image();
catIdleRightImage.src = catIdleRight;
const catIdleLeftImage = new Image();
catIdleLeftImage.src = catIdleLeft;
const catRunRightImage = new Image();
catRunRightImage.src = catRunRight;
const catRunLeftImage = new Image();
catRunLeftImage.src = catRunLeft;
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
    this.image = catIdleRightImage;
    this.frames = 0;
    this.sprites = {
      idle: {
        right: catIdleRightImage,
        left: catIdleLeftImage,
        cropWidth: 32,
      },
      running: {
        right: catRunRightImage,
        left: catRunLeftImage,
        cropWidth: 32,
      },
    };
    this.currentSprite = this.sprites.idle.right;
    this.currentCropWidth = 32;
    this.currentFrame = 0;
    this.width = 50;
    this.height = 50;
    this.velocity = {
      x: 0,
      y: 1,
    };
  }
  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth + 100 * this.currentFrame,
      32,
      38,
      32,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    //idle animation
    if (
      this.currentFrame == 10 &&
      this.currentSprite === this.sprites.idle.right
    ) {
      this.currentFrame = 0;
    }
    if (
      this.currentFrame == 10 &&
      this.currentSprite === this.sprites.idle.left
    ) {
      this.currentFrame = 0;
    }
    //running animation
    if (
      this.currentFrame == 8 &&
      this.currentSprite === this.sprites.running.right
    ) {
      this.currentFrame = 0;
    }
    if (
      this.currentFrame === 8 &&
      this.currentSprite === this.sprites.running.left
    ) {
      this.currentFrame = 0;
    }
    //update movement
    this.frames++;
    if (this.frames % 20 === 0) {
      this.currentFrame++;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    //add gravity
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
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
//game initialization
let player = new Player();
let platforms = [];
let sceneryObjects = [];
let scrollOffset = 0;
let canJump = true;
//restart game function
function init() {
  player = new Player();
  platforms = [
    new Platform({
      image: jumpPlatformImage,
      x: platformImage.width * 5 + 300 - 2 - jumpPlatformImage.width,
      y: 270,
    }),
    new Platform({ image: platformImage, x: -1, y: 470 }),
    new Platform({ image: platformImage, x: platformImage.width - 3, y: 470 }),
    new Platform({
      image: platformImage,
      x: platformImage.width * 2 + 100,
      y: 470,
    }),
    new Platform({
      image: platformImage,
      x: platformImage.width * 3 + 300,
      y: 470,
    }),
    new Platform({
      image: platformImage,
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
    }),
    new Platform({
      image: platformImage,
      x: platformImage.width * 5 + 800 - 2,
      y: 470,
    }),
  ];
  sceneryObjects = [
    new SceneryObject({ image: backgroundImage, x: -1, y: -1 }),
    new SceneryObject({ image: hillsImage, x: -1, y: -1 }),
  ];
  scrollOffset = 0;
  canJump = true;
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
  } else if (
    (keysPressed.left && player.position.x > 100) ||
    (keysPressed.left && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -playerSpeedX;
  } else {
    player.velocity.x = 0;
    if (keysPressed.right) {
      scrollOffset += playerSpeedX;
      platforms.forEach((platform) => {
        platform.position.x -= playerSpeedX;
      });
      sceneryObjects.forEach((object) => {
        object.position.x -= playerSpeedX - parallaxOffset;
      });
    } else if (keysPressed.left && scrollOffset > 0) {
      scrollOffset -= playerSpeedX;
      platforms.forEach((platform) => {
        platform.position.x += playerSpeedX;
      });
      sceneryObjects.forEach((object) => {
        object.position.x += playerSpeedX - parallaxOffset;
      });
    }
  }
  if (keysPressed.up && canJump) {
    player.velocity.y = -playerSpeedY;
    canJump = false;
  }
  if (player.velocity.y === 0.1) {
    canJump = true;
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
  if (scrollOffset === 3300) {
    console.log("WIN");
  }
  //check lose condition
  if (player.position.y > canvas.height) {
    init();
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
      player.currentSprite = player.sprites.running.left;
      player.currentCropWidth = player.sprites.running.cropWidth;
      break;
    case "s":
      break;
    case "d":
      keysPressed.right = true;
      player.currentSprite = player.sprites.running.right;
      player.currentCropWidth = player.sprites.running.cropWidth;
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
      player.currentSprite = player.sprites.idle.left;
      player.currentCropWidth = player.sprites.idle.cropWidth;
      break;
    case "s":
      break;
    case "d":
      keysPressed.right = false;
      player.currentSprite = player.sprites.idle.right;
      player.currentCropWidth = player.sprites.idle.cropWidth;
      break;
  }
});
init();
animate();
