//prolog constructor
function Prolog(game){

    this.game = game;
    this.board = game.board;
    this.currPosition = [];
    this.currPlayer = game.currPlayer;
    this.answer;
}
Prolog.prototype.constructor = Prolog;

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

