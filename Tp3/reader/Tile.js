function Tile(scene){
    
    this.scene = scene;
    // this.game = game;
    this.faces = [];
    this.piece = null;
    
    for(var i = 0; i < 6; i++){
        this.faces.push(new Rectangle(scene, [0,2,2,0]));
    }
        
};
    
Tile.prototype = Object.create(CGFobject.prototype);
Tile.prototype.constructor=Tile;


Tile.prototype.display = function(){

    this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 1);

        //tras
        this.scene.pushMatrix();
            this.faces[0].display();
        this.scene.popMatrix();

        //esq
        this.scene.pushMatrix();
            this.scene.rotate(3*Math.PI/2, 0, 1, 0);
            this.faces[1].display();
        this.scene.popMatrix();

        //dir
        this.scene.pushMatrix();
            this.scene.translate(2, 0, 0);
            this.scene.rotate(3*Math.PI/2, 0, 1, 0);
            this.faces[2].display();
        this.scene.popMatrix();

        //baixo
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 2);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.faces[3].display();
        this.scene.popMatrix();

        //cima
        this.scene.pushMatrix();
            this.scene.translate(0, 2, 2);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.faces[4].display();
        this.scene.popMatrix();

        //frente
        this.scene.pushMatrix();
            this.scene.translate(2, 0, 2);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.faces[5].display();
        this.scene.popMatrix();

    this.scene.popMatrix();

    if(this.piece != null){
        this.scene.pushMatrix();
            this.scene.translate(1, 0.2, 1);
            this.piece.color.apply();
            this.piece.display();
        this.scene.popMatrix();
    }
};

Tile.prototype.setTextCoords = function(s,t){
    for(var i = 0; i < 6; i++){
        this.faces[i].setTextCoords(s, t);
    }
};
