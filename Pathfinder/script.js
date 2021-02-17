/*
    Pathfinder Demo
*/
var canvas;
var stage;
var loader;

openList = [];
closedList = [];
path = [];

pathReady = false;
reverseFlag = false;
pause = false;

var manifest = [
	//{id: "", src: ""}
];

/*
	Load assets
*/
function load() {

	if (manifest.length > 0) {
		loader = new createjs.LoadQueue();
		loader.installPlugin(createjs.Sound);
		loader.on("complete", init);
		loader.loadManifest(manifest);
	} else {
		init();
	}

}

/*
    Initialize game
*/
function init() {

	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	canvas.width = 800;
	canvas.height = 600;

    generateLevel();
    buildNode1();

    // initialize ticker
    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener("tick", tick);

}

/*
    Game loop
*/
function tick(event) {
    if (pause) {return;}
    if (newt.x == cricket.x && newt.y == cricket.y){
        console.log("Goal reached!");
        pause = true;
        return;
    }
    if (pathReady) { runPath(); }
    pathFind();

    // render stage
    stage.update(event);

}

class Node {
    constructor(x,y,g,h,previous){
        this.x = x;
        this.y = y;
        this.g = g;
        this.h = h;
        this.f = g + h;
        this.previous = previous;
    }
}

function pathFind(){
    if (pathReady == true){ return; }
    var finder = openList[0];
    for (var i = 0 ; i < openList.length ; i++){
        if (finder.f > openList[i].f){
            finder = openList[i];
        }
    }

    //end condition
    if (finder.x == cricket.x && finder.y == cricket.y){
        moveToObjective(finder);
        return;
    }

    insertClosedList(finder);
    retrieveMoves(finder);
}

function buildNode1(){
    //the previous for this one might be broken
    var node = new Node(newt.x,newt.y,0,retrieveH(newt.x,newt.y,cricket.x,cricket.y),{g: -1})
    insertOpenList(node.x,node.y,node);
}

function insertOpenList(x,y,previous){
    var node = new Node(x,y,previous.g + 1,retrieveH(x,y,cricket.x,cricket.y),previous)
    openList.push(node);
    for (var i = 0; i < tile.length; i++){
        if (tile[i].x == openList[openList.length - 1].x && tile[i].y == openList[openList.length - 1].y){
            tile[i].graphics.clear();
            tile[i].graphics.beginFill("#6ed233");
            tile[i].graphics.drawRect(0,0,tileDimensions,tileDimensions);
        }
    }
}

function insertClosedList(node){
    for (var i = 0 ; i < openList.length ; i++){
        if (node.x == openList[i].x && node.y == openList[i].y){
            openList.splice(i,1);
        }
    }
    closedList.push(node);

    for (var i = 0; i < tile.length; i++){
        if (tile[i].x == closedList[closedList.length - 1].x && tile[i].y == closedList[closedList.length - 1].y){
            tile[i].graphics.clear();
            tile[i].graphics.beginFill("#D23333");
            tile[i].graphics.drawRect(0,0,tileDimensions,tileDimensions);
        }
    }
}

function checkData(x,y){
    for (var i = 0 ; i < openList.length; i++){
        if (x == openList[i].x && y == openList[i].y){
            return true;
        }
    }
    for (var i = 0 ; i < closedList.length; i++){
        if (x == closedList[i].x && y == closedList[i].y){
            return true;
        }
    }
    return false;
}

function moveToObjective(node){
    for (var i = 0 ; i < openList.length ; i++){
        if (openList[i].x == cricket.x && openList[i].y == cricket.y){
            var previousTracking = node;
            while (previousTracking.previous.g != 0){
                path.push(previousTracking);
                previousTracking = previousTracking.previous;
            }
            pathReady = true;
        }
    }
}

function runPath(){
    if (!reverseFlag){
        path.reverse();
        reverseFlag = true;
    }
    newt.x = path[0].x;
    newt.y = path[0].y;
    path.splice(0,1);
}

function retrieveMoves(node){
    //up
    if (retrieveMapID(node.x,node.y - tileDimensions) != 1 && checkData(node.x,node.y - tileDimensions) != true){
        insertOpenList(node.x,node.y - tileDimensions,node);
    }
    //down
    if (retrieveMapID(node.x,node.y + tileDimensions) != 1 && checkData(node.x,node.y + tileDimensions) != true){
        insertOpenList(node.x,node.y + tileDimensions,node);
    }
    //left
    if (retrieveMapID(node.x - tileDimensions,node.y) != 1 && checkData(node.x - tileDimensions,node.y) != true){
        insertOpenList(node.x - tileDimensions,node.y,node);
    }
    //right
    if (retrieveMapID(node.x + tileDimensions,node.y) != 1 && checkData(node.x + tileDimensions,node.y) != true){
        insertOpenList(node.x + tileDimensions,node.y,node);
    }
}

function retrieveMapID(x,y){
    return map[y / tileDimensions][x / tileDimensions];
}

function retrieveH(x1,y1,x2,y2){
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) / tileDimensions;
}

/*
    TODO
*/

// Add comments, please.
