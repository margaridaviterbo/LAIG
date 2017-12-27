function Scoreboard(scene, scoreIvory, scoreCigar){

    this.scene = scene;
    this.font = new Font(scene);
    this.scoreIvory = [];
    this.scoreCigar = [];

    this.font.initFont();
    
    this.left = new Rectangle(scene, [0,2,2,0]);
    this.leftAppearance = new CGFappearance(scene);
    this.leftAppearance.setTexture(this.font.numbers[1]);
};
Scoreboard.prototype = Object.create(CGFobject.prototype);
Scoreboard.prototype.constructor=Scoreboard;

Scoreboard.prototype.playerName = function(){

    this.letter = new Rectangle(this.scene, [0,1,1,0]);

    //ivory
    this.i = new CGFappearance(this.scene);
    this.i.setTexture(this.font.letters['i']);
    this.v = new CGFappearance(this.scene);
    this.v.setTexture(this.font.letters['v']);
    this.o = new CGFappearance(this.scene);
    this.o.setTexture(this.font.letters['o']);
    this.r = new CGFappearance(this.scene);
    this.r.setTexture(this.font.letters['r']);
    this.y = new CGFappearance(this.scene);
    this.y.setTexture(this.font.letters['y']);

    //cigar
    this.c = new CGFappearance(this.scene);
    this.c.setTexture(this.font.letters['c']);
    this.g = new CGFappearance(this.scene);
    this.g.setTexture(this.font.letters['g']);
    this.a = new CGFappearance(this.scene);
    this.a.setTexture(this.font.letters['a']);
}

Scoreboard.prototype.score = function(ivoryScore, cigarScore){

    this.number = new Rectangle(this.scene, [0,2,2,0]);
    var ivoryString = ivoryScore.toString().split('');
    var cigarString = cigarScore.toString().split('');

    if(parseInt(ivoryString[1])== null){
        this.scoreIvory[0] = 0;
        this.scoreIvory[1] = parseInt(ivoryString[0]);
    }
    else if( parseInt(cigarString[1]) == null){
        this.scoreCigar = 0;
        this.scoreIvory[1] = parseInt(cigarString[0]);
    }
    else{
        this.scoreIvory[0] = parseInt(ivoryString[0]);
        this.scoreIvory[1] = parseInt(ivoryString[1]);
        this.scoreCigar[0] = parseInt(cigarString[0]);
        this.scoreCigar[1] = parseInt(cigarString[1]);
    }
      
    this.ivory0 = new CGFappearance(this.scene);
    this.ivory0.setTexture(this.font.numbers[this.scoreIvory[0]]);
    this.ivory1 = new CGFappearance(this.scene);
    this.ivory1.setTexture(this.font.numbers[this.scoreIvory[1]]);

    this.cigar0 = new CGFappearance(this.scene);
    this.cigar0.setTexture(this.font.numbers[this.scoreCigar[0]]);
    this.cigar1 = new CGFappearance(this.scene);
    this.cigar1.setTexture(this.font.numbers[this.scoreCigar[1]]);
}

Scoreboard.prototype.display = function(){

    //player ivory
    this.scene.pushMatrix();
        this.scene.translate(-3.0,10,1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.i.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-2.0,10,0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.v.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-1.0,10,-0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.o.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0,10,-1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.r.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.0,10,-2.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.y.apply();
        this.letter.display();
    this.scene.popMatrix();

    //player cigar
    this.scene.pushMatrix();
        this.scene.translate(5,10,-6.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.c.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(6,10,-7.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.i.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(7,10,-8.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.g.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(8,10,-9.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.a.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(9,10,-10.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.r.apply();
        this.letter.display();
    this.scene.popMatrix();

    //scores
    this.scene.pushMatrix();
        this.scene.translate(-2.5,7,1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.ivory0.apply();
        this.number.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-0.5,7,-1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.ivory1.apply();
        this.number.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(5.5,7,-7);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.cigar0.apply();
        this.number.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(7.5,7,-9);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.cigar1.apply();
        this.number.display();
    this.scene.popMatrix();
}