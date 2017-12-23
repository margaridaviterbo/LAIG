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
    this.undo = false;
    this.plays = [];
}

Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;

Game.prototype.update = function(currTime){
    
    switch(this.state){
        case 0:
            if(this.undo == true){
                //TODO eventualmente implmentar movimentos backwards


                //TODO [estou aqui] nao está a funcionar jogo bloqueia ao fazer isto para voltar para traz, analisar o problema

                console.log(this.plays);
                this.currPlayer = this.plays[this.plays.length - 1].currPlayer;
                this.notCurrPlayer = this.plays[this.plays.length - 1].notCurrPlayer;
                this.board = this.plays[this.plays.length - 1].board;
                this.plays.pop();
                this.undo = false;
            }
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

                        this.plays.push(new Play(this.scene, this.currPlayer, this.notCurrPlayer, this.board));
                        console.log(this.plays);

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
            //console.log("Adding move animation to piece ", pieceToMove.type, " at currTime=", currTime);

            if(pieceToMove.size > 1 && tileToMove.piece == null && tileToMove.lonePiece == null){
                currTile.lonePiece = new Piece(this.scene, pieceToMove.color, pieceToMove.type, 1);
                pieceToMove.stacks.pop();
            }
            else if(tileToMove.lonePiece != null && tileToMove.lonePiece.type == this.notCurrPlayer){
                var freeTile;
                var coordX;
                var coordY;
                var distToMoveX;
                var distToMoveZ;
                if(this.scene.graph.auxBoard1.type != tileToMove.lonePiece.type){
                    freeTile = this.scene.graph.auxBoard1.getFirstTileFree();
                    if(freeTile.coordX == 0){
                        coordX = -2;
                        coordY = 3;
                    }
                    else{
                        coordX = -2;
                        coordY = 2;
                    }
                    distToMoveX = (coordX - tileToMove.coordX) * 2 + 1;
                    distToMoveZ = (freeTile.coordZ - tileToMove.coordZ) * 2;
                }
                else{
                    freeTile = this.scene.graph.auxBoard2.getFirstTileFree();
                    if(freeTile.coordX == 0){
                        coordX = 11 + 1;
                        coordY = 2;
                    }
                    else{
                        coordX = 11 + 1;
                        coordY = 2;
                    }
                    distToMoveX = (coordX - tileToMove.coordX) * 2 - 1;
                    distToMoveZ = (freeTile.coordZ - tileToMove.coordZ) * 2;
                }
                tileToMove.lonePiece.moveGotEaten([[0, 0, 0], [-3, 10, 0], [-6, 10, 0], [distToMoveX, coordY, distToMoveZ]]);
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
            
            if(pieceToMove.animations[pieceToMove.animations.length - 1].finished == true){
                if(tileToMove.lonePiece != null && tileToMove.lonePiece.animations[tileToMove.lonePiece.animations.length - 1].finished == true){
                    this.state = 5;
                }
                else if(tileToMove.lonePiece == null){
                    this.state = 5;
                }
                
            }
            if(tileToMove.piece != null){
                this.state = 6;
            }
            break;
        case 4:
           /* var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            if(tileToMove.lonePiece.animations[tileToMove.lonePiece.animations.length - 1].finished == true){
                this.state = 5;
            }*/
            break;
        case 5:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            var currTile = this.board.getSelectedTile(this.board.selectedTileID[0]);
            var pieceToMove;
            if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            }
            else{
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
            }

            if(tileToMove.lonePiece != null){
                tileToMove.lonePiece.animations = [];
                var freeTile;
                if(this.scene.graph.auxBoard1.type != tileToMove.lonePiece.type){
                    freeTile = this.scene.graph.auxBoard1.getFirstTileFree();
                }
                else{
                    freeTile = this.scene.graph.auxBoard2.getFirstTileFree();
                }

                freeTile.lonePiece = tileToMove.lonePiece;
                tileToMove.lonePiece = null;
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
        case 6:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            tileToMove.piece = null;
            this.board.getClickedTile(this.board.selectedTileID[0]);
            this.board.getClickedTile(this.board.selectedTileID[1]);
            this.state = 0;
            break;
    }

};
