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
        this.bubbles = [new Bubble(100, 100, "a", 1)];
        this.bubbles.push(new Bubble(200, 200, "b", 2));
        this.bubbles.push(new Bubble(300, 300, "c", 3));
    }
    Board.prototype.addBubble = function () {
        var x = random(0, width - Bubble.radius);
        var y = -2 * Bubble.radius;
        var letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"]);
        var speed = random(1, 5);
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
    Board.prototype.update = function () {
        this.checkBubbleTime();
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.update();
        }
    };
    Board.prototype.draw = function () {
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
        this.activeScreen = this.gamePlay;
    }
    Game.prototype.gamePlay = function () {
        background(50, 50, 50);
        this.board.update();
        this.board.draw();
    };
    Game.prototype.gameOver = function () {
        background(200, 0, 0);
        fill(0);
        textSize(100);
        text("você morreu", 50, 300);
    };
    return Game;
}());
var game;
function setup() {
    createCanvas(800, 600);
    frameRate(30);
    game = new Game;
}
function draw() {
    game.activeScreen();
}
//# sourceMappingURL=build.js.map