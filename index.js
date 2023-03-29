const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.1;
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
