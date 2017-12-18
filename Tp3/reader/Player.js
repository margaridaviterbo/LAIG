function Player(game){

    this.game = game;
    this.board = game.board;
    this.currPosition = [];
    this.nextPosition = [];
    this.type = "human"; //human, bot, smart bot
    this.color = "ivory"; //ivory or cigar
}

