var foodControl = new FoodControl();

foodControl.init = function (ground) {
    foodControl.create(ground);
}

foodControl.create = function (ground) {
    oGame.floorArr.length = 0;
    for(var i = 0 ; i < YLEN; i ++) {
        for(var j = 0; j < XLEN; j ++) {
            if(ground.squareTable[i][j].touch() == 'MOVE') {
                oGame.floorArr.push({y: i, x: j});
            }
        }
    }
    var ranNum = parseInt(Math.random() * oGame.floorArr.length),
        x = oGame.floorArr[ranNum].x,
        y = oGame.floorArr[ranNum].y;

    var food = SquareFactory.create('Food', x, y, 'green');
    ground.remove(food.x, food.y);
    ground.append(food);
}