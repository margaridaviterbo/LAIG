function Game(scene){

    this.scene = scene;
    this.board = new Board(scene,this);
    this.prolog = new Prolog(this);
    this.gameOver = false;
    this.player1 = new Player(game);//Vou ter que mudar o construtor
    this.player2 = new Player(game);
    this.currPlayer = player1;
    this.tiles = [];
   
}