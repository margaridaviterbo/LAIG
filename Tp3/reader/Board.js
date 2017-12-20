function Board(scene, type){

    this.scene = scene;
    this.type = type;
  //  this.game = game;

    this.tiles = [];
    this.color;


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
            tilesRow.push(tile);
        }
        this.tiles.push(tilesRow);
    }

    
};

Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor=Board;
Board.prototype.convertToPrologBoard = function() {
}

/*Board.prototype.logPicking = function ()
{
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            console.log("passou pick results");
			for (var i=0; i< this.pickResults.length; i++) {
                console.log("entrou no for" + this.pickResults[i]);

                var obj = this.pickResults[i][0];
                console.log(obj);
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}*/

Board.prototype.display = function(){

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
                this.logPicking();
                this.tiles[i][j].display();
            this.scene.popMatrix();
        }
    }

};

Board.prototype.setTextCoords = function(s,t){
   
    for(var i = 0; i < this.sizeZ; i++){
        for(var j = 0; j < this.sizeX; j++){
            this.tiles[i][j].setTextCoords(s, t);
        }
    }

};



