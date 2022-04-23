const appWidth = 800;
const appHeight = 600;

const Application = PIXI.Application;
const app = new PIXI.Application({
  backgroundColor: 0x23395d,
  height: appHeight,
  width: appWidth,
});

document.getElementById("game-screen").appendChild(app.view);

const Graphics = PIXI.Graphics;

let xVel;
let yVel;
let xDisplacement = 100;
let MouseX, MouseY;
let stars = [];

// Star Class
class star {
  star;
  posX;
  posY;
  orbitSpeed;
  size;
  d;
  dx;
  dy;
  sin;
  cos;
  spinX;
  spinY;
  speedX;
  speedY;

  constructor(x, y, oS, size) {
    this.posX = x;
    this.posY = y;
    this.orbitSpeed = oS;
    this.size = size;
  }

  drawStar() {
    this.star = new Graphics();
    this.star
      .beginFill(0xffffff)
      .drawCircle(this.posX, this.posY, this.size)
      .endFill();
    app.stage.addChild(this.star);
  }
  // Calculate the distance between the stars and the mouse.

  calcD() {}

  // Make the object move.

  orbit() {
    this.d = Math.sqrt(
      Math.pow(MouseX - this.posX, 2) + Math.pow(MouseY - this.posY, 2)
    );

    this.dx = MouseX - this.posX;
    this.dy = MouseY - this.posY;

    this.sin = this.dy / this.d;
    this.cos = this.dx / this.d;

    // Suck from Mouse
    this.speedX = (this.cos * this.orbitSpeed) / 8;
    this.speedY = (this.sin * this.orbitSpeed) / 8;

    // Spin from Mouse
    this.spinX = this.sin * this.orbitSpeed;
    this.spinY = this.cos * this.orbitSpeed;

    // suck
    this.posX += this.speedX * 0.5;
    this.posY += this.speedY * 0.5;

    //spin
    this.posX += this.spinX;
    this.posY -= this.spinY;
  }
}

// Sets values to the MouseX and MouseY Variables.
window.addEventListener("mousemove", function (e) {
  MouseX = e.screenX;
  MouseY = e.screenY - 200;
});

// Creates a bunch of star objects
for (let i = 0; i < 100; i++) {
  let randX = Math.random() * appWidth;
  let randY = Math.random() * appHeight;
  stars[i] = new star(randX, randY, 10, 2);
}

// Game Loop
app.ticker.add((delta) => loop(delta));

let newBG = new Graphics();
newBG.beginFill(0x23395d).drawRect(0, 0, appWidth, appHeight).endFill();

function loop() {
  app.stage.removeChildren();
  app.stage.addChild(newBG);

  for (let i = 0; i < stars.length; i++) {
    stars[i].drawStar();
    stars[i].orbit();
  }
}

// TODO List
// if mouse goes out of bounds, pause the game.
//
