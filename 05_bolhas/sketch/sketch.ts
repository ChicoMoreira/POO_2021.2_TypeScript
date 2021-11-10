
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
hits: number = 0;
mistakes : number = 0;   
nivel : number = 1;
misstype : number = 0;

  constructor() {
    this.bubbles = [new Bubble(100, 100, "a", 1)];
    this.bubbles.push(new Bubble(200, 100, "b", 2));
  }
  addBubble(): void {
    let x = random(0, width - 2 * Bubble.radius);
    let y = -2 * Bubble.radius;
    let letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"])
    let speed = random(2, 5);
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

   removeDeadBubbles() : void {
     this.bubbles = this.bubbles.filter(b => b.alive)
   }

   mistakeByHit() : void {
    if (this.bubbles = this.bubbles.filter(b =>! b.alive)) {
      this.misstype++;
    }

  }

   removeByHit(code : number) : void {
      for (let bubble of this.bubbles)
        if (bubble.letter[0].toUpperCase().charCodeAt(0) === code) {
          bubble.alive = false;
          this.hits++;
          break;
        }
   }

  

   markedOutsideBubble() : void {
     for (let bubble of this.bubbles)
       if (bubble.y + 2 *Bubble.radius >= height) {
         bubble.alive = false;
         this.mistakes++;
       }     
   }

   levelUp() : void {
    if (this.hits > 10) {
      this.timeout = this.timeout - 2;
      this.nivel++;
      this.hits = 0;
    }
  }
  
  update(): void {
    this.checkBubbleTime();
    this.markedOutsideBubble();
    this.removeDeadBubbles();
    this.levelUp();
    //this.mistakeByHit();
    for (let bubble of this.bubbles)
        bubble.update();
  }
 

  draw(): void {
    stroke("white");
    fill("white");
    textSize(30);
    text("acertos:" + this.hits, 30, 45);
    text("erros:" + this.mistakes, 30, 90);
    text("nivel:" + this.nivel, 30, 135);
    text("timeout:" + this.timeout, 30, 180);
    text("misstypes:" + this.misstype, 30, 220);
    for (let bubble of this.bubbles)
        bubble.draw(); 
  }

}

class Game {
  board: Board;
  
  activeScreen: () => void;
    constructor() {
      this.board = new Board();
      this.activeScreen = this.gameStart;
    }

    gameStart() : void {
      background(50, 50, 50);
      fill(255);
      textSize(100);
      text("Type Souls II", 120, 300);
      textSize(50);
      text("preprare to type edition", 220, 355)
      textSize(25);
      text("press DELETE to start", 250, 450);

      if (keyCode === DELETE ) {
        this.activeScreen = this.gamePlay;
      }
    }


    gamePlay(): void {
      background(50, 50, 50);
      this.board.update();
      this.board.draw();
      if (this.board.mistakes > 5) 
          this.activeScreen = this.gameOver;
    }
    
    gameOver(): void {
      background(0, 0, 0);
      fill(255, 0, 0);
      textSize(100);
      
      text("você morreu", 130, 300);
    }

}



let game: Game;

 

function setup() {
  createCanvas(800,600);
  frameRate(30);
  game = new Game;
}

function keyPressed() {
  game.board.removeByHit(keyCode);
}

function draw() {
  game.activeScreen();
}