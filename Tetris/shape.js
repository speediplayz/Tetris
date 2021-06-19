class Shape{
	
	constructor(id){
		this.boxes = this.generateShape(id);
		this.id = id;
		this.rotationStage = 3;
		this.enabled = true;
	}
	
	generateShape(id){
		let list = [];
		switch(id){
			case 0:
				list.push(new Box(5, 0, "rgb(0,255,255)", "black"));
				list.push(new Box(5, 1, "rgb(0,255,255)", "black"));
				list.push(new Box(5, 2, "rgb(0,255,255)", "black"));
				list.push(new Box(5, 3, "rgb(0,255,255)", "black"));
				this.centerX = 5.5;
				this.centerY = 1.5;
				break;
			case 1:
				list.push(new Box(5, 0, "rgb(0,0,255)", "black"));
				list.push(new Box(5, 1, "rgb(0,0,255)", "black"));
				list.push(new Box(5, 2, "rgb(0,0,255)", "black"));
				list.push(new Box(4, 2, "rgb(0,0,255)", "black"));
				this.centerX = 5;
				this.centerY = 1;
				break;
			case 2:
				list.push(new Box(4, 0, "rgb(255,160,0)", "black"));
				list.push(new Box(5, 0, "rgb(255,160,0)", "black"));
				list.push(new Box(5, 1, "rgb(255,160,0)", "black"));
				list.push(new Box(5, 2, "rgb(255,160,0)", "black"));
				this.centerX =  5;
				this.centerY = 1;
				break;
			case 3:
				list.push(new Box(5, 0, "rgb(255,255,0)", "black"));
				list.push(new Box(5, 1, "rgb(255,255,0)", "black"));
				list.push(new Box(4, 0, "rgb(255,255,0)", "black"));
				list.push(new Box(4, 1, "rgb(255,255,0)", "black"));
				this.centerX = 4.5;
				this.centerY = 0.5;
				break;
			case 4:
				list.push(new Box(4, 0, "rgb(0,255,0)", "black"));
				list.push(new Box(4, 1, "rgb(0,255,0)", "black"));
				list.push(new Box(5, 1, "rgb(0,255,0)", "black"));
				list.push(new Box(5, 2, "rgb(0,255,0)", "black"));
				this.centerX = 5;
				this.centerY = 1;
				break;
			case 5:
				list.push(new Box(5, 0, "rgb(160,0,255)", "black"));
				list.push(new Box(4, 1, "rgb(160,0,255)", "black"));
				list.push(new Box(5, 1, "rgb(160,0,255)", "black"));
				list.push(new Box(5, 2, "rgb(160,0,255)", "black"));
				this.centerX = 5;
				this.centerY = 1;
				break;
			case 6:
				list.push(new Box(5, 0, "rgb(255,0,0)", "black"));
				list.push(new Box(4, 1, "rgb(255,0,0)", "black"));
				list.push(new Box(5, 1, "rgb(255,0,0)", "black"));
				list.push(new Box(4, 2, "rgb(255,0,0)", "black"));
				this.centerX = 5;
				this.centerY = 1;
				break;
		}
		return list;
	}
	
	rotate(dir){
		//-1 for left, 1 for right OR -1 for anticlock, 1 for clock
		this.rotationStage = this.rotationStage + dir > 3 ? 0 : this.rotationStage + dir < 0 ? 3 : this.rotationStage + dir;
		let boxes = this.boxes;
		let cX = this.centerX;
		let cY = this.centerY;
		this.clear();
		switch(this.id){
			case 0:
				if(this.rotationStage == 0) { boxes[0].setPosition(cX - 1.5, cY - 0.5); boxes[1].setPosition(cX - 0.5, cY - 0.5); boxes[2].setPosition(cX + 0.5, cY - 0.5); boxes[3].setPosition(cX + 1.5, cY - 0.5); }
				if(this.rotationStage == 1) { boxes[0].setPosition(cX + 0.5, cY - 1.5); boxes[1].setPosition(cX + 0.5, cY - 0.5); boxes[2].setPosition(cX + 0.5, cY + 0.5); boxes[3].setPosition(cX + 0.5, cY + 1.5); }
				if(this.rotationStage == 2) { boxes[0].setPosition(cX - 1.5, cY + 0.5); boxes[1].setPosition(cX - 0.5, cY + 0.5); boxes[2].setPosition(cX + 0.5, cY + 0.5); boxes[3].setPosition(cX + 1.5, cY + 0.5); }
				if(this.rotationStage == 3) { boxes[0].setPosition(cX - 0.5, cY - 1.5); boxes[1].setPosition(cX - 0.5, cY - 0.5); boxes[2].setPosition(cX - 0.5, cY + 0.5); boxes[3].setPosition(cX - 0.5, cY + 1.5); }
				break;
			case 1:
			case 2:
			case 4:
			case 5:
			case 6:
				for(let box of boxes){
					let locX1 = -1 * (box.x - cX) + cX, locY1 = (box.y - cY) + cY;
					let locX2 = (box.y - cY) + cX, locY2 = -1 * (box.y - cY) + cY;
					if(BOARD[locX1][locY1] != 0) { return; } // MAKE ROTATION BETTER SO IT CAN OFFSET
					if(BOARD[locX2][locY2] != 0) { return; } // A PIECE IF THERE IS SPACE AVAILABLE
				}
				for(let box of boxes){
					let locX = box.x - cX,  locY = box.y - cY;
					if(dir == -1) { box.x = locY + cX; box.y = (-1 * locX) + cY }
					else { box.x = (-1 * locY) + cX; box.y = locX + cY }
				}
				break;
		}
		this.fixPosition();
		this.draw();
	}
	
	checkPosition(){
		// ROTATION CHECK IMPLEMENTATION
	}
	
	fixPosition(){
		let minX = 9, maxX = 0;
		let minY = 19, maxY = 0;
		for(let box of this.boxes){
			minX = box.x < minX ? box.x : minX;
			maxX = box.x > maxX ? box.x : maxX;
			minY = box.x < minY ? box.y : minY;
			maxY = box.y > maxY ? box.y : maxY;
			//console.log(minX + " " + maxX + " " + minY + " " + maxY);
		}
		
		if(minX < 0) { this.centerX -= minX; }
		if(minY < 0) { this.centerY -= minY; }
		if(maxX > 9) { this.centerX -= (maxX - 9); }
		if(maxY > 19) { this.centerY -= (maxY - 19); }
		
		for(let box of this.boxes){
			if(minX < 0) { box.x -= minY; }
			if(minY < 0) { box.y -= minY; }
			if(maxX > 9) { box.x -= (maxX - 9); }
			if(maxY > 19) { box.y -= (maxY - 19); }
		}
	}
	
	update(){
		if(this.enabled) this.move(0, 1);
		this.draw();
	}
	
	clear(){
		for(let box of this.boxes){
			box.clear();
		}
	}
	
	draw(){
		for(let box of this.boxes){
			box.draw();
		}
	}
	
	move(x, y){
		this.clear();
		if(this.enabled){
			if(this.#getNextLowestY(y) > 19) { this.enabled = false; return; }
			if(this.#nextValidX(x) < 0 || this.#nextValidX(x) > 9) { return; }
			for(let box of this.boxes){
				let nextX = box.x + x;
				let nextY = box.y + y;
				if(BOARD[box.x][nextY] != 0) { this.enabled = false; return; }
				if(BOARD[nextX][nextY] != 0) { return; }
			}
			
			for(let box of this.boxes){
				box.x += x;
				box.y += y;
			}
			this.centerX += x;
			this.centerY += y;
		}
		this.draw();
	}
	
	storeOnBoard(){
		if(!this.enabled){
			for(let box of this.boxes){
				BOARD[box.x][box.y] = this.id + 1;
			}
		}
	}
	
	#getNextLowestY(y){
		let lowest = 0;
		for(let box of this.boxes){
			lowest = box.y + y > lowest ? box.y + y : lowest;
		}
		return lowest;
	}
	
	#nextValidX(x){
		for(let box of this.boxes){
			if(box.x + x < 0 || box.x + x > 9) return -1;
		}
		return 1;
	}
}