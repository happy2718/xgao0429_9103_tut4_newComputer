function setup() {
  createCanvas(1000, 600);
}

function draw() {
  movingSpeed = map(mouseX, 0, width, 0, 100);
  background(0);
  fill(255);
  noStroke();
  ellipse(movingSpeed, height / 2, 50, 50);
}
