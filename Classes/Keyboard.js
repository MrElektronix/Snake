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
	
}