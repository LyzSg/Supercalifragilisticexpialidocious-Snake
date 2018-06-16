var oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

oGround.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent);

    this.squareTable = [];

    // 一共有 YLEN 行
    for(var i = 0; i < YLEN; i ++) {

        this.squareTable[i] = new Array(XLEN);  // 每行有 XLEN 列

        for(var j = 0; j < XLEN; j ++) {

            var newSquare = null;

            // 第一列 或 最后一列 或 第一行 或 最后一行时，填充墙壁
            if(j == 0 || j == XLEN - 1 || i == 0 || i == YLEN - 1) {
                newSquare = SquareFactory.create('Stone', j, i, 'black');

            } else {
                newSquare = SquareFactory.create('Floor', j, i, 'orange');
            }

            this.squareTable[i][j] = newSquare;
            
            // 添加到广场
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}

// 拆地板
oGround.remove = function (x, y) {
    this.viewContent.removeChild( this.squareTable[y][x].viewContent );
    this.squareTable[y][x] = null;
}

oGround.append = function (square) {
    this.squareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
}