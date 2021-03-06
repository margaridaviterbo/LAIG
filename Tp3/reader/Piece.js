function Piece(scene, color, type, size){
    CGFobject.call(this,scene);
 
    this.scene = scene;
    this.color = color;
    this.type = type;
    this.size = size;
    this.stacks = [];
    this.counter = 0;
    this.animations = [];
    this.lost = [];

    for(var i = 0; i < this.size; i++){
        this.stacks.push(new CompleteCylinder(this.scene, [0.5, 1, 0.8, 20, 20, 1, 1]));
    }
    
 };
 
 
Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = CompleteCylinder;


Piece.prototype.display = function(){

    for(var i = 0; i < this.stacks.length; i++){
        this.scene.pushMatrix();
            this.scene.translate(0, i/3, 0);
            this.stacks[i].display();        
        this.scene.popMatrix();
    }

};

Piece.prototype.setTextCoords = function(s,t){
for (var i = 0; i < 20; i++){
    this.stacks[i].setTextCoords(s, t);
}
};


Piece.prototype.move = function(controlPoints){
    var id = 'piece' + this.counter;
    var move = new LinearAnimation(this.scene, id, 'linear', controlPoints, 2);
    this.animations.push(move);
    this.counter++;
};


Piece.prototype.moveGotEaten = function(controlPoints){
    var id = 'p' + this.counter;
    this.animations.push(new BezierAnimation(this.scene, id, 'bezier', controlPoints, 1));
    this.counter++;
};

Piece.prototype.addStack = function(){
    this.stacks.push(new CompleteCylinder(this.scene, [0.5, 1, 0.8, 20, 20, 1, 1]));
};