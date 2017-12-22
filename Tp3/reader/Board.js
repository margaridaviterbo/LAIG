function Board(scene, type){

    this.scene = scene;
    this.type = type;
    this.prologBoard;
  //  this.game = game;

    this.tiles = [];

    this.selectedTileID = [null, null];



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

Board.prototype.getClickedTile= function(id){
    
    for(var i=0; i < this.sizeZ; i++){
        for(var j=0; j < this.sizeX; j++){
            if(this.tiles[i][j].id == id){
                this.tiles[i][j].isSelected = !this.tiles[i][j].isSelected;
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

Board.prototype.getSelectedTile = function(id){
    for(var i = 0; i < this.sizeZ; i++){
        for(var j = 0; j < this.sizeX; j++){
            if(this.tiles[i][j].id == id){
                return this.tiles[i][j];
            }
        }
    }
}

Board.prototype.getQueen = function(type){
    for(var i = 0; i < this.sizeZ; i++){
        for(var j = 0; j < this.sizeX; j++){
            if(this.tiles[i][j].piece != null && this.tiles[i][j].piece.type == type && this.tiles[i][j].piece.stacks.length > 2){
                console.log("atualizei");
                return this.tiles[i][j].piece;
            }
        }
    }
}

Board.prototype.convertToPrologBoard = function() {

    this.prologBoard = '[';
    for (var i = 0; i < this.sizeZ; i++){
        this.prologBoard = this.prologBoard + '[';
        for (var j  = 0; j < this.sizeX; j++){
            if(this.tiles[i][j].piece == null){
                this.prologBoard = this.prologBoard + 'empty';
            }
            else if(this.tiles[i][j].piece.stacks.length == 1){
                if(this.tiles[i][j].piece.type == 'ivory'){
                    this.prologBoard = this.prologBoard + 'ivoryBaby';                    
                }
                else{
                    this.prologBoard = this.prologBoard + 'cigarBaby';                    
                }
            }
            else{
                if(this.tiles[i][j].piece.type == 'ivory'){
                    this.prologBoard = this.prologBoard + 'ivoryQueen';                    
                }
                else{
                    this.prologBoard = this.prologBoard + 'cigarQueen';                    
                }
            }

            if(j != this.sizeX - 1){
                this.prologBoard = this.prologBoard + ','
            }
        }
        if(i == this.sizeZ - 1){
            this.prologBoard = this.prologBoard + ']';
        }
        else{
            this.prologBoard = this.prologBoard + '],';            
        }
    }
    this.prologBoard = this.prologBoard + ']';

    return this.prologBoard;
};



