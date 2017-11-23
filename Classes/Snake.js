class Snake {
	constructor(x, y, game){
		this.x = x;
		this.y = y;
		this.game = game;
		
		this.head;
		this.bodyparts;
		
		this.numberOfBodyParts;
		this.spacebetween;
		this.snakePath;
		this.speed;
		this.direction;
		this.deathText;
		this.textStyle;
		this.start();
	}
	
	start(){
		
		this.direction = "";
		this.textStyle = { font: "32px Arial", fill: "#FF0000"};
		this.numberOfBodyParts = 0;
		this.bodyparts = [];
		this.snakePath = [];
		this.spacebetween = 5;
		this.speed = 300;
		this.deathText = this.game.add.text(-300, 0, "You Died", this.textStyle);
		this.head = this.game.add.sprite(this.x, this.y, 'block');
		this.head.scale.setTo(0.06, 0.06);
		
		this.game.physics.arcade.enable(this.head);
	}
	
	update(){
		this.snakePath.unshift({
			x: this.head.x,
			y: this.head.y
		});
		
		this.followHead();
		
		for (var i = 2; i < this.numberOfBodyParts; i++){
			this.selfCollision(this.bodyparts[i]);
		}
		
		this.wallCollision();
	}
	
	followHead(){
		for (var i = 0; i < this.numberOfBodyParts; i++){
			var position = this.snakePath[i];
			if (position == undefined) break;
			this.bodyparts[i].x = (this.snakePath[i * this.spacebetween + this.spacebetween]).x;
	
			this.bodyparts[i].y = (this.snakePath[i * this.spacebetween + this.spacebetween]).y;
		}
	}
	
	spawnBodyPart(){
		this.numberOfBodyParts++;
		this.bodyparts.push(this.game.add.sprite(this.game.width, this.game.height, 'block'));
		
		for (var i = 0; i < this.numberOfBodyParts; i++){
			this.bodyparts[i].scale.setTo(0.06, 0.06);
		}
	}
	
	selfCollision(object) {
		if (this.head.x < object.x + object.width &&
		   this.head.x + this.head.width > object.x &&
		   this.head.y < object.y + object.height &&
		   this.head.y + this.head.height > object.y){
			this.head.body.velocity.x = 0;
			this.head.body.velocity.y = 0;
			
			this.deathText.x = 225;
			this.deathText.y = 225;
		}
	}
	
	wallCollision(){
		if (this.head.x + this.head.width >= this.game.width || this.head.x < 0 || this.head.y + this.head.height >= this.game.height || this.head.y < 0){
			this.head.body.velocity.x = 0;
			this.head.body.velocity.y = 0;
			
			this.deathText.x = 225;
			this.deathText.y = 225;
		}
	}
}