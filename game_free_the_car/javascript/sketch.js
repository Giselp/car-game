let levels = []
let rectangles
let rectangles2
let rectangles3
let canvas 
let offsetX
let offsetY
let currentLevel = 0

class Rectangle {
  constructor(x, y, w, h, isMain = false, isHorizontal = false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isMain = isMain;
    this.isHorizontal = isHorizontal;
    this.isDragging = false;
    this.hasCollided = false;
    //posiciones iniciales
    this.startX = x;
    this.startY = y;
  }

  resetPosition() {
    this.x = this.startX;
    this.y = this.startY;
    this.isDragging = false;
  }
  mousePressed() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      if(!this.hasCollided){
        //activa el arrastre del mouse
      this.isDragging = true;
      //calcula desplazamiento entre posicion del mouse y esquina del rectangulo
      offsetX = mouseX - this.x;
      offsetY = mouseY - this.y;
      }
    }
  }
  mouseDragged() {
    if (this.isDragging) {
      if(this.isHorizontal){
        this.x = mouseX - offsetX
      } else{
        this.y = mouseY - offsetY
      }
    }
  }
  mouseReleased() {
    this.isDragging = false;
  }
  exit(){
    if(this.isMain){
      if(this.y <= 0){
        this.isDragging = false
      }
    }
  }
  move() { 
    //constrain(n, min, max)
    if (this.isHorizontal){
      this.x = constrain(this.x, 0, 500 - this.w)
    } else{
      this.y = constrain(this.y, 0, 500 - this.h)
    }
    this.exit()
  }
  isColliding(rect){
    return (
      this.x < rect.x + rect.w &&
      this.x + this.w > rect.x &&
      this.y < rect.y + rect.h &&
      this.y + this.h > rect.y
    )
  }
  draw() {
    if (this.isMain) {
      if(this.y <= 0){
        fill(252, 155, 69);
        popupNextLevel.style.display = "block";
        infoContainer.style.display = "none";
        exitBtn.style.display = "none";
        canvas.elt.style.display = "none";
      } else{
        fill(36, 46, 56)
      }
    } else {
      fill(174, 147, 236);
      stroke(154, 57, 236);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}


//FUNCIONES
function setup(){
  canvas = createCanvas(500, 500);
  canvas.parent("canvas-container");

  //rect(this.x, this.y, this.w, this.h)
  //LEVEL1
  rect1 = new Rectangle(100, 0, 200, 100, false, true);
  rect2 = new Rectangle(100, 100, 200, 100, false, true);
  rect3 = new Rectangle(0, 0, 100, 300, false, false);
  rect4 = new Rectangle(400, 0, 100, 200, false, false);
  rect5 = new Rectangle(200, 300, 100, 300, true, false);
  //LEVEL2
  rect6 = new Rectangle(0, 0, 100, 200, false, false);
  rect7 = new Rectangle(100, 0, 200, 100, false, true);
  rect8 = new Rectangle(100, 100, 200, 100, false, true);
  rect9 = new Rectangle(200, 200, 200, 100, false, true);
  rect10 = new Rectangle(400, 300, 100, 200, false, false);
  rect11 = new Rectangle(200, 300, 100, 200, true, false);
  //LEVEL3
  rect12 = new Rectangle(100, 100, 200, 100, false, true);
  rect13 = new Rectangle(0, 0, 100, 300, false, false);
  rect14 = new Rectangle(400, 0, 100, 200, false, false);
  rect15 = new Rectangle(200, 300, 100, 300, true, false);

  rectangles = [rect1, rect2, rect3, rect4, rect5];
  rectangles2 = [rect6, rect7, rect8, rect9, rect10, rect11];
  rectangles3 = [rect12, rect13, rect14, rect15];

  levels.push(rectangles);
  levels.push(rectangles2);
  levels.push(rectangles3);

  console.log(levels)

}

function draw(){
  background("yellow");
  /* background(244, 216, 216); */

  const rec = levels[currentLevel];

  //compruebo estado de colision
  rec.forEach((rectangle) => {
    rectangle.hasCollided = false
  })
  //verifico colisiones entre pares de rect
  for(let i = 0; i < rec.length; i++){
      for(let j = i + 1; j < rec.length; j++){
        let element1 = rec[i]
        let element2 = rec[j]

        if(element1.isColliding(element2)){
          element1.hasCollided = true;
          element2.hasCollided = true;

          element1.isDragging = false;
          element2.isDragging = false;
      }
    }
  }
  rec.forEach((rectangle) => {
    rectangle.move();
    rectangle.draw();
  });
}

function mousePressed(){
  const rec = levels[currentLevel];
  rec.forEach((rectangle) => {
    rectangle.mousePressed()
  })
}

function mouseDragged(){
  const rec = levels[currentLevel];
  rec.forEach((rectangle) => {
    rectangle.mouseDragged()
  })
}

function mouseReleased(){
  const rec = levels[currentLevel];
  rec.forEach((rectangle) => {
    rectangle.mouseReleased()
  })
}

