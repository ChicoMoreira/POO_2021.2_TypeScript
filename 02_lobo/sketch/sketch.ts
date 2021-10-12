

class Entity {
  x: number; //atributos
  y: number;
  step: number;
  image: p5.Image;
  morreu: boolean;
              //parametros
  constructor(x: number, y: number, step: number, image: p5.Image) {
      this.x = x;
      this.y = y;
      this.step = step;
      this.image = image;
      this.morreu = false;
  }
  //metodos
  draw(): void {
      image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
  }
}

class Board {
  nl: number; //atributos
  nc: number;
  step: number;
  background: p5.Image;

  constructor(nc: number, nl: number, step: number, background: p5.Image) {
      this.nc = nc
      this.nl = nl
      this.step = step
      this.background = background;
  }

  draw(): void {
      image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
      for (let x = 0; x < this.nc; x++) {
          for (let y = 0; y < this.nl; y++) {
              noFill();
              stroke(0);
              strokeWeight(2);
              rect(x * this.step, y * this.step, this.step, this.step);
          }
      }
  }
}



let wolf_img: p5.Image;
let rabbit_img: p5.Image;
let trap_img: p5.Image;
let board_img: p5.Image;

let trap: Entity;
let wolf: Entity;
let rabbit: Entity;

let board: Board;






function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}





function loadImg(path: string): p5.Image {
  return loadImage(
      path,
      () => console.log("Loading " + path + " ok"),
      () => console.log("Loading " + path + " error")
  );
}

function preload() {
  wolf_img = loadImg('../sketch/lobol.png');
  rabbit_img = loadImg('../sketch/coelho.png');
  trap_img = loadImg('../sketch/armadilha.jpg')
  board_img = loadImg('../sketch/grama.jpg');
}

function keyPressed() {
  if (keyCode === LEFT_ARROW ) {
      wolf.x--;
  } else if (keyCode === RIGHT_ARROW ) {
      wolf.x++;
  } else if (keyCode === UP_ARROW  ) {
      wolf.y--;
  } else if (keyCode === DOWN_ARROW ) {
      wolf.y++;
  }

  if (keyCode === "A".charCodeAt(0)) {
      rabbit.x--;
  } else if (keyCode === "D".charCodeAt(0)) {
      rabbit.x++;
  } else if (keyCode === "W".charCodeAt(0)) {
      rabbit.y--;
  } else if (keyCode === "S".charCodeAt(0)) {
      rabbit.y++;
  }
}





function setup() {
  let size = 100;
  
  wolf = new Entity(2, 2, size, wolf_img);
  rabbit = new Entity(1, 1, size, rabbit_img);
  trap = new Entity(getRandomInt(1, 8), getRandomInt(1, 5), size, trap_img);
  board = new Board(8, 5, size, board_img);
 
  createCanvas(board.nc * size, board.nl * size);
}

if (wolf.x === trap.x){
  console.log("colisão");
}


function draw() {
  board.draw();
  trap.draw();
  wolf.draw();
  rabbit.draw(); 
}