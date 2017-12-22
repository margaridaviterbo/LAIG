function Game(scene){

    this.scene = scene;
    this.prolog = new Prolog(this);
    this.gameOver = 'false';
    this.currPlayer = 'ivory';
    this.notCurrPlayer = 'cigar';
    this.state = 0;
    this.board = this.scene.graph.board;
    this.bot = false;//TODO implementar depois
    this.difficulty = null;//TODO implementar depois
    this.reply = [];
    this.scene.gameStart;
    
}

Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;

Game.prototype.update = function(currTime){
    
    switch(this.state){
        case 0:

            if(this.gameOver == 'false'){     //TODO quando conseguir implementar maquina maquina verificar se quando chega ao fim pára
                //console.log(this.board.getSelectedTile(this.board.selectedTileID[0]));
                if(this.board.selectedTileID[0] != null && (this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null || this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece != null)){
                    if(this.board.selectedTileID[1] != null){
                        this.scene.gameStart='true'; 
                        var selectedPlayer;
                        if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                            selectedPlayer = this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type;
                        }
                        else{
                            selectedPlayer = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece.type;
                        }
                        this.state = 1;
                        this.prolog.getPrologRequest("makePlay((" + this.currPlayer + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordX
                            + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordZ + "," + this.board.getSelectedTile(this.board.selectedTileID[1]).coordX
                            + ","+ this.board.getSelectedTile(this.board.selectedTileID[1]).coordZ+"),("+ this.board.getQueen(this.currPlayer).stacks.length + "," + this.board.getQueen(this.notCurrPlayer).stacks.length + "," +
                            this.board.convertToPrologBoard()+"))", (data) => {
                            var r = data.target.response;
                            //ivorySize,cigarSize,endGame,Success
                            this.reply = r.split(',');
                            // console.log(this.reply);
                            //console.log(this.board.selectedTileID);
                            this.gameOver = this.reply[2];

                            if(this.reply[3] == 'false'){
                                if(this.currPlayer != selectedPlayer){
                                    //TODO eventualmente por um pop up no ecra a dizer o que está no console.log
                                    console.log('Cannot play with selected piece, it is ' + this.currPlayer + ' time to play!');
                                }
                                else{
                                    //TODO eventualmente por um pop up no ecra a dizer o que está no console.log
                                    console.log('Invalid move!');
                                }
                                this.board.getClickedTile(this.board.selectedTileID[0]);
                                this.board.getClickedTile(this.board.selectedTileID[1]);
                                this.board.selectedTileID = [null, null];
                                //console.log(this.board.selectedTileID);
                                this.state = 0;                        
                            }
                            else{
                                this.state = 2;
                            }
                        });
                    }
                }
            }
            else{
                //TODO por merda à frente a dizer fim de jogo e com resultados e assim talvez implementar isto num novo state
                //TODO implementar quem ganhou
                console.log("GAME OVER SOMEONE WON");
            }

            
            break;
        case 1:
            break;
        case 2:
            this.state = 3;
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            var coordXToMove = tileToMove.coordX;
            var coordZToMove = tileToMove.coordZ;
            var currTile = this.board.getSelectedTile(this.board.selectedTileID[0]);
            var currCoordX = currTile.coordX;
            var currCoordZ = currTile.coordZ;
            var pieceToMove;
            if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            }
            else{
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
            }
            var distToMoveX = (coordXToMove - currCoordX) * 2;
            var distToMoveZ = (coordZToMove - currCoordZ) * 2;
            pieceToMove.move([[0, 0, 0], [distToMoveX, 0, distToMoveZ]]);
            console.log("Adding move animation to piece ", pieceToMove.type, " at currTime=", currTime);

            if(pieceToMove.size > 1 && tileToMove.piece == null && tileToMove.lonePiece == null){
                currTile.lonePiece = new Piece(this.scene, pieceToMove.color, pieceToMove.type, 1);
                pieceToMove.stacks.pop();
            }
            else if(tileToMove.lonePiece != null && tileToMove.lonePiece.type == this.notCurrPlayer){
                //TODO move got eaten
            }

            break;
        case 3:
            var pieceToMove;
            if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            }
            else{
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
            }
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            console.log(pieceToMove.animations);
            if(pieceToMove.animations[pieceToMove.animations.length - 1].finished == true){
                this.state = 4;
            }
            if(tileToMove.piece != null){
                this.state = 5;
            }
            break;
        case 4:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            var currTile = this.board.getSelectedTile(this.board.selectedTileID[0]);
            var pieceToMove;
            if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            }
            else{
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
            }
            pieceToMove.animations = [];
            if(pieceToMove.size > 1){
                tileToMove.piece = pieceToMove;
                currTile.piece = null;
            }
            else{
                tileToMove.lonePiece = pieceToMove;
                currTile.lonePiece = null;
            }

            this.board.getClickedTile(this.board.selectedTileID[0]);
            this.board.getClickedTile(this.board.selectedTileID[1]);
            this.board.selectedTileID = [null, null];

            if(this.currPlayer == 'ivory'){
                this.currPlayer = 'cigar';
                this.notCurrPlayer = 'ivory';
            }
            else{
                this.currPlayer = 'ivory';
                this.notCurrPlayer = 'cigar';
            }

            this.state = 0;           
            
            break;   
        case 5:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            tileToMove.piece = null;
            this.board.getClickedTile(this.board.selectedTileID[0]);
            this.board.getClickedTile(this.board.selectedTileID[1]);
            this.state = 0;
            break;
    }

};
