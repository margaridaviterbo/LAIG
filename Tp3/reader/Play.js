function Play(scene, currPlayer, notCurrPlayer, board){
    CGFobject.call(this,scene);
    
    this.currPlayer = currPlayer;

    this.board = new Board(scene, board.type);
    this.board.prologBoard = board.convertToPrologBoard();
    this.board.tiles = board.tiles;
    this.selectedTileID = board.selectedTileID;
  
};

 
 
Play.prototype = Object.create(CGFobject.prototype);
Play.prototype.constructor = Play;

