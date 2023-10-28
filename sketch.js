let movingCircles = [];
let movingSpeed;
function setup() {
  let canvasElement = createCanvas(1000, 600);
  canvasElement.parent('canvas-container');
  initializeSketch();
}

function initializeSketch() {
  movingCircles = [];
  for (let i = 0; i < 800; i++) {
    movingCircles.push(new MovingCircle());
  }
}

function draw() {
  movingSpeed = map(mouseX, 0, width, 0, 100);
  background(0);
  translate(width / 2, height / 2);
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
    this.previousZPosition = this.zPosition;
  }

  update() {
    this.previousZPosition = this.zPosition;
    this.zPosition -= movingSpeed;
    if (this.zPosition < 1) {
      this.zPosition = width;
      this.xPosition = random(-width, width);
      this.yPosition = random(-height, height);
      this.previousZPosition = this.zPosition;
    }
  }

  display() {
    let adjustedXPosition = map(this.xPosition / this.zPosition, 0, 1, 0, width);
    let adjustedYPosition = map(this.yPosition / this.zPosition, 0, 1, 0, height);
    let circleRadius = map(this.zPosition, 0, width, 200, 50);
    fill(255);
    stroke(233);
    strokeWeight(10);
    ellipse(adjustedXPosition, adjustedYPosition, circleRadius, circleRadius);
  }
}