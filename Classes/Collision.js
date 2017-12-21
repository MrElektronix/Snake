class Collision {
	constructor(canvas){
		this.canvas = canvas;
	}
	
	blockCollision(Object1, Object2){
		if (Object1.x < Object2.x + Object2.width &&
		   Object1.x + Object1.width > Object2.x &&
		   Object1.y < Object2.y + Object2.height &&
		   Object1.y + Object1.height > Object2.y){
			
			return true;
		}
	}
	
	wallCollision(object){
		if (object.x + object.width >= this.canvas.width || object.x < 0 || object.y + object.height >= this.canvas.height || object.y < 0){
			return true;
		}
	}
}