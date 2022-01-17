var x = 20;
console.log(x);
var y = 35;
console.log(y);
var adicionar = function (a, b) {
    return a + b;
};
console.log(adicionar(20, 20));
var adicionar3 = function (a, b) { return (a + b); };
console.log(adicionar3(10, 20));
var NL = 10;
var NC = 10;
var LADO = 70;
var Cell = (function () {
    function Cell(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    return Cell;
}());
var Snake = (function () {
    function Snake() {
        this.body = new Cell(0, 0, color("blue"));
        this.vx = 1;
        this.vy = 0;
    }
    return Snake;
}());
var Food = (function () {
    function Food() {
        this.body = new Cell(4, 1, color("green"));
        this.vx = 0;
        this.vy = 0;
    }
    return Food;
}());
var score = 0;
var snake;
var cell_color;
var timer = 0;
var food;
function setup() {
    createCanvas(NC * LADO, NL * LADO);
    frameRate(30);
    cell_color = color(20);
    snake = new Snake();
    food = new Food();
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        snake.vx = -1;
        snake.vy = 0;
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.vx = 1;
        snake.vy = 0;
    }
    else if (keyCode === UP_ARROW) {
        snake.vx = 0;
        snake.vy = -1;
    }
    else if (keyCode === DOWN_ARROW) {
        snake.vx = 0;
        snake.vy = 1;
    }
}
function draw_cell(cell) {
    noStroke();
    fill(cell.color);
    square(cell.x * LADO + 0.3, cell.y * LADO + 0.3, LADO - 0.3);
}
function draw_mat() {
    for (var c = 0; c < NC; c++)
        for (var l = 0; l < NL; l++)
            draw_cell(new Cell(c, l, cell_color));
}
function snake_loop() {
    if (snake.body.x == NC)
        snake.body.x = 0;
    if (snake.body.y == NL)
        snake.body.y = 0;
    if (snake.body.x == -1)
        snake.body.x = NC - 1;
    if (snake.body.y == -1)
        snake.body.y = NL - 1;
}
function snake_walk() {
    if (frameCount - timer > 5) {
        timer = frameCount;
        snake.body.x += snake.vx;
        snake.body.y += snake.vy;
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function crescer(food) {
}
function colision() {
    if (snake.body.x === food.body.x && snake.body.y === food.body.y) {
        food = new Food();
        food.body.x = getRandomInt(0, 9);
        food.body.y = getRandomInt(0, 9);
        score++;
    }
}
function ponto() {
    textSize(30);
    fill(255, 255, 255);
    text("Pontos: " + score, 555, 50);
}
function draw() {
    snake_walk();
    snake_loop();
    background(220);
    draw_mat();
    draw_cell(snake.body);
    draw_cell(food.body);
    colision();
    ponto();
}
//# sourceMappingURL=build.js.map