class Snake extends EventEmitter {
	constructor(x, y, game, keyboard, collision){
		super();
		this.x = x;
		this.y = y;
		this.game = game;
		this.keyboard = keyboard;
		this.collision = collision;
		this.start();
	}
	
	start(){
		this.direction = "";
		this.bodyparts = [];
		this.snakePath = [];
		this.spacebetween = 5;
		this.speed = 300;
		this.head = this.game.add.sprite(this.x, this.y, 'block');
		this.head.scale.setTo(0.06, 0.06);
		
		this.game.physics.arcade.enable(this.head);
	}
	
	update(){
		this.snakePath.unshift({
			x: this.head.x,
			y: this.head.y
		});
		
		this.CheckCollision();
		this.Move();
		this.followHead();
	}

	Move(){
		if (this.keyboard.Up.isDown && this.direction != "down"){
			this.ChangeDirection(this.head, "up");
			this.direction = "up";
		}
		
		if (this.keyboard.Left.isDown && this.direction != "right"){
			this.ChangeDirection(this.head, "left");
			this.direction = "left";
		}
		
		if (this.keyboard.Down.isDown && this.direction != "up"){
			this.ChangeDirection(this.head, "down");
			this.direction = "down";
		}
		
		if (this.keyboard.Right.isDown && this.direction != "left"){
			this.ChangeDirection(this.head, "right");
			this.direction = "right";
		}
	}

	ChangeDirection(object, direction){
		let SetVelocity = (x, y)=>{
			object.body.velocity.x = x;
			object.body.velocity.y = y;
		}

		switch(direction){
			case "up":
				SetVelocity(0, -this.speed);
				break;
			case "down":
				SetVelocity(0, this.speed);
				break;
			case "left":
			SetVelocity(-this.speed, 0);
				break;
			case "right":
				SetVelocity(this.speed, 0);
				break;	
		}
	}

	CheckCollision(){
		for (var i = 2; i < this.bodyparts.length; i++) {
			if (this.collision.blockCollision(this.head, this.bodyparts[i])){
				this.emit("dead");
			}
		}

		if (this.collision.wallCollision(this.head)){
			this.emit("dead");
		}
	}

	followHead(){
		for (var i = 0; i < this.bodyparts.length; i++){
			var position = this.snakePath[i];
			if (position == undefined) break;
			this.bodyparts[i].x = (this.snakePath[i * this.spacebetween + this.spacebetween]).x;
			this.bodyparts[i].y = (this.snakePath[i * this.spacebetween + this.spacebetween]).y;
		}
	}
	
	spawnBodyPart(){
		this.bodyparts.push(this.game.add.sprite(this.game.width, this.game.height, 'block'));
		
		for (var i = 0; i < this.bodyparts.length; i++){
			this.bodyparts[i].scale.setTo(0.06, 0.06);
		}
	}
}