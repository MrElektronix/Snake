let game = new Phaser.Game(600, 500, Phaser.AUTO, 'canvas', {preload: preload, create: create, update: update});


function preload(){
	game.load.image('block', 'images/block.png');
	game.load.image('apple', 'images/apple.png')
}

var head;
var bodyparts;
var apple;

var numberOfBodyParts;
var snakePath;
var speed;
var spacebetween;

var W;
var A;
var S;
var D;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.stage.backgroundColor = "#ffffff";
	head = game.add.sprite(game.width - 100, game.height - 100, 'block');
	head.scale.setTo(0.06, 0.06);
	
	game.physics.arcade.enable(head);
	
	numberOfBodyParts = 0;
	bodyparts = [];
	snakePath = [];
	spacebetween = 5;
	speed = 300;
	
	W = game.input.keyboard.addKey(Phaser.Keyboard.W);
	A = game.input.keyboard.addKey(Phaser.Keyboard.A);
	S = game.input.keyboard.addKey(Phaser.Keyboard.S);
	D = game.input.keyboard.addKey(Phaser.Keyboard.D);
	
	SpawnApple();
	
}

function update(){
	Keyboard(head);
	
	snakePath.unshift({
		x: head.x,
		y: head.y
	});	
	FollowSnake();
	game.physics.arcade.overlap(head, apple, SpawnApple, null, this);
}

function Keyboard(object){
	if (W.isDown){
		ChangeDirection(object, "up");
	}
	
	if (A.isDown) {
		ChangeDirection(object, "left");
	}
	
	if (S.isDown) {
		ChangeDirection(object, "down");
	}
	
	if (D.isDown){
		ChangeDirection(object, "right");
	}	
}

function FollowSnake(){
	for (var i = 1; i < numberOfBodyParts; i++){
		var position = snakePath[i];
		
		bodyparts[i].x = (snakePath[i * spacebetween]).x;
		bodyparts[i].y = (snakePath[i * spacebetween]).y;
	}
}


function ChangeDirection(object, direction){
	switch(direction){
		case "up":
			object.body.velocity.x = 0;
			object.body.velocity.y = -speed;
			break;
		case "down":
			object.body.velocity.x = 0;
			object.body.velocity.y = speed;
			break;
		case "left":
			object.body.velocity.x = -speed;
			object.body.velocity.y = 0;
			break;
		case "right":
			object.body.velocity.x = speed;
			object.body.velocity.y = 0;
			break;	
	}
}

function SpawnApple(){
	if (apple != undefined){
		apple.destroy();
		SpawnBodyPart();
	}
	
	
	var randomX = game.rnd.integerInRange(50, game.width - 50);
	var randomY = game.rnd.integerInRange(50, game.height - 50);
	
	apple = game.add.sprite(randomX, randomY, 'apple');
	apple.scale.setTo(0.06, 0.06);
	
	game.physics.enable(apple, Phaser.Physics.ARCADE);
	
	apple.body.immovable = true;
}

function SpawnBodyPart(){
	numberOfBodyParts++;
	bodyparts.push(game.add.sprite(game.width - 100, game.height - 100, 'block'));
	
	
	
	for (var i = 0; i < numberOfBodyParts; i++){
		bodyparts[i].scale.setTo(0.06, 0.06);
	}
}