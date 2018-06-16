// 决定游戏场景的大小和位置

// 横向系数 纵向系数
var XLEN = 30;
var YLEN = 30;

// 格子宽度
var SQUAREWIDTH = 20;

// 游戏场景 广场 坐标
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

// 设置游戏难度
// 蛇的移动速度 
var INTERVAL = 50;

// 定义 基类
function Square(x, y, width, height, dom) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 100;
    this.height = height || 100;
    // dom
    this.viewContent = dom || document.createElement('div');
}
// 公共接口
Square.prototype.touch = function () {console.log('touch')}

// 其他子类

// 地板
var Floor = jsUtil.extends(Square);

// 障碍物
var Stone = jsUtil.extends(Square);

// 食物
var Food = jsUtil.single(Square);
Food.prototype.update = function (x, y) {
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
    this.x = x;
    this.y = y;
}

var FoodControl = jsUtil.single();

var Snake = jsUtil.single();

// 蛇身
var SnakeBody = jsUtil.extends(Square);

// 蛇头
var SnakeHead = jsUtil.single(Square);
SnakeHead.prototype.update = function (x, y) {
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
    this.x = x;
    this.y = y;
}

// 广场
var Ground = jsUtil.extends(Square);

// 游戏控制
var Game = jsUtil.single();

// TOUCH STRATEGY
var TOUCHENUM = {
    MOVE: 'MOVE',
    DIE: 'DIE',
    EAT: 'EAT'
}