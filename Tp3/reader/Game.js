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
    
}

Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;

Game.prototype.update = function(){
    
    switch(this.state){
        case 0:
        console.log("AHOY1");
        console.log(this.state);
            if(this.gameOver == 'false'){     //TODO quando conseguir implementar o jogo todo verificar se quando chega ao fim pára
                console.log(this.board.getSelectedTile(this.board.selectedTileID[0]));
                if(this.board.selectedTileID[0] != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null){
                    if(/*this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type == this.currPlayer &&*/ this.board.selectedTileID[1] != null){

                        var selectedPlayer = this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type;

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
                        }
                        else{
                            this.state = 1;
                        }
                    });
                    }
                }
            }
            else{
                //TODO por merda à frente a dizer fim de jogo e com resultados e assim talvez implementar isto num novo state
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
            pieceToMove.animations.pop();
            tileToMove.piece = pieceToMove;
            currTile.piece = null;

            //TODO às vezes a peça nao para no sitio certo? ultrapassa tipo dar animation a peça no sitio novo mas eu apago animatio antes...

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
            console.log(this.state);            
            
            break;
        default:
            console.log("enpanquei aqui?");            
    }
    console.log("AHOY2");

};
