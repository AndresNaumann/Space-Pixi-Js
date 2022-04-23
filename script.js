const appWidth = 600;
const appHeight = 400;
const ballSize = 32;

const app = new PIXI.Application({
  backgroundColor: 0xe3e3e3,
  height: appHeight,
  width: appWidth,
});
document.body.appendChild(app.view);

let circle = new PIXI.Graphics();
circle.beginFill(0xff3333);
circle.drawCircle(0, 0, ballSize);
circle.endFill();
circle.x = ballSize;
circle.y = appHeight - ballSize - 1;
app.stage.addChild(circle);

circle.dx = 2;
circle.dy = -10;

app.ticker.add((delta) => gameLoop(delta));

let x, y;

function gameLoop(delta) {
  window.addEventListener("mousemove", function (e) {
    x = e.screenX;
    y = e.screenY;
  });

  if (circle.x >= appWidth - ballSize || circle.x < ballSize) circle.dx *= -1;
  if (circle.y >= appHeight - ballSize) circle.dy = -10;

  circle.x += circle.dx;
  circle.dy += 0.2;
  circle.y += circle.dy;

  if (circle.y >= y) circle.dy *= 1.1;
  if (circle.y <= y) circle.dy *= 0.9;
}
