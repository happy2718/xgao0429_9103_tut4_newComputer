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
  for (let i = 0; i < 100; i++) {
    movingCircles.push(new MovingCircle());
  }
}

function draw() {
  movingSpeed = map(mouseX, 0, width, 0, 50);
  background(0);
  translate(width / 2, height / 2);
  for (let movingCircle of movingCircles) {
    movingCircle.update();
    movingCircle.display();
  }
  resetMatrix(); 
  drawProgressBar();
}


function drawProgressBar() {

  let progressBarHeight = 12; 
  let progressBarY = height - progressBarHeight; 
  let colorIntensity = map(mouseX, 0, width, 0, 255);
  let constrainedMouseX = constrain(mouseX, 0, width-20);
  fill(213,252,83,colorIntensity); 
  stroke(255); 
  strokeWeight(2);
  rect(10, progressBarY-5, constrainedMouseX, progressBarHeight,10); 
}

class MovingCircle {
  constructor() {
    this.xPosition = random(-width/2, width/2);
    this.yPosition = random(-height/2, height/2);
    this.zPosition = random(width);
    this.circle = new Circle(0, 0, 50, 16, 3);
  }

  update() {
    this.zPosition -= movingSpeed;
    if (this.zPosition < 1) {
      this.zPosition = width;
      this.xPosition = random(-width/2, width/2);
      this.yPosition = random(-height/2, height/2);
    }
  }

  display() {
    let adjustedXPosition = map(this.xPosition / this.zPosition, 0, 1, 0, width);
    let adjustedYPosition = map(this.yPosition / this.zPosition, 0, 1, 0, height);
    let circleRadius = map(this.zPosition, 0, width, 200, 50);
    push();
    translate(adjustedXPosition, adjustedYPosition);
    scale(circleRadius / 200);
    this.circle.display();
    pop();
  }
}

class Circle {
  constructor(x, y, r, count, gap) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.count = count; 
    this.gap = gap; 
    this.concentricColorOne = color(random(255), random(255), random(255));
    this.concentricColorTwo = color(random(255), random(255), random(255));
    this.concentricColorThree = color(random(255), random(255), random(255));
    this.concentricColorTour = color(random(255), random(255), random(255));
    this.smallCircleColor = color(random(255), random(255), random(255));
    this.bigCircleColor = color(random(255), random(255), random(255));
  }

  display() {
    let smallCircleRadius = 3.5;
    let smallcircleNumber = 40;
    let boundaryRadius = this.r + this.gap * 2 + 5 * this.gap * smallCircleRadius + smallCircleRadius;
    let colorIntensity = map(mouseX, 0, width, 0, 255);
    this.bigCircleColor = color(red(this.bigCircleColor), green(this.bigCircleColor), blue(this.bigCircleColor), colorIntensity);
    fill(this.bigCircleColor); 
    strokeWeight(4);
    stroke(255,255,255);
    ellipse(this.x, this.y, boundaryRadius * 2);
    for (let i = 0; i < this.count; i++) {
      let radius = this.r - i * this.gap;
      if (i === this.count - 1) {  
        fill(255);  
      } else if (i <= this.count / 2) {  
        if (i % 2 === 1) {  
          fill(this.concentricColorOne);  
        } else {  
          fill(this.concentricColorTwo);  
        }
      } else if (i >= this.count / 2 + 1 && i < this.count - 1) {  
        if (i % 2 === 1) {  
          fill(this.concentricColorThree);  
        } else {  
          fill(this.concentricColorTour);  
        }
      }
      noStroke();
      ellipse(this.x, this.y, radius * 2);
    }
    for (let j = 0; j < 5; j++) {
      let outerRadius = this.r + this.gap * 2 + j * this.gap * smallCircleRadius; 
      fill(this.smallCircleColor); 
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