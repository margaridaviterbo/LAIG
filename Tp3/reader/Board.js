function Board(scene,game){

    this.scene = scene;
    this.game = game;
    this.currPlayer = game.currPlayer;
    this.sizeX = 12;
    this.sizeY = 12;
    this.tiles = [];
}
Board.prototype.constructor = Board;


Board.prototype.initBoard = function(){

    //iniciar tiles
    //posição inicial das peças
    //ivory - (6,11); cigar - (5,0)
}

Board.prototype.convertToPrologBoard = function() {
}




