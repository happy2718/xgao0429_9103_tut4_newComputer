let movingCircles = [];
let movingSpeed;
let isAnimationActive = true;

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

class Circle {
  constructor(x, y, r, count, gap) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.count = count; 
    this.gap = gap; 
    this.colorA = color(random(255), random(255), random(255));
    this.colorB = color(random(255), random(255), random(255));
    this.colorC = color(random(255), random(255), random(255));
    this.colorD = color(random(255), random(255), random(255));
    this.colorF = color(random(255), random(255), random(255));
    this.colorE = color(random(255), random(255), random(255));
  }

  display() {
    let smallCircleRadius = 3.5;
    let smallcircleNumber = 40;
    let boundaryRadius = this.r + this.gap * 2 + 5 * this.gap * smallCircleRadius + smallCircleRadius;
    fill(this.colorE); 
    ellipse(this.x, this.y, boundaryRadius * 2);
    for (let i = 0; i < this.count; i++) {
      let radius = this.r - i * this.gap;
      if (i === this.count - 1) {  
        fill(255);  
      } else if (i <= this.count / 2) {  
        if (i % 2 === 1) {  
          fill(this.colorA);  
        } else {  
          fill(this.colorB);  
        }
      } else if (i >= this.count / 2 + 1 && i < this.count - 1) {  
        if (i % 2 === 1) {  
          fill(this.colorC);  
        } else {  
          fill(this.colorD);  
        }
      }
      noStroke();
      ellipse(this.x, this.y, radius * 2);
    }
    for (let j = 0; j < 5; j++) {
      let outerRadius = this.r + this.gap * 2 + j * this.gap * smallCircleRadius; 
      fill(this.colorF); 
      for (let i = 0; i < (smallcircleNumber + j * 3); i++) {
        let angle = TWO_PI / (smallcircleNumber + j * 3) * i;
        let smallCircleX = this.x + outerRadius * cos(angle);
        let smallCircleY = this.y + outerRadius * sin(angle);
        
        ellipse(smallCircleX, smallCircleY, smallCircleRadius * 2);
      }
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    isAnimationActive = !isAnimationActive;
    if (isAnimationActive) {
      loop();
    } else {
      noLoop();
    }
  }
}