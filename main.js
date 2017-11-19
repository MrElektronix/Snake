let game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', {preload: preload, create: create, update: update});


function preload(){
	game.load.image('block', 'images/block.png');
	game.load.image('background', 'images/greengrass.jpg');
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
	
	var background = game.add.sprite(0, 0, 'background');
	
	head = game.add.sprite(500, 500, 'block');
	head.scale.setTo(0.1, 0.1);
	
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
	for (var i = 0; i < bodyparts.length; i++){
		var position = snakePath[i];
		if (position == undefined) break;
		
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
	
	snakePath.unshift({
		x: object.x,
		y: object.y
	});
	
	
	FollowSnake();
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
	
	for (var i = 0; i < numberOfBodyParts; i++){
		bodyparts[i] = game.add.sprite(500, 500, 'block');
		bodyparts[i].scale.setTo(0.1, 0.1);
	}
}




