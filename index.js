const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.1;
const playerSpeedX = 1;
const playerSpeedY = 5;
var canJump = true;
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
  constructor() {
    this.position = {
      x: 200,
      y: 800,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

function animate() {
  requestAnimationFrame(animate);
  //clear canvas and redraw
  c.clearRect(0, 0, canvas.width, canvas.height);
  platform.draw();
  player.update();
  //check for movement
  if (keysPressed.right) {
    player.velocity.x = playerSpeedX;
  } else if (keysPressed.left) {
    player.velocity.x = -playerSpeedX;
  } else {
    player.velocity.x = 0;
  }
  if (keysPressed.up && canJump) {
    player.velocity.y = -playerSpeedY;
    canJump = false;
  }
  if (player.velocity.y === 0) {
    canJump = true;
  }
  //check for player and platform collision
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
const platform = new Platform();
animate();
