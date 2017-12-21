//prolog constructor
function Prolog(game){

    this.game = game;
    this.board = game.board;
    this.currPosition = [];
    this.currPlayer = game.currPlayer;
    this.answer;
}
Prolog.prototype.constructor = Prolog;

//ivory player always starts the game, therefore its player1
Prolog.prototype.getCurrPlayer = function(currPlayer){
	if (currPlayer == 1){
        return "ivory";
    } 
	else if (currPlayer == 2){
        return "cigar";
    }
	else return "The Player is Not Valid";
}

//bot play
Prolog.prototype.bot = function(difficulty){
    // convert board to prolog board

    var player = this.getCurrPlayer(this.currPlayer);
     // get queen stack sizes
     // create and make request for the play based on given difficulty - getPrologRequest
     var request = new Request(player,-1,-1,-1,-1, /*queen1Size, queen2Size, board*/true,difficulty);
     this.getPrologRequest(request);
}

//human play
Prolog.prototype.human = function(){
     // convert board to prolog board
    var player = this.getCurrPlayer(this.currPlayer);
    // get queen stack sizes
    //var request = new Request(player, x, y, targetx, targety, queen1Size, queen2Size, board, false, 0);
    this.getPrologRequest(request);
}

//in case of ad reques
Prolog.prototype.handleReply = function(data){
    if (data.target.response == "Bad Request") {
        return;
    }
   
}

//types of replies
success = function(reply){

    var splitReply = reply.split(',');
    if (splitReply[3] == "true"){
        return true;
    }
     
    return false;
}

gameOver = function(reply){

    var splitReply = reply.split(',');
    if (splitReply[2] == "true"){
         return true;
    }
    return false;
}

play = function(reply){
    var splitReply = reply.split(',');
    var gameOver;

    if (splitReply[2] == "true"){
        gameOver = true;
    } 
    else gameOver = false;

    return new Play(splitReply[4],
                    parseInt(splitReply[5]),
                    parseInt(splitReply[6]),
                    parseInt(splitReply[7]),
parseInt(splitReply[8]),gameOver);
}

//make a request
Prolog.prototype.getPrologRequest= function(requestString, onSuccess, onError, port){
	var requestPort = port || 8081;
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+ requestPort + '/' + requestString, true);
 
	request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
	request.onerror = onError || function(){console.log("Error waiting for response");};
 
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
};
    

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
    
    var play = "makePlay((" + this.player + "," + this.x + "," + this.y + "," + this.targetX + "," + this.targetY + "),(" + this.ivoryIn + "," + this.cigarIn + "," + this.board + "))";

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