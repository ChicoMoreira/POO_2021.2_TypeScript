
class Bubble {
  x: number;
  y: number;
  letter: string;
  speed: number;
  
  static radius: number = 20;
  alive: boolean = true;
      
  constructor(x: number, y: number, letter: string, speed: number) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.speed = speed;
    }  

    update(): void {
      this.y += this.speed;
    }

    draw(): void {
      fill(255);
      stroke(255);
      circle(this.x, this.y, 2 * Bubble.radius);
      fill(0);
      stroke(0);
      textSize(15);
      text(this.letter, this.x - 5, this.y + 5);
    }
  }

class Board {
bubbles: Bubble[];
timeout: number = 30;
timer: number = 0;
  
  constructor() {
    this.bubbles = [new Bubble(100, 100, "a", 1)]
    this.bubbles.push(new Bubble(200, 200, "b", 2));
    this.bubbles.push(new Bubble(300, 300, "c", 3));
  }
  addBubble(): void {
    let x = random(0, width - Bubble.radius);
    let y = -2 * Bubble.radius;
    let letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"])
    let speed = random(1, 5);
    let bubble = new Bubble(x, y, letter, speed);
    this.bubbles.push(bubble);
  }
  
  checkBubbleTime(): void {
    this.timer -= 1;
    if (this.timer <= 0){
      this.addBubble();
      this.timer = this.timeout;
    }
   }

   
  
  update(): void {
    this.checkBubbleTime();
    for (let bubble of this.bubbles)
        bubble.update();
  }
 

  draw(): void {
    for (let bubble of this.bubbles)
        bubble.draw(); 
  }

}

class Game {
  board: Board;
  
  activeScreen: () => void;
    constructor() {
      this.board = new Board();
      this.activeScreen = this.gamePlay;
    }


    gamePlay(): void {
      background(50, 50, 50);
      this.board.update();
      this.board.draw();
    }
    
    gameOver(): void {
      background(200, 0, 0);
      fill(0);
      textSize(100);
      text("você morreu", 50, 300);
    }

}



let game: Game;

 

function setup() {
  createCanvas(800,600);
  frameRate(30);
  game = new Game;
}

function draw() {
  game.activeScreen();
}