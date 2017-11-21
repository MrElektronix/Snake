class KeyBoard {
	constructor(game){
		this.game = game;
		
		this.W;
		this.A;
		this.S;
		this.D;
		
		this.start();
	}
	
	start(){
		this.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	}
	
	moveObject(object){
		
		if (this.W.isDown){
			this.ChangeDirection(object, "up");
		}
		
		if (this.A.isDown){
			this.ChangeDirection(object, "left");
		}
		
		if (this.S.isDown){
			this.ChangeDirection(object, "down");
		}
		
		if (this.D.isDown){
			this.ChangeDirection(object, "right");
		}
		
	}
	
	ChangeDirection(object, direction){
		switch(direction){
			case "up":
				object.body.velocity.x = 0;
				object.body.velocity.y = -snake.speed;
				break;
			case "down":
				object.body.velocity.x = 0;
				object.body.velocity.y = snake.speed;
				break;
			case "left":
				object.body.velocity.x = -snake.speed;
				object.body.velocity.y = 0;
				break;
			case "right":
				object.body.velocity.x = snake.speed;
				object.body.velocity.y = 0;
				break;	
		}
	}
	
}