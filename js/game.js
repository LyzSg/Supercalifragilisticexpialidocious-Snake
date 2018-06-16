var oGame = new Game();

oGame.timer = null;
oGame.score = 0;
oGame.floorArr = [];

oGame.init = function () {
    oGround.init();
    snake.init(oGround);

    foodControl.init(oGround);

    var tChangeDirection = jsUtil.throttle(changeDirection, INTERVAL);

    document.onkeydown = function (e) {
        tChangeDirection(e)
    }

    function changeDirection(e) {
        if (e.key == 'ArrowUp' && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.UP;
        } else if (e.key == 'ArrowDown' && snake.direction != DIRECTIONENUM.UP) {
            snake.direction = DIRECTIONENUM.DOWN;
        } else if (e.key == 'ArrowLeft' && snake.direction != DIRECTIONENUM.RIGHT) {
            snake.direction = DIRECTIONENUM.LEFT;
        } else if (e.key == 'ArrowRight' && snake.direction != DIRECTIONENUM.LEFT) {
            snake.direction = DIRECTIONENUM.RIGHT;
        }
    }

}

oGame.start = function () {
    this.timer = setInterval(function () {
        snake.move(oGround);
    }, INTERVAL)
}

oGame.over = function () {
    clearInterval(this.timer);
    alert('game over, 你的分数是' + this.score);
}


oGame.init();
oGame.start();
