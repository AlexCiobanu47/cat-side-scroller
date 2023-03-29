const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.1;
const playerSpeedX = 1;
const playerSpeedY = 5;
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

const player = new Player();
function animate() {
  requestAnimationFrame(animate);
  //clear canvas and redraw
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}
animate();

addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      player.velocity.y -= playerSpeedY;
      break;
    case "a":
      player.velocity.x -= playerSpeedX;
      break;
    case "s":
      player.velocity.y += playerSpeedY;
      break;
    case "d":
      player.velocity.x += playerSpeedX;
      break;
  }
});
addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      break;
    case "a":
      player.velocity.x = 0;
      break;
    case "s":
      break;
    case "d":
      player.velocity.x = 0;
      break;
  }
});
