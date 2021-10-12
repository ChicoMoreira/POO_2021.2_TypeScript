var Entity = (function () {
    function Entity(x, y, step, image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.image = image;
        this.morreu = false;
    }
    Entity.prototype.draw = function () {
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    };
    return Entity;
}());
var Board = (function () {
    function Board(nc, nl, step, background) {
        this.nc = nc;
        this.nl = nl;
        this.step = step;
        this.background = background;
    }
    Board.prototype.draw = function () {
        image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
        for (var x = 0; x < this.nc; x++) {
            for (var y = 0; y < this.nl; y++) {
                noFill();
                stroke(0);
                strokeWeight(2);
                rect(x * this.step, y * this.step, this.step, this.step);
            }
        }
    };
    return Board;
}());
var wolf_img;
var rabbit_img;
var trap_img;
var board_img;
var trap;
var wolf;
var rabbit;
var board;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function loadImg(path) {
    return loadImage(path, function () { return console.log("Loading " + path + " ok"); }, function () { return console.log("Loading " + path + " error"); });
}
function preload() {
    wolf_img = loadImg('../sketch/lobol.png');
    rabbit_img = loadImg('../sketch/coelho.png');
    trap_img = loadImg('../sketch/armadilha.jpg');
    board_img = loadImg('../sketch/grama.jpg');
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        wolf.x--;
    }
    else if (keyCode === RIGHT_ARROW) {
        wolf.x++;
    }
    else if (keyCode === UP_ARROW) {
        wolf.y--;
    }
    else if (keyCode === DOWN_ARROW) {
        wolf.y++;
    }
    if (keyCode === "A".charCodeAt(0)) {
        rabbit.x--;
    }
    else if (keyCode === "D".charCodeAt(0)) {
        rabbit.x++;
    }
    else if (keyCode === "W".charCodeAt(0)) {
        rabbit.y--;
    }
    else if (keyCode === "S".charCodeAt(0)) {
        rabbit.y++;
    }
}
function setup() {
    var size = 100;
    wolf = new Entity(2, 2, size, wolf_img);
    rabbit = new Entity(1, 1, size, rabbit_img);
    trap = new Entity(getRandomInt(1, 8), getRandomInt(1, 5), size, trap_img);
    board = new Board(8, 5, size, board_img);
    createCanvas(board.nc * size, board.nl * size);
}
if (wolf.x === trap.x) {
    console.log("colisão");
}
function draw() {
    board.draw();
    trap.draw();
    wolf.draw();
    rabbit.draw();
}
//# sourceMappingURL=build.js.map