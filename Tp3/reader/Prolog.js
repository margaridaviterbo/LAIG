//prolog constructor
function Prolog(game){

    this.game = game;
    this.board = game.board;
    this.currPosition = [];
    this.gameOver = game.gameOver;
    this.currPlayer = game.currPlayer;
}
Prolog.prototype.constructor = Prolog;



//in case of ad request
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
Prolog.prototype.getPrologRequest = function(requestObject, success, error, port){
    
    var requestString;
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    var input = this;

    if(requestObject == "quit"){
        requestString = "quit" ;
    } 
    else if (requestObject.botPlay){
       
        if(requestObject.botDifficulty == 0){
            requestString = requestObject.randomPlay();
        }
        else{
            requestString = requestObject.smartPlay();
        }
    }
    else{
        requestString = requestObject.humanPlay();
    }

    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = onSuccess || function (data) {

        var response = data.target.response;

        if(requestObject.botPlay){

            var play = play(response);
            // Animate piece and make play
        }
        else{
            if (success(response) == true) {
                var gameOver = gameOver(response);
                // Animate piece and make play
            }
        }

    };

    request.onerror = error || function () {
        console.log("Error waiting for response");
    };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();

    return request;
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