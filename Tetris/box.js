class Box{
	
	constructor(x, y, color, backColor){
		this.x = x;
		this.y = y;
		this.color = color;
		this.backColor = backColor;
		this.enabled = true;
	}
	
	clear(){
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(this.x * BOX_SIZE, this.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
	}
	
	setPosition(x, y){
		this.x = x;
		this.y = y;
	}
	
	draw(){
		ctx.fillStyle = this.backColor;
		ctx.fillRect(this.x * BOX_SIZE, this.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x * BOX_SIZE + 3, this.y * BOX_SIZE + 3, BOX_SIZE - 6, BOX_SIZE - 6);
	}
	
	update(){
		this.y = this.y + 1 > 19 ? 19 : this.y + 1;
		this.enabled = this.y + 1 > 19 ? false : true;
	}
}