function Game(scene){

    this.scene = scene;
    this.prolog = new Prolog(this);
    this.gameOver = false;
    this.currPlayer = 'ivory';  //TODO no fim da joagada mudar para cigar
    this.notCurrPlayer = 'cigar';
    this.state = 0;
    this.board = this.scene.graph.board;
    this.bot = false;//TODO implementar depois
    this.difficulty = null;//TODO implementar depois
    this.reply = [];
    
}

Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;

Game.prototype.update = function(){

    //ivorySize,cigarSize,endGame,Success

    switch(this.state){
        case 0:
            //console.log(this.board.getSelectedTile(this.board.selectedTileID[0]));
            if(this.board.selectedTileID[0] != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null){
                if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type == this.currPlayer && this.board.selectedTileID[1] != null){

                    this.prolog.getPrologRequest("makePlay((" + this.currPlayer + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordX
                + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordZ + "," + this.board.getSelectedTile(this.board.selectedTileID[1]).coordX
                + ","+ this.board.getSelectedTile(this.board.selectedTileID[1]).coordZ+"),("+ this.board.getQueen(this.currPlayer).stacks.length + "," + this.board.getQueen(this.notCurrPlayer).stacks.length + "," +
                this.board.convertToPrologBoard()+"))", (data) => {
                    var r = data.target.response;
                    this.reply = r.split(',');
                    console.log(this.reply);

                    console.log(this.board.selectedTileID);
                    console.log(this.reply);
                    if(this.reply[3] == 'false'){
                        this.board.getClickedTile(this.board.selectedTileID[0]);
                        this.board.getClickedTile(this.board.selectedTileID[1]);
                        this.board.selectedTileID = [null, null];
                        console.log(this.board.selectedTileID);                        
                    }
                    else{
                        this.state = 1;
                    }
                });
                }
            }
            break;
        case 1:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            var coordXToMove = tileToMove.coordX;
            var coordZToMove = tileToMove.coordZ;
            var currTile = this.board.getSelectedTile(this.board.selectedTileID[0]);
            var currCoordX = currTile.coordX;
            var currCoordZ = currTile.coordZ;
            var pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            var distToMoveX = (coordXToMove - currCoordX) * 2;
            var distToMoveZ = (coordZToMove - currCoordZ) * 2;
            pieceToMove.moveWithCapture([[0, 0, 0], [distToMoveX, 0, distToMoveZ]]);

            this.state = 2;
            break;
        case 2:
            var pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            if(pieceToMove.animations[pieceToMove.animations.length - 1].finished == true){
                this.state = 3;
            }
            break;
        case 3:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            var currTile = this.board.getSelectedTile(this.board.selectedTileID[0]);
            var pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            tileToMove.piece = pieceToMove;
            currTile.piece = null;

            //TODO corrigir salto

            //TODO corrigir erro do update na xml scene
            break;
            
    }
    //TODO por array de id de peças selecionadas a null no fim da joagada

};
