function Board(scene,game){

    this.scene = scene;
    this.game = game;

    this.sizeX = 12;
    this.sizeY = 12;
    this.tiles = [];

    
}

Board.prototype.initialTilesPosition = function(){

    for(var i=0; i < sizeX; i++){ 
       for(var j=0; j < sizeY; j++){
           this.tiles.push(new Tile(this.scene,this, i,j));
       }
    
    }
}

Board.prototype.display = function(){

}

