function Scoreboard(scene, scoreIvory, scoreCigar){

    this.scene = scene;
    this.font = new Font(scene);
    this.scoreIvory = [];
    this.scoreCigar = [];
    this.seconds = [];
    this.switch = false;

    this.font.initFont();
   
};
Scoreboard.prototype = Object.create(CGFobject.prototype);
Scoreboard.prototype.constructor=Scoreboard;

Scoreboard.prototype.playerName = function(){

    this.letter = new Rectangle(this.scene, [0,1,1,0]);
    this.arrow = new CGFappearance(this.scene);
    var arrowText = new CGFtexture(this.scene,"scenes/images/arrow.png");
    this.arrow.setTexture(arrowText);
    this.arrowLeft = new CGFappearance(this.scene);
    var arrowLeftText = new CGFtexture(this.scene,"scenes/images/arrowLeft.png");
    this.arrowLeft.setTexture(arrowLeftText);
    this.arrowRect = new Rectangle(this.scene, [0,1.5,3,0]);
	

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
    
    if(ivoryString[1] == undefined){
        this.scoreIvory[0] = 0;
        this.scoreIvory[1] = parseInt(ivoryString[0]);
    }
    else if(cigarString[1] == undefined){
        this.scoreCigar[0] = 0;
        this.scoreCigar[1] = parseInt(cigarString[0]);
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

Scoreboard.prototype.timer = function(time, turntime, player){
   
    this.time = new Rectangle(this.scene, [0,1,1,0]);

    this.minute = new CGFappearance(this.scene);
    this.minute.setTexture(this.font.numbers[0]);

    this.dots = new CGFappearance(this.scene);
    this.dots.setTexture(this.font.twoDots);

    var timeValue = Math.round(time);
    var turntimeValue = 0;
    if(turntime != undefined){
        turntimeValue = turntime;
    }

    var elapsedTimeValue = turntimeValue - timeValue;
    var elapsedTimeString = elapsedTimeValue.toString().split('');

    if(elapsedTimeString[1] == undefined){
        this.seconds[0] = 0;
        this.seconds[1] = parseInt(elapsedTimeString[0]);
    } 
    else{
        this.seconds[0] = parseInt(elapsedTimeString[0]);
        this.seconds[1] = parseInt(elapsedTimeString[1]);
    }
  
    this.time0 = new CGFappearance(this.scene);
    this.time0.setTexture(this.font.numbers[this.seconds[0]]);
    this.time1 = new CGFappearance(this.scene);
    this.time1.setTexture(this.font.numbers[this.seconds[1]]);

    if(player == 'ivory'){
        this.switch = false;
    }
    else{
        this.switch = true;
    }
    
}

Scoreboard.prototype.display = function(){

    //timer ivory
    this.scene.pushMatrix();
        this.scene.translate(-3.0,6,1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.minute.apply();
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(-2.0,6,0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.minute.apply();
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(-1.0,6,-0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.dots.apply();
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(0,6,-1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        if(this.switch == false){
          this.time0.apply();
        }else{
            this.minute.apply();
        }
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(1.0,6,-2.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        if(this.switch == false){
            this.time1.apply();
          }else{
              this.minute.apply();
          }
        this.time.display();
    this.scene.popMatrix(); 

    //timer cigar
    this.scene.pushMatrix();
        this.scene.translate(5,6,-6.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.minute.apply();
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(6,6,-7.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.minute.apply();
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(7,6,-8.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.dots.apply();
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(8,6,-9.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        if(this.switch == true){
            this.time0.apply();
          }else{
              this.minute.apply();
          }
        this.time.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(9,6,-10.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        if(this.switch == true){
            this.time1.apply();
          }else{
              this.minute.apply();
          }
        this.time.display();
    this.scene.popMatrix(); 

    //player ivory
    this.scene.pushMatrix();
        this.scene.translate(-3.0,11,1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.i.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-2.0,11,0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.v.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-1.0,11,-0.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.o.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0,11,-1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.r.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.0,11,-2.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.y.apply();
        this.letter.display();
    this.scene.popMatrix();

    //player cigar
    this.scene.pushMatrix();
        this.scene.translate(5,11,-6.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.c.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(6,11,-7.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.i.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(7,11,-8.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.g.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(8,11,-9.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.a.apply();
        this.letter.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(9,11,-10.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.r.apply();
        this.letter.display();
    this.scene.popMatrix();

    //scores
    this.scene.pushMatrix();
        this.scene.translate(-2.5,8,1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.ivory0.apply();
        this.number.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-0.5,8,-1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.ivory1.apply();
        this.number.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(2.3,8.3,-3.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        if(this.switch == false){
            this.arrowLeft.apply();
        }
        else{
            this.arrow.apply();
        }
        this.arrowRect.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(5.5,8,-7);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.cigar0.apply();
        this.number.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(7.5,8,-9);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.cigar1.apply();
        this.number.display();
    this.scene.popMatrix();
}