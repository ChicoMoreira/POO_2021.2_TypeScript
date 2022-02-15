var Bubble = (function () {
    function Bubble(x, y, letter, speed) {
        this.alive = true;
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.speed = speed;
    }
    Bubble.prototype.update = function () {
        this.y += this.speed;
    };
    Bubble.prototype.draw = function () {
        fill(255);
        stroke(255);
        circle(this.x, this.y, 2 * Bubble.radius);
        fill(0);
        stroke(0);
        textSize(15);
        text(this.letter, this.x - 5, this.y + 5);
    };
    Bubble.radius = 20;
    return Bubble;
}());
var Board = (function () {
    function Board() {
        this.timeout = 30;
        this.timer = 0;
        this.hits = 0;
        this.mistakes = 0;
        this.nivel = 1;
        this.bubbles = [new Bubble(100, 100, "a", 1)];
        this.bubbles.push(new Bubble(200, 100, "b", 2));
    }
    Board.prototype.addBubble = function () {
        var x = random(0, width - 2 * Bubble.radius);
        var y = -2 * Bubble.radius;
        var letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"]);
        var speed = random(2, 5);
        var bubble = new Bubble(x, y, letter, speed);
        this.bubbles.push(bubble);
    };
    Board.prototype.checkBubbleTime = function () {
        this.timer -= 1;
        if (this.timer <= 0) {
            this.addBubble();
            this.timer = this.timeout;
        }
    };
    Board.prototype.removeDeadBubbles = function () {
        this.bubbles = this.bubbles.filter(function (b) { return b.alive; });
    };
    Board.prototype.removeByHit = function (code) {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.letter[0].toUpperCase().charCodeAt(0) === code) {
                bubble.alive = false;
                this.hits++;
                break;
            }
        }
    };
    Board.prototype.markedOutsideBubble = function () {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.y + 2 * Bubble.radius >= height) {
                bubble.alive = false;
                this.mistakes++;
            }
        }
    };
    Board.prototype.levelUp = function () {
        if (this.hits > 10) {
            this.timeout = this.timeout - 2;
            this.nivel++;
            this.hits = 0;
        }
    };
    Board.prototype.update = function () {
        this.checkBubbleTime();
        this.markedOutsideBubble();
        this.removeDeadBubbles();
        this.levelUp();
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.update();
        }
    };
    Board.prototype.draw = function () {
        stroke("white");
        fill("white");
        textSize(30);
        text("acertos:" + this.hits, 30, 45);
        text("erros:" + this.mistakes, 30, 90);
        text("nivel:" + this.nivel, 30, 135);
        text("timeout:" + this.timeout, 30, 180);
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.draw();
        }
    };
    return Board;
}());
var Game = (function () {
    function Game() {
        this.board = new Board();
        this.activeScreen = this.gameStart;
    }
    Game.prototype.gameStart = function () {
        background(50, 50, 50);
        fill(255);
        textSize(100);
        text("Type Souls II", 120, 300);
        textSize(50);
        text("preprare to type edition", 220, 355);
        textSize(25);
        text("press DELETE to start", 250, 450);
        if (keyCode === DELETE) {
            this.activeScreen = this.gamePlay;
        }
    };
    Game.prototype.gamePlay = function () {
        background(50, 50, 50);
        this.board.update();
        this.board.draw();
        if (this.board.mistakes > 5)
            this.activeScreen = this.gameOver;
    };
    Game.prototype.gameOver = function () {
        background(0, 0, 0);
        fill(255, 0, 0);
        textSize(100);
        text("você morreu", 130, 300);
    };
    return Game;
}());
var game;
function setup() {
    createCanvas(800, 600);
    frameRate(30);
    game = new Game;
}
function keyPressed() {
    game.board.removeByHit(keyCode);
}
function draw() {
    game.activeScreen();
}
//# sourceMappingURL=build.js.map