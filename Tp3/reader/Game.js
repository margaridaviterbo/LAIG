function Game(scene){

    this.scene = scene;
    this.prolog = new Prolog(this);
    this.gameOver = false;
    this.currPlayer = 'ivory';  //no fim da joagada mudar para cigar
    this.notCurrPlayer = 'cigar';
    this.state = 0;
    this.board = this.scene.graph.board;
    this.bot = false;//implementar depois
    this.difficulty = null;//implementar
}

Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;

Game.prototype.update = function(){

    switch(this.state){
        case 0:
            console.log(this.board.getSelectedTile(this.board.selectedTileID[0]));
            if(this.board.selectedTileID[0] != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null){
                if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type == this.currPlayer && this.board.selectedTileID[1] != null){
                    var request = new Request(this.currPlayer,this.board.getSelectedTile(this.board.selectedTileID[0]).coordX, 
                                this.board.getSelectedTile(this.board.selectedTileID[0]).coordZ,this.board.getSelectedTile(this.board.selectedTileID[1]).coordX,
                                this.board.getSelectedTile(this.board.selectedTileID[1]).coordZ, this.board.getQueen(this.currPlayer).stacks.length,
                                this.board.getQueen(this.notCurrPlayer).stacks.length, this.board.convertToPrologBoard(), this.bot, this.difficulty);

                    var reply = this.prolog.getPrologRequest(request);
                    
                    console.log(reply);
                }
            }
            
            break;
    }
    //por array de id de peças selecionadas a null no fim da joagada

};
