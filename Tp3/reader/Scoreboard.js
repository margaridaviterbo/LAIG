function Scoreboard(scene, scoreIvory, scoreCigar){

    this.scene = scene;
    this.scoreIvory = scoreIvory;
    this.scoreCigar = scoreCigar;

    this.numbers = [];
    for (var i = 0; i < 10; i++) {
        var path = "scenes\\images\\numbers\\" + i + ".png";
        this.numbers[i] = new CGFtexture(scene, path);  
    }

    this.left = new Rectangle(scene, [0,2,2,0]);
    this.leftAppearance = new CGFappearance(scene);
    this.leftAppearance.setTexture(this.numbers[1]);
};

Scoreboard.prototype = Object.create(CGFobject.prototype);
Scoreboard.prototype.constructor=Scoreboard;

Scoreboard.prototype.display = function(){

    this.scene.pushMatrix();
        this.scene.translate(-0.5,7,-1);
        this.scene.rotate(-3*Math.PI/4, 0, 1, 0);
        this.leftAppearance.apply();
        this.left.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.5,7,-3);
        this.scene.rotate(-3*Math.PI/4, 0, 1, 0);
        this.leftAppearance.apply();
        this.left.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(5.5,7,-7);
        this.scene.rotate(-3*Math.PI/4, 0, 1, 0);
        this.leftAppearance.apply();
        this.left.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(7.5,7,-9);
        this.scene.rotate(-3*Math.PI/4, 0, 1, 0);
        this.leftAppearance.apply();
        this.left.display();
    this.scene.popMatrix();
}