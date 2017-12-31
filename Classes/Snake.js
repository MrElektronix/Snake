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
		this.start();
	}
	
	start(){
		
		this.direction = "";
		this.numberOfBodyParts = 0;
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
		
		this.followHead();
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
}