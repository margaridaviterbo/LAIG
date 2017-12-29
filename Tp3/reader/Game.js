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
    this.playMovie = false;
    this.PlayGameMovie = function(){
        this.playMovie = true;
    };
    this.updatedBoard = false;
    this.start = false;
    this.Start_Game = function(){
        this.start = true;
    };
    this.ReStart_Game = function(){
        this.start = true;
    }
    this.requestMade = false;
    this.scoreCigar = 20;
    this.scoreIvory = 20;
    this.scoreboard1 = new Scoreboard(this.scene);
    this.scoreboard1.playerName();
    this.scoreboard2 = new Scoreboard(this.scene);
    this.scoreboard2.playerName();
    this.time = 0;
    this.startTime = 0;
    this.maxTime = 15;
    this.timeout = false;

    this.cameraAngle = 0;
    this.cameraStep = 0.1;

}

Game.prototype.constructor = Game;

Game.prototype.marker = function(){
    
    this.score==null;
  
    if(this.board.getQueen(this.currPlayer) == null || this.board.getQueen(this.notCurrPlayer) == null){
        return;
    }
    else{

        if(this.currPlayer == 'ivory'){
            this.scoreIvory = this.board.getQueen(this.currPlayer).stacks.length;
            this.scoreCigar = this.board.getQueen(this.notCurrPlayer).stacks.length;
           
        }
        else{
            this.scoreIvory = this.board.getQueen(this.notCurrPlayer).stacks.length;
            this.scoreCigar = this.board.getQueen(this.currPlayer).stacks.length; 
        }

        this.scoreboard1.score(this.scoreIvory,this.scoreCigar);
        this.scoreboard2.score(this.scoreIvory,this.scoreCigar);
    }
 }

Game.prototype.turn = function(currTime, state){

    this.turnTime = Math.round(this.maxTime);
    
    if(this.startTime == 0){
        this.startTime = currTime;
    }
    else{
        this.time = (currTime - this.startTime) / 1000;
    }

    if(this.time > this.turnTime || state == 0){
        
        this.timeout = true;
        this.startTime = 0;
        this.time = 0;
        if(this.currPlayer == 'ivory'){
            this.currPlayer = 'cigar';
            this.notCurrPlayer = 'ivory';
            
        }
        else{
            this.currPlayer = 'ivory';
            this.notCurrPlayer = 'cigar';
            
        }
    }  
}

Game.prototype.update = function(currTime){
    
    this.marker();
    this.scoreboard1.timer(this.time,this.turnTime, this.currPlayer);
    this.scoreboard2.timer(this.time,this.turnTime, this.currPlayer);
    switch(this.state){
        case -1:
            this.chosen_mode = this.mode;
            this.chosen_difficulty = this.difficulty;
            if(this.start == true){
                this.state = 0;
                this.start = false;
            }
            break;
        case 10:
            this.state = 1;
            this.requestMade = true;
            if(this.chosen_difficulty == 0){
                this.prolog.getPrologRequest("insistOnCorrectBotRandomPlay(" + this.currPlayer + ",(" + this.board.getQueen('ivory').stacks.length + "," + this.board.getQueen('cigar').stacks.length + "," + this.board.convertToPrologBoard() + "))" , (data) => {
                    var r = data.target.response;
                    this.reply = r.split(',');
                    this.board.selectedTileID[0] = this.board.findTile(this.reply[6], this.reply[5]);
                    this.board.selectedTileID[1] = this.board.findTile(this.reply[8], this.reply[7]);
                    this.board.getClickedTile(this.board.selectedTileID[0]);
                    this.board.getClickedTile(this.board.selectedTileID[1]);                
                });
            }
            else{
                this.prolog.getPrologRequest("playBestBot(" + this.currPlayer + ",(" + this.board.getQueen('ivory').stacks.length + "," + this.board.getQueen('cigar').stacks.length + "," + this.board.convertToPrologBoard() + "))" , (data) => {
                    var r = data.target.response;
                    this.reply = r.split(',');
                    this.board.selectedTileID[0] = this.board.findTile(this.reply[6], this.reply[5]);
                    this.board.selectedTileID[1] = this.board.findTile(this.reply[8], this.reply[7]);
                    this.board.getClickedTile(this.board.selectedTileID[0]);
                    this.board.getClickedTile(this.board.selectedTileID[1]);                
                });
            }

            this.state = 0;
            break;
        case 0:
            if(this.scene.activateTimer){
                this.timeout = false;
                this.turn(currTime);
            }
           
            if(this.start == true){
                this.state = -1;
                this.scene.graph.initializeBoards();
                this.board = this.scene.graph.board;
                this.currPlayer = 'ivory';
                this.notCurrPlayer = 'cigar';
                this.plays = [];
            }

            else if(this.undo == true){
                if(this.plays.length == 0){
                    alert("No more plays to undo, please make a play!");
                    this.undo = false;
                }
                else{
                    this.board.selectedTileID[0] = this.plays[this.plays.length - 1].to;
                    this.board.selectedTileID[1] = this.plays[this.plays.length - 1].from;
                    var pieceToMove;
                    if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                        pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
                    }
                    else{
                        pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
                    }
                    var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
                    var coordXToMove = tileToMove.coordX;
                    var coordZToMove = tileToMove.coordZ;
                    var currTile = this.board.getSelectedTile(this.board.selectedTileID[0]);
                    var currCoordX = currTile.coordX;
                    var currCoordZ = currTile.coordZ;
                    var distToMoveX = (coordXToMove - currCoordX) * 2;
                    var distToMoveZ = (coordZToMove - currCoordZ) * 2;
                    pieceToMove.move([[0, 0, 0], [distToMoveX, 0, distToMoveZ]]);
                    this.state = 4;
                }
            }
            else if(this.playMovie == true){
                if(this.updatedBoard == false){
                    this.scene.graph.initializeBoards();
                    this.board = this.scene.graph.board;
                    this.currPlayer = 'ivory';
                    this.notCurrPlayer = 'cigar';
                    this.updatedBoard = true;
                }
                if(this.plays.length > 0){
                    this.state = 2;
                    this.board.selectedTileID[0] = this.plays[0].from;
                    this.board.selectedTileID[1] = this.plays[0].to;
                    this.plays.shift();
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

                        this.prolog.getPrologRequest("makePlay((" + this.currPlayer + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordX
                            + "," + this.board.getSelectedTile(this.board.selectedTileID[0]).coordZ + "," + this.board.getSelectedTile(this.board.selectedTileID[1]).coordX
                            + ","+ this.board.getSelectedTile(this.board.selectedTileID[1]).coordZ+"),("+ this.board.getQueen('ivory').stacks.length + "," + this.board.getQueen('cigar').stacks.length + "," +
                            this.board.convertToPrologBoard()+"))", (data) => {
                            var r = data.target.response;
                            //ivorySize,cigarSize,endGame,Success
                            this.reply = r.split(',');
                            this.gameOver = this.reply[2];

                            if(this.reply[3] == 'false'){
                                if(this.currPlayer != selectedPlayer){
                                    alert('Cannot play with selected piece, it is ' + this.currPlayer + ' time to play!');
                                }
                                else{
                                    alert('Invalid move! Please try again.');
                                }
                                this.board.getClickedTile(this.board.selectedTileID[0]);
                                this.board.getClickedTile(this.board.selectedTileID[1]);
                                this.board.selectedTileID = [null, null];
                                this.state = 0;                        
                            }
                            else{
                              this.state = 2;
                              this.plays.push(new Play(this.board.selectedTileID[0], this.board.selectedTileID[1]));
                            }
                        });
                    }
                }
            }
            else{
                alert("GAME OVER ! " + this.notCurrPlayer + " won!!!");
                this.start = true;
                this.gameOver = 'false';
                this.requestMade = false;
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
                    if(this.playMovie == false){
                        this.plays[this.plays.length - 1].lonePieceTile = freeTile; 
                    }
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
                    if(this.playMovie == false){
                        this.plays[this.plays.length - 1].lonePieceTile = freeTile; 
                    }                   
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
                else if(tileToMove.lonePiece == null && tileToMove.piece == null){
                    this.state = 5;
                }
                else if(tileToMove.piece != null){
                      this.state = 6;
                }
                
            }
           
            break;
        case 4:
            var pieceToMove;
            if(this.board.getSelectedTile(this.board.selectedTileID[0]).piece != null && this.board.getSelectedTile(this.board.selectedTileID[0]).piece.type != null){
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
            }
            else{
                pieceToMove = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
            }
            
            if(pieceToMove.animations[pieceToMove.animations.length-1].finished == true){
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
                    this.board.getSelectedTile(this.board.selectedTileID[0]).piece.animations = [];
                    this.board.getSelectedTile(this.board.selectedTileID[1]).piece = this.board.getSelectedTile(this.board.selectedTileID[0]).piece;
                    this.board.getSelectedTile(this.board.selectedTileID[0]).piece = null;
                }
                else{
                    this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece.animations = [];
                    this.board.getSelectedTile(this.board.selectedTileID[1]).lonePiece = this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece;
                    this.board.getSelectedTile(this.board.selectedTileID[0]).lonePiece = null;
                }
                this.plays.pop();
                this.undo = false;
                this.board.selectedTileID = [null, null];

                if(this.scene.activateTimer == false){
                    if(this.currPlayer == 'ivory'){
                        this.currPlayer = 'cigar';
                        this.notCurrPlayer = 'ivory';
                    }
                    else{
                        this.currPlayer = 'ivory';
                        this.notCurrPlayer = 'cigar';
                        
                    }
                }else{
                    this.turn(currTime,0);
                }

                this.state = 7;
            }
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

            if(this.scene.activateTimer == false){
                if(this.currPlayer == 'ivory'){
                    this.currPlayer = 'cigar';
                    this.notCurrPlayer = 'ivory';
                    
                }
                else{
                    this.currPlayer = 'ivory';
                    this.notCurrPlayer = 'cigar';
                }
            }else{
                this.turn(currTime,0);
            }

            this.state = 7;   
            break;   
        case 6:
            var tileToMove = this.board.getSelectedTile(this.board.selectedTileID[1]);
            tileToMove.piece = null;
            this.board.getClickedTile(this.board.selectedTileID[0]);
            this.board.getClickedTile(this.board.selectedTileID[1]);
            if(this.scene.activateTimer == false){
                if(this.currPlayer == 'ivory'){
                    this.currPlayer = 'cigar';
                    this.notCurrPlayer = 'ivory';
                }
                else{
                    this.currPlayer = 'ivory';
                    this.notCurrPlayer = 'cigar';
                    
                }
            }else{
                this.turn(currTime,0);
            }

            this.state = 7;
            break;
        case 7:
            if(this.scene.cameraAnimation == true){
                if(this.currPlayer == 'cigar'){
                    if (this.cameraAngle + this.cameraStep <= Math.PI/2) {
                        this.cameraAngle += this.cameraStep;
                        this.scene.camera.orbit(CGFcameraAxis.Y, this.cameraStep);
                    } else {
                        let diff = Math.PI/2 - this.cameraAngle;
                        this.scene.camera.orbit(CGFcameraAxis.Y, diff);
                        this.cameraAngle = 0;
                        this.state = 0;
                    }
                }
                else{
                    if (this.cameraAngle + this.cameraStep <= Math.PI/2) {
                        this.cameraAngle += this.cameraStep;
                        this.scene.camera.orbit(CGFcameraAxis.Y, -this.cameraStep);
                    } else {
                        let diff = Math.PI/2 - this.cameraAngle;
                        this.scene.camera.orbit(CGFcameraAxis.Y, -diff);
                        this.cameraAngle = 0;
                        this.state = 0;
                    }
                }  
            }
            else{
                this.state = 0;
            }
            break;
    }

};
