class Block{
	constructor(x, y, color, backColor){
		this.x = x;
		this.y = y;
		this.color = color;
		this.backColor = backColor;
	}
	
	draw(){
		ctx.fillStyle = this.backColor;
		ctx.fillRect(this.x * BOX_SIZE, this.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x * BOX_SIZE + 3, this.y * BOX_SIZE + 3, BOX_SIZE - 6, BOX_SIZE - 6);
	}
}