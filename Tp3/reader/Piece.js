function Piece(scene){
    CGFobject.call(this,scene);
 
    this.scene = scene;
    this.stacks = [];
    this.counter = 0;
    this.animations = [];
    this.lost = [];

    for(var i = 0; i < 20; i++){
        this.stacks.push(new CompleteCylinder(scene, [0.5, 1, 0.8, 20, 20, 1, 1]));
    }
    
 };
 
 
Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=CompleteCylinder;


Piece.prototype.display = function(){

    for(var i = 0; i < this.stacks.length; i++){
        this.scene.pushMatrix();
            this.scene.translate(0, i/3, 0);
            this.stacks[i].display();        
        this.scene.popMatrix();
    }

    for(var j = 0; j < this.lost.length; j++){
        this.scene.pushMatrix();
            //this.lost[j].display();
        this.scene.popMatrix();
    }

};

Piece.prototype.setTextCoords = function(s,t){
for (var i = 0; i < 20; i++){
    this.stacks[i].setTextCoords(s, t);
}
};

Piece.prototype.move = function(){
    this.lost.push(new CompleteCylinder(this.scene, [0.5, 1, 0.8, 20, 20, 1, 1]));
    this.stacks.pop();
    this.moveWithCapture();
};

Piece.prototype.moveWithCapture = function(){
    var id = 'piece' + this.counter;
    var move = new LinearAnimation(this.scene, id, 'linear', [[0, 0, 0], [4, 0, 6]], 2);
    this.animations.push(move);
    this.counter++;
};


Piece.prototype.moveGotEaten = function(){
    var id = 'p' + this.counter;
    this.animations.push(new BezierAnimation(this.scene, id, 'bezier', [[0, 0, 0], [1, 1, 1], [2, 2, 2], [-10, -3, -4]], 1));
    this.counter++;
};