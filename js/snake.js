var snake = new Snake();

snake.head = null;
snake.tail = null;

// 蛇默认向右
var DIRECTIONENUM = {
    UP: {
        x: 0,
        y: -1,
    },
    DOWN: {
        x: 0,
        y: 1
    },
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    }
}

snake.init = function (ground) {

    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'pink');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'pink');

    //链表
    this.head = snakeHead;
    snakeHead.next = snakeBody1;
    snakeHead.prev = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.prev = snakeHead;

    snakeBody2.next = null;
    snakeBody2.prev = snakeBody1;

    this.tail = snakeBody2;

    // 记录默认方向
    this.direction = DIRECTIONENUM.RIGHT;

    // 添加蛇
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

}

snake.move = function (ground) {
    var square = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function') {
        this.strategies[square.touch()](this, square, ground);
    }
}

// 触碰策略
snake.strategies = {
    MOVE: function (snake, square, ground, fromEat) {

        // 生成新的身体 并 显示在场景中
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'pink');
        newBody.next = snake.head.next;
        newBody.prev = null;
        newBody.next.prev = newBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 根据预判的square的坐标来生成新的蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red'); // 单例

        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;

        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);

        snake.head = newHead; // 更新蛇头

        // 删除尾巴
        if (!fromEat) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);

            snake.tail = snake.tail.prev;
            snake.tail.next = null;
        }

    },
    EAT: function (snake, square, ground) {
        this.MOVE(snake, square, ground, true);

        oGame.score ++;

        foodControl.create(ground);
    },
    DIE: function () {
        oGame.over();
    }
}