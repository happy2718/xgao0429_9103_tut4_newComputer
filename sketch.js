let movingCircles = [];
let movingSpeed;
function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 8; i++) {
    movingCircles.push(new MovingCircle());
  }
}

function draw() {
  movingSpeed = map(mouseX, 0, width, 0, 100);
  background(0);
  for (let movingCircle of movingCircles) {
    movingCircle.update();
    movingCircle.display();
  }
}

class MovingCircle {
  constructor() {
    this.xPosition = random(-width, width);
    this.yPosition = random(-height, height);
    this.zPosition = random(width);
    this.circleRadius = 50;
    this.movingSpeed = 2;
  }

  update() {
    this.zPosition -= movingSpeed;
    if (this.zPosition < 1) {
      this.zPosition = width;
      this.xPosition = random(-width, width);
      this.yPosition = random(-height, height);
    }
  }

  display() {
    let adjustedXPosition = map(this.xPosition / this.zPosition, 0, 1, 0, width);
    let adjustedYPosition = map(this.yPosition / this.zPosition, 0, 1, 0, height);
    let circleRadius = map(this.zPosition, 0, width, 200, 50);
    fill(255);
    noStroke();
    ellipse(adjustedXPosition, adjustedYPosition, circleRadius, circleRadius);
  }
}