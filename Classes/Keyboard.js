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
		this.Up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.Left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.Down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.Right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	}
	
	moveObject(object) {
		if (this.Up.isDown && snake.direction != "down"){
			this.ChangeDirection(snake.head, "up");
			snake.direction = "up";
		}
		
		if (this.Left.isDown && snake.direction != "right"){
			this.ChangeDirection(object, "left");
			snake.direction = "left";
		}
		
		if (this.Down.isDown && snake.direction != "up"){
			this.ChangeDirection(object, "down");
			snake.direction = "down";
		}
		
		if (this.Right.isDown && snake.direction != "left"){
			this.ChangeDirection(object, "right");
			snake.direction = "right";
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