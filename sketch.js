let movingCircles = [];
function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 8; i++) {
    movingCircles.push(new MovingCircle());
  }
}

function draw() {
  background(0);
  for (let movingCircle of movingCircles) {
    movingCircle.update();
    movingCircle.display();
  }
}

class MovingCircle {
  constructor() {
    this.xPosition = random(width);
    this.yPosition = random(height);
    this.circleRadius = 50;
  }

  update() {
    this.xPosition = mouseX;
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.xPosition, this.yPosition, this.circleRadius, this.circleRadius);
  }
}