//Because of the complexity of the movement, I can't implement the circle non-overlap problem
let movingCircles = [];// An array to store all the moving circle objects
let movingSpeed;//A variable to store the moving speed of the circles
let isAnimationActive = true;//// A boolean variable to control if the animation is active or not
let backgroundCircles = [];
function setup() {
  let canvasElement = createCanvas(1000, 600);// Creating a canvas of 1000x600 pixels and attaching it to the 'canvas-container' HTML element
  canvasElement.parent('canvas-container');
  initializeSketch();
}

//A function to initialize the circle objects on the canvas
function initializeSketch() {
  movingCircles = [];
  backgroundCircles = [];
  for (let i = 0; i < 100; i++) {
    backgroundCircles.push(new WhiteMovingCircle());
  }
  for (let i = 0; i < 100; i++) {// Creating 100 moving circle objects and adding them to the array
    movingCircles.push(new MovingCircle());
  }
}

function draw() {
  movingSpeed = map(mouseX, 0, width, 0, 50);// Mapping the mouse's x position to set the moving speed, ranging from 0 to 50
  background(0);
  translate(width / 2, height / 2);
  for (let backgroundCircle of backgroundCircles) {// Updating and displaying all the moving circle objects
    backgroundCircle.update();
    backgroundCircle.display();
  }
  for (let movingCircle of movingCircles) {// Updating and displaying all the moving circle objects
    movingCircle.update();
    movingCircle.display();
  }
  resetMatrix(); // Resetting the transformation matrix
  drawProgressBar();// Drawing the progress bar
}

function drawProgressBar() {
  let progressBarHeight = 12; // The height of the progress bar
  let progressBarY = height - progressBarHeight; // The y-coordinate of the progress bar
  let colorIntensity = map(mouseX, 0, width, 0, 255);// Mapping the mouse's x position to set the color intensity
  let constrainedMouseX = constrain(mouseX, 0, width-20);// Constraining the mouse's x position within a valid range
  fill(213,252,83,colorIntensity); 
  stroke(255); 
  strokeWeight(2);
  rect(10, progressBarY-5, constrainedMouseX, progressBarHeight,10); 
}

// Class for the moving circles
class MovingCircle {
  constructor() {
    this.xPosition = random(-width/2, width/2);
    this.yPosition = random(-height/2, height/2);
    this.zPosition = random(width);
    this.circle = new Circle(0, 0, 50, 16, 3);// Creating a new Circle object
  }

  // Function to update the circle's position
  update() {
    this.zPosition -= movingSpeed;
    if (this.zPosition < 1) {
      this.zPosition = width;
      this.xPosition = random(-width/2, width/2);
      this.yPosition = random(-height/2, height/2);
    }
  }
  // Function to display the circle
  display() {
    let adjustedXPosition = map(this.xPosition / this.zPosition, 0, 1, 0, width);
    let adjustedYPosition = map(this.yPosition / this.zPosition, 0, 1, 0, height);
    let circleRadius = map(this.zPosition, 0, width, 200, 50);// Adjusting the circle's radius based on its z-position
    push();
    translate(adjustedXPosition, adjustedYPosition);// Scaling the circle based on its radius
    scale(circleRadius / 200);
    this.circle.display();
    pop();
  }
}

// Define a class named Circle
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
    ellipse(this.x, this.y, boundaryRadius * 2);// Drawing the outermost circle
    // Drawing the concentric circles
    for (let i = 0; i < this.count; i++) {
      let radius = this.r - i * this.gap;// Calculating the radius for each concentric circle
      if (i === this.count - 1) {  
        fill(255);  
      } else if (i <= this.count / 2) { 
        // Setting fill colors for the first half of the concentric circles 
        if (i % 2 === 1) {  
          fill(this.concentricColorOne);  
        } else {  
          fill(this.concentricColorTwo);  
        }
      } else if (i >= this.count / 2 + 1 && i < this.count - 1) {  
        // Setting fill colors for the second half of the concentric circles
        if (i % 2 === 1) {  
          fill(this.concentricColorThree);  
        } else {  
          fill(this.concentricColorTour);  
        }
      }
      noStroke();
      ellipse(this.x, this.y, radius * 2);// Drawing each concentric circle
    }
    // Drawing small circles around the concentric circles
    for (let j = 0; j < 5; j++) {
      let outerRadius = this.r + this.gap * 2 + j * this.gap * smallCircleRadius; 
      fill(this.smallCircleColor); 
      for (let i = 0; i < (smallcircleNumber + j * 3); i++) {
        let angle = TWO_PI / (smallcircleNumber + j * 3) * i;// Calculating the angle for each small circle
        let smallCircleX = this.x + outerRadius * cos(angle);// Calculating the x-coordinate
        let smallCircleY = this.y + outerRadius * sin(angle);// Calculating the y-coordinate
        // Drawing each small circle
        ellipse(smallCircleX, smallCircleY, smallCircleRadius * 2);
      }
    }
  }
}

// Define a class named WhiteMovingCircle, which inherits from the MovingCircle class
class WhiteMovingCircle extends MovingCircle {
  constructor() {
    super(); // Call the constructor of the parent class
  }
  display() {
    let adjustedXPosition = map(this.xPosition / this.zPosition, 0, 1, 0, width);
    let adjustedYPosition = map(this.yPosition / this.zPosition, 0, 1, 0, height);
    let circleRadius = map(this.zPosition, 0, width, 20, 5); 
    fill(255);
    noStroke();
    push();
    translate(adjustedXPosition, adjustedYPosition);
    ellipse(0, 0, circleRadius * 2); 
    pop();
  }
}

// Function to handle key presses
function keyPressed() {
  if (key === 's' || key === 'S') {
    isAnimationActive = !isAnimationActive;
    if (isAnimationActive) {
      loop();// Resume the animation if it's active
    } else {
      noLoop();// Pause the animation if it's not active
    }
  }
}