let game = new Phaser.Game(600, 500, Phaser.AUTO, 'canvas', {preload: preload, create: create, update: update});


function preload(){
	game.load.image('block', 'images/block.png');
	game.load.image('apple', 'images/apple.png');
}


var apple;
var snake;
var keyboard;

var scoreText;
var deathText;
var collision;
var textstyle;

var score;

function create(){
	var textstyle = { font: "32px Arial", fill: "#ff0044"};
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.stage.backgroundColor = "#ffffff";
	
	snake = new Snake(400, 400, game);
	keyboard = new KeyBoard(game);
	
	score = 0;
	scoreText = game.add.text(10, 0, "Score: " + score, textstyle);
	deathText = game.add.text(-300, 0, "You Died", textstyle);
	collision = new Collision(game);
	
	SpawnApple();
	
	
}

function update(){
	keyboard.moveObject(snake.head);
	snake.update();
	
	for (var i = 2; i < snake.numberOfBodyParts; i++){
		if (collision.blockCollision(snake.head, snake.bodyparts[i])){
			EndGame();
		}
	}
	
	if (collision.wallCollision(snake.head)){
			EndGame();
	}
	
	game.physics.arcade.overlap(snake.head, apple, SpawnApple, null, this);
}

function SpawnApple(){
	if (apple != undefined){
		score++;
		scoreText.setText("Score: " + score);
		apple.destroy();
		snake.spawnBodyPart();
	}
	
	var randomX = game.rnd.integerInRange(10, game.width - 40);
	var randomY = game.rnd.integerInRange(10, game.height - 40);
	
	apple = game.add.sprite(randomX, randomY, 'apple');
	apple.scale.setTo(0.06, 0.06);
	
	game.physics.enable(apple, Phaser.Physics.ARCADE);
	apple.body.immovable = true;
}

function EndGame(){
	snake.head.body.velocity.x = 0;
	snake.head.body.velocity.y = 0;
			
	deathText.x = 225;
	deathText.y = 225;
}