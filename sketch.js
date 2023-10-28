let movingCircle;
function setup() {
  createCanvas(1000, 600);
  movingCircle = new MovingCircle();
}

function draw() {
  background(0);
  movingCircle.update();
  movingCircle.display();
}

class MovingCircle {
  constructor() {
    this.xPosition = width / 2;
    this.yPosition = height / 2;
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