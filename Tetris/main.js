let BOX_SIZE = 32;
let GAME_SPEED = 750;
let BACKGROUND_COLOR = "rgb(64,64,64)";
let LAST_FRAME = Date.now();

let BOARD = new Array(10).fill(0).map(x => new Array(20).fill(0));
let BAG = [];

let keyPressing = false;
let moveDown = false;

document.onkeydown = keyDown;
document.onkeyup = keyUp;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 10 *  BOX_SIZE;
canvas.height = 20 * BOX_SIZE;
canvas.style.backgroundColor = BACKGROUND_COLOR;

generateBag();

let heldShape;
let currentShape = new Shape(BAG[0]);
BAG.shift();
currentShape.draw();

gameLoop();

function gameLoop(){
	if(Date.now() - LAST_FRAME > GAME_SPEED){
		if(!keyPressing){
			currentShape.update();
			LAST_FRAME = Date.now();
		}
		if(keyPressing && Date.now() - LAST_FRAME > GAME_SPEED * 3){
			currentShape.update();
			LAST_FRAME = Date.now();
		}
		currentShape.draw();
	}
	if(Date.now() % 2 == 0 && moveDown) { currentShape.update(); }
	if(!currentShape.enabled) {
		currentShape.storeOnBoard();
		currentShape = new Shape(BAG[0]);
		BAG.shift();
		if(BAG.length == 0) generateBag();
		checkBoard();
	}
	requestAnimationFrame(gameLoop);
}

function generateBag(){
	let nums = [ 0, 1, 2, 3, 4, 5, 6 ];
	
	for(let i = 0; i < 7; i++){
		let randNum = nums[Math.floor(Math.random()*nums.length)];
		let index = nums.indexOf(randNum);
		nums.splice(index, 1);
		BAG.push(randNum);
	}
}

function checkBoard(){
	for(let y = 19; y >= 0; y--){
		let rowValid = true;
		for(let x = 0; x < 10; x++){
			if(BOARD[x][y] == 0){
				
				rowValid = false;
				break;
			}
		}
		
		if(rowValid){
			for(let pY = 19; pY > 0; pY--){
				for(let pX = 0; pX < 10; pX++){
					BOARD[pX][pY] = BOARD[pX][pY-1];
				}
			}
			y++;
			drawBoard();
		}
	}
}

function drawBoard(){
	for(let y = 0; y < 20; y++){
		for(let x = 0; x < 10; x++){
			if(BOARD[x][y] != 0){
				let color = idToColor(BOARD[x][y]);
				let block = new Block(x, y, color, "black");
				block.draw();
			} else {
				ctx.fillStyle = BACKGROUND_COLOR;
				ctx.fillRect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
			}
		}
	}
	currentShape.draw();
}

function idToColor(id){
	switch(id){
		case 1:
			return "rgb(0,255,255)";
		case 2:
			return "rgb(0,0,255)";
		case 3:
			return "rgb(255,160,0)";
		case 4:
			return "rgb(255,255,0)";
		case 5:
			return "rgb(0,255,0)";
		case 6:
			return "rgb(160,0,255)";
		case 7:
			return "rgb(255,0,0)";
	}
}

function keyDown(e){
	keyPressing = true;
	console.log(e.key);
	switch(e.key){
		case "ArrowLeft":
			if(currentShape.enabled) currentShape.move(-1, 0);
			break;
		case "ArrowRight":
			if(currentShape.enabled) currentShape.move(1, 0);
			break;
		case "ArrowDown":
			moveDown = true;
			break;
		case "h":
			if(heldShape  == null){
				currentShape.clear();
				heldShape = currentShape;
				currentShape = new Shape(BAG[0]);
				BAG.shift();
				if(BAG.length == 0) generateBag();
			} else {
				currentShape.clear();
				let temp = heldShape;
				console.log(temp.id);
				heldShape = currentShape;
				currentShape = new Shape(temp.id);
			}
			break;
		case "ArrowUp":
			if(currentShape.enabled) currentShape.rotate(1);
			break;
	}
	currentShape.draw();
}
function keyUp(e){
	keyPressing = false;
	if(e.key == "ArrowDown") moveDown = false;
}