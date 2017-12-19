function Game(scene){

    this.scene = scene;
    this.board = new Board(scene,this);
    this.prolog = new Prolog(this);
    this.gameOver = false;
    this.currPlayer = 1;
}
Game.prototype.constructor = Game;