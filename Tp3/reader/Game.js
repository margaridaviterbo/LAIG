function Game(scene){

    this.scene = scene;
    this.prolog = new Prolog(this);
    this.gameOver = 'false';
    this.currPlayer = 'ivory';
    this.notCurrPlayer = 'cigar';
    this.state = -1;
    this.board = this.scene.graph.board;
    this.mode = 0;
    this.chosen_mode = 0;
    this.difficulty = 0;
    this.chosen_difficulty = 0;
    this.reply = [];
    this.scene.gameStart;
    this.undo = false;
    this.plays = [];
    this.start = false;
    this.Start_Game = function(){
        this.start = true;
    };
    this.requestMade = false;
    this.cameraAnim = false;
    this.inc = 0;
    this.ang = 0;
    this.finalAng = 0;
}

Game.prototype.constructor = Game;

Game.prototype.cameraAnimation = function(){

    this.cameraAnim = true;
    this.ang = 0;

    if(this.currPlayer == 'ivory'){  
        this.scene.camera.setPosition(vec3.fromValues(-5,15,20));
        this.scene.camera.setTarget(vec3.fromValues(0,0,0));
        this.scene.camera.zoom(0);
        this.inc = 0.005;
        this.finalAng = 0.04;
    }
    else{
        this.scene.camera.setPosition(vec3.fromValues(-5,30,-35));
        this.scene.camera.setTarget(vec3.fromValues(0,0,10));
        this.scene.camera.zoom(15);
        this.inc = -0.005;
        this.finalAng = -0.02;
    }
}
Game.prototype.update = function(currTime){
    
    switch(this.state){
        case -1:
            this.chosen_mode = this.mode;
            this.chosen_difficulty = this.difficulty;
            if(this.start == true){
                this.state = 0;
            }
            break;
        case 10:
            this.state = 1;
            this.requestMade = true;
            this.prolog.getPrologRequest("insistOnCorrectBotRandomPlay(" + this.currPlayer + ",(" + this.board.getQueen('ivory').stacks.length + "," + this.board.getQueen('cigar').stacks.length + "," + this.board.convertToPrologBoard() + "))" , (data) => {
                var r = data.target.response;
                this.reply = r.split(',');
                //console.log(this.reply);
                this.board.selectedTileID[0] = this.board.findTile(this.reply[6], this.reply[5]);
                this.board.selectedTileID[1] = this.board.findTile(this.reply[8], this.reply[7]);
                this.board.getClickedTile(this.board.selectedTileID[0]);
                this.board.getClickedTile(this.board.selectedTileID[1]);                
            });

            this.state = 0;
            break;
        case 0:
        //console.log(this.board);
            if(this.undo == true){
                //TODO eventualmente implmentar movimentos backwards
                if(this.plays.length == 0){
                    //TODO aparecer pop-up a dizer o que esta no console.log
                    console.log("No more plays to undo, please make a play!");
                    this.undo = false;
                }
                else{
                    this.board.selectedTileID[0] = this.plays[this.plays.length - 1].to;
                    this.board.selectedTileID[1] = this.plays[this.plays.length - 1].from;
                    this.state = 4;
                }
            }
            else if(this.gameOver == 'false'){
                if((this.chosen_mode == 2 && this.requestMade == false) || (this.chosen_mode == 1 && this.currPlayer == 'cigar' && this.requestMade == false) ){
                    this.state = 10;
                }
                else if(this.board.selectedTileID[0] != null && (this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null || this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece != null)){
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

                        this.plays.push(new Play(this.board.selectedTileID[0], this.board.selectedTileID[1]));
                        //console.log(this.plays);

                        this.prolog.getPrologRequest("makePlay((" + this.currPlayer + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordX
                            + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordZ + "," + this.board.getSelectedTile(this.board.selectedTileID[1]).coordX
                            + ","+ this.board.getSelectedTile(this.board.selectedTileID[1]).coordZ+"),("+ this.board.getQueen('ivory').stacks.length + "," + this.board.getQueen('cigar').stacks.length + "," +
                            this.board.convertToPrologBoard()+"))", (data) => {
                            var r = data.target.response;
                            //ivorySize,cigarSize,endGame,Success
                            this.reply = r.split(',');
                            //console.log(this.reply);
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
                console.log("GAME OVER ! " + this.notCurrPlayer + " won!!!");
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
                    this.plays[this.plays.length - 1].lonePieceTile = freeTile;
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
                    this.plays[this.plays.length - 1].lonePieceTile = freeTile;                    
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
            var lonePieceTile = this.plays[this.plays.length - 1].lonePieceTile;
            if(this.plays[this.plays.length - 1].lonePieceTile != null){
                this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece = lonePieceTile.lonePiece;
                lonePieceTile.lonePiece = null;
            }
            else{
                if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null){
                    this.board.getSelectedTile(this.board.selectedTileID[1]).lonePiece = null;
                    this.board.getSelectedTile(this.board.selectedTileID[0]).piece.addStack();
                }
            }
            if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null){
                this.board.getSelectedTile(this.board.selectedTileID[1]).piece = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
                this.board.getSelectedTile(this.board.selectedTileID[0]).piece = null;
            }
            else{
                this.board.getSelectedTile(this.board.selectedTileID[1]).lonePiece = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
                this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece = null;
            }
            this.plays.pop();
            this.undo = false;
            /*this.board.getClickedTile(this.board.selectedTileID[0]);
            this.board.getClickedTile(this.board.selectedTileID[1]);*/
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
            this.requestMade = false;

            if(this.currPlayer == 'ivory'){
                this.cameraAnimation();
                this.currPlayer = 'cigar';
                this.notCurrPlayer = 'ivory';
            }
            else{
                this.cameraAnimation();
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
            if(this.currPlayer == 'ivory'){
                this.cameraAnimation();
                this.currPlayer = 'cigar';
                this.notCurrPlayer = 'ivory';
            }
            else{
                this.cameraAnimation();
                this.currPlayer = 'ivory';
                this.notCurrPlayer = 'cigar';
            }
            this.state = 0;
            break;
    }

};
