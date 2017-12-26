function Play(from, to){
    /*this.currPlayer = currPlayer;
    this.notCurrPlayer = notCurrPlayer;

    this.board = new Board(scene, board.type);
    this.board.prologBoard = board.convertToPrologBoard();
    this.board.tiles = new Array(board.tiles.length);
    for (let i = 0; i < board.tiles.length; ++i) {
        this.board.tiles[i] = board.tiles[i].slice();
    }
    this.selectedTileID = board.selectedTileID.slice();
  
    for(var i = 0; i < this.board.tiles.length; i++){
        for(var j = 0; j < this.board.tiles.length; j++){
            this.board.tiles[i][j].isSelected = false;
        }
    }*/
    this.to = to;
    this.from = from;
    this.lonePieceTile = null;
};

Play.prototype.constructor = Play;

