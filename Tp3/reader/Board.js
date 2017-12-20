function Board(scene, type){

    this.scene = scene;
    this.type = type;
  //  this.game = game;

    this.tiles = [];
    this.color;
    this.selectedTileID;


Board.prototype.initBoard = function(){

    //iniciar tiles
    //posição inicial das peças
    //ivory - (6,11); cigar - (5,0)
}
    if(this.type == 'game'){
        this.sizeX = 12;
        this.sizeZ = 12;
    }
    else{
        this.sizeX = 2;
        this.sizeZ = 9;
    }

    this.black = new CGFappearance(this.scene);
	this.black.setAmbient(0.3, 0.3, 0.3, 1);
	this.black.setDiffuse(0, 0, 0, 1);
	this.black.setSpecular(0.2, 0.2, 0.2, 1);
	this.black.setShininess(50);
	//this.black.loadTexture('../resources/images/ocean3.jpg');

    this.white = new CGFappearance(this.scene);
	this.white.setAmbient(0.3, 0.3, 0.3, 1);
	this.white.setDiffuse(1, 1, 1, 1);
	this.white.setSpecular(0.2, 0.2, 0.2, 1);
	this.white.setShininess(50);
    //this.black.loadTexture('../resources/images/ocean3.jpg');

    for(var i = 0; i < this.sizeZ; i++){
        
        var tilesRow = [];
        for(var j = 0; j < this.sizeX; j++){
            var tile = new Tile(scene);
            tile.isSelected = false;
            tilesRow.push(tile);
        }
        this.tiles.push(tilesRow);
    }
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor=Board;
Board.prototype.convertToPrologBoard = function() {

}


Board.prototype.display = function(){
    var id =0;
    for(var i = 0; i < this.sizeZ; i++){
        
        if(i % 2 == 0){
            this.color = this.white;
        }
        else{
            this.color = this.black;
        }
        for(var j = 0; j < this.sizeX; j++){
            if(j > 0){
                if(this.color == this.white){
                    this.color = this.black;
                }
                else{
                    this.color = this.white;
                }
            }
            this.scene.pushMatrix();
            this.scene.translate(j*2, 0, i*2);
            if(this.type == 'game'){
                this.color.apply();
            }
           
            this.tiles[i][j].id = id;
            this.tiles[i][j].coordZ=i;
            this.tiles[i][j].coordX=j;
            //this.unselectTile(id);
            this.scene.registerForPick(id, this.tiles[i][j]);
            id++;

            if(this.tiles[i][j].isSelected){
               this.scene.setActiveShader(this.scene.shaders[0]);
            }
            this.tiles[i][j].display();
            this.scene.popMatrix();

            if(this.tiles[i][j].isSelected){
                this.scene.setActiveShader(this.scene.defaultShader);
            }

        }
    }
};

Board.prototype.getSelectedTileID = function(id){
    this.selectedTileID = id;

    for(var i=0; i < this.sizeZ; i++){
        for(var j=0; j < this.sizeX; j++){
            if(this.tiles[i][j].id == id){
                this.tiles[i][j].isSelected = true;
            }
        }
    }
}

Board.prototype.unselectTile = function(id){

    for(var i=0; i < this.sizeZ; i++){
        for(var j=0; j < this.sizeX; j++){
            if(this.tiles[i][j].id == id){
               if(this.tiles[i][j].isSelected){
                this.scene.clearPickRegistration();
               }
            }
        }   
    }
}

Board.prototype.setTextCoords = function(s,t){
   
    for(var i = 0; i < this.sizeZ; i++){
        for(var j = 0; j < this.sizeX; j++){
            this.tiles[i][j].setTextCoords(s, t);
        }
    }

};



