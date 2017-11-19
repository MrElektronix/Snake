let game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', {preload: preload, create: create, update: update});


function preload(){
	game.load.image('block', 'images/block.png');
	game.load.image('background', 'images/greengrass.jpg');
}

var head;
var headXSpeed;
var headYSpeed;

var speed;

var W;
var A;
var S;
var D;


function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	var background = game.add.sprite(0, 0, 'background');
	
	head = game.add.sprite(500, 500, 'block');
	head.scale.setTo(0.1, 0.1);
	headXSpeed = 0;
	headYSpeed = 0;
	
	speed = 5;
	
	W = game.input.keyboard.addKey(Phaser.Keyboard.W);
	A = game.input.keyboard.addKey(Phaser.Keyboard.A);
	S = game.input.keyboard.addKey(Phaser.Keyboard.S);
	D = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function update(){
	head.x += headXSpeed;
	head.y += headYSpeed;
	
	Keyboard(head);
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



function ChangeDirection(object, direction){
	switch(direction){
		case "up":
			headYSpeed = -speed;
			headXSpeed = 0;
			break;
		case "down":
			headYSpeed = speed;
			headXSpeed = 0;
			break;
		case "left":
			headYSpeed = 0;
			headXSpeed = -speed;
			break;
		case "right":
			headYSpeed = 0;
			headXSpeed = speed;
			break;	
	}
	
	snakePath.unshift(
		{
			x: object.x,
			y: object.y
		}
	);
}


