const RADIUS = 200;
const DIAMETER = RADIUS * 2;

const ITER = 60;

let SUN = { x: RADIUS * 0.6, y: 0 };

function rotateLine(x1, y1, x2, y2, a) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const x1r = (x1 - midX) * cos(a) + (y1 - midY) * sin(a) + midX;
  const y1r = (y1 - midY) * cos(a) - (x1 - midX) * sin(a) + midY;
  const x2r = (x2 - midX) * cos(a) + (y2 - midY) * sin(a) + midX;
  const y2r = (y2 - midY) * cos(a) - (x2 - midX) * sin(a) + midY;

  return {
    x1: x1r,
    y1: y1r,
    x2: x2r,
    y2: y2r,
  };
}

function gradientLine(x1, y1, x2, y2, colors) {
  // linear gradient from start to end of line
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  colors.forEach(({ stop, color }) => {
    grad.addColorStop(stop, color);
  });

  this.drawingContext.strokeStyle = grad;

  line(x1, y1, x2, y2);
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  SUN = { x: windowWidth / 2 + SUN.x, y: windowHeight / 2 + SUN.y };
}

function draw() {
  background(20);

  push();
  for (let phi = 0; phi < 360; phi += 360 / ITER) {
    // draw a line from center to the point on the circle
    const x = windowWidth / 2 + RADIUS * cos(phi);
    const y = windowHeight / 2 + RADIUS * sin(phi);

    stroke(50);
    gradientLine(SUN.x, SUN.y, x, y, [
      { stop: 0, color: "#1c99e721" },
      { stop: 1, color: "#1c99e721" },
    ]);
    gradientLine(SUN.x, SUN.y, x, y, [
      { stop: 0, color: "#ffffff50" },
      { stop: 0.2, color: "#ffffff00" },
      { stop: 1, color: "#ffffff00" },
    ]);

    // draw dot at the middle of the line
    noStroke();
    fill(50);
    circle((x + SUN.x) / 2, (y + SUN.y) / 2, 5);
    fill(255);
    circle((x + SUN.x) / 2, (y + SUN.y) / 2, 1);
  }
  pop();

  push();
  for (let phi = 0; phi < 360; phi += 360 / ITER) {
    // draw a line from center to the point on the circle
    const x = windowWidth / 2 + RADIUS * cos(phi);
    const y = windowHeight / 2 + RADIUS * sin(phi);

    const { x1, y1, x2, y2 } = rotateLine(
      SUN.x,
      SUN.y,
      x,
      y,
      mapRange(mouseX, 0, windowWidth, 0, 90)
    );

    stroke(255);
    gradientLine(x1, y1, x2, y2, [
      { stop: 0, color: "#ef709b00" },
      { stop: 0.5, color: "#fa9372ff" },
      { stop: 1, color: "#ef709b00" },
    ]);
  }
  pop();

  // draw the sun
  push();
  fill(255);
  noStroke();
  circle(SUN.x, SUN.y, RADIUS * 0.05);
  pop();

  push();
  noFill();
  stroke("#1c99e720");
  strokeWeight(2);
  circle(width / 2, height / 2, DIAMETER);
  stroke("#1c99e7af");
  strokeWeight(1);
  circle(width / 2, height / 2, DIAMETER);
  pop();
}
