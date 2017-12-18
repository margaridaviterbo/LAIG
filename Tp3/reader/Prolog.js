//prolog constructor
function Prolog(game){

    this.game = game;
    this.board = game.board;
    this.currPosition = [];
    this.gameOver = game.gameOver;
    this.currPlayer = game.currPlayer;
}
Prolog.prototype.constructor = Prolog;

Prolog.prototype.handleReply = function(data){
    if (data.target.response == "Bad Request") {
        return;
    }
   
}

//request constructor
function Request(player, x, y, targetX, targetY, ivoryIn, cigarIn, board, botPlay,botDifficulty){

    this.player = player;
    this.x = x
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.ivoryIn = ivoryIn;
    this.cigarIn = cigarIn;
    this.board = board;
    this.botPlay = botPlay;
    this.botDifficulty = botDifficulty;
}
Request.prototype.constructor = Request;

//types of plays
//human play
Request.prototype.humanPlay = function(){
    
    var play = "makePlay((" + this.player + "," + this.x + "," + this.y + "," + this.targetX + "," + this.targetY + "),(" +
                            this.ivoryIn + "," + this.cigarIn + "," + this.board + "))";

    return play;
}

//random bot play
Request.prototype.randomPlay = function(){

    var play = "insistOnCorrectBotRandomPlay("+this.player+",("+this.iIn+","+this.cIn+","+this.board+"))";

    return play;
}

//smart bot play
Request.prototype.smartPlay = function(){

    var play = "playBestBot("+this.player+",("+this.iIn+","+this.cIn+","+this.board+"))";

    return play;
}

//play constructor
function Play(player,x,y,targetX,targetY,gameOver){
    
    this.player = player;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.gameOver = gameOver;
}
Play.prototype.constructor = Play;