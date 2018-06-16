function SquareFactory () {}

SquareFactory.create = function (type, x, y, color) {
    if(typeof SquareFactory.prototype[type] === 'undefined') {
        throw 'no this type';
    }
    if(SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    var newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare;
}

// 出厂前进行最后的包装，给viewContent添加位置和样式

SquareFactory.prototype.init = function (square, color, strategy) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;

    square.touch = function() {
        return strategy;
    }
}

// 子工厂（流水线）

SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, TOUCHENUM.MOVE);
    return floor;
}
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    food.update(x, y);
    this.init(food, color, TOUCHENUM.EAT);
    return food;
}
SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, TOUCHENUM.DIE);
    return stone;
}
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    snakeHead.update(x, y);
    this.init(snakeHead, color, TOUCHENUM.DIE);
    return snakeHead;
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakeBody, color, TOUCHENUM.DIE);
    return snakeBody;
}