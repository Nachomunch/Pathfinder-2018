newt = null;
tile = [];
tileDimensions = 30;
map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 3, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//0 - air
//1 - wall
//2 - newt
//3 - cricket

function generateLevel(){
    for (var h = 0 ; h < map.length ; h++){
        for (var w = 0 ; w < map[h].length ; w++){
            //air
            if (map[h][w] == 0){
                tile[tile.length] = new createjs.Shape();
                tile[tile.length - 1].graphics.beginFill("#FFE4D2");
                tile[tile.length - 1].graphics.setStrokeStyle(3);
                tile[tile.length - 1].graphics.beginStroke("#EED4C2");
                tile[tile.length - 1].graphics.drawRect(0,0,tileDimensions,tileDimensions);
                stage.addChildAt(tile[tile.length - 1], 0);
            }
            //wall
            if (map[h][w] == 1){
                tile[tile.length] = new createjs.Shape();
                tile[tile.length - 1].graphics.beginFill("#DDC5B6");
                tile[tile.length - 1].graphics.setStrokeStyle(3);
                tile[tile.length - 1].graphics.beginStroke("#A19186");
                tile[tile.length - 1].graphics.drawRect(0,0,tileDimensions,tileDimensions);
                stage.addChild(tile[tile.length - 1]);
            }
            //newt
            if (map[h][w] == 2){
                tile[tile.length] = new createjs.Shape();
                tile[tile.length - 1].graphics.beginFill("#FFE4D2");
                tile[tile.length - 1].graphics.setStrokeStyle(3);
                tile[tile.length - 1].graphics.beginStroke("#EED4C2");
                tile[tile.length - 1].graphics.drawRect(0,0,tileDimensions,tileDimensions);
                stage.addChildAt(tile[tile.length - 1], 0);

                newt = new createjs.Shape();
                newt.graphics.beginFill("#FFB787");
                newt.graphics.setStrokeStyle(3);
                newt.graphics.beginStroke("#CB926C");
                newt.graphics.drawRect(tileDimensions / 4,tileDimensions / 4,tileDimensions / 2,tileDimensions / 2);
                stage.addChild(newt);

                newt.x = tileDimensions * w;
                newt.y = tileDimensions * h;
            }
            //cricket
            if (map[h][w] == 3){
                tile[tile.length] = new createjs.Shape();
                tile[tile.length - 1].graphics.beginFill("#FFE4D2");
                tile[tile.length - 1].graphics.setStrokeStyle(3);
                tile[tile.length - 1].graphics.beginStroke("#EED4C2");
                tile[tile.length - 1].graphics.drawRect(0,0,tileDimensions,tileDimensions);
                stage.addChildAt(tile[tile.length - 1], 0);

                cricket = new createjs.Shape();
                cricket.graphics.beginFill("#AFFF80");
                cricket.graphics.setStrokeStyle(3);
                cricket.graphics.beginStroke("#99DE71");
                cricket.graphics.drawRect(tileDimensions / 4,tileDimensions / 4,tileDimensions / 2,tileDimensions / 2);
                var index = stage.getChildIndex(newt);
                if (index != -1) {
                    stage.addChildAt(cricket, index - 1);
                } else {
                    stage.addChild(cricket);
                }

                cricket.x = tileDimensions * w;
                cricket.y = tileDimensions * h;
            }

            tile[tile.length - 1].x = tileDimensions * w;
            tile[tile.length - 1].y = tileDimensions * h;
        }
    }
}
