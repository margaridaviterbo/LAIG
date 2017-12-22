var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};
    //this.selectedShader = 0;
    this.selectedColour = 0;
    this.selectedNode = 0;
    this.customId = 1000;
    this.gameStart = 'false';
    
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    this.initCameras();

    this.enableTextures(true);
    
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.shaders=[
        new CGFshader(this.gl, "shaders/selectTile.vert", "shaders/selectTile.frag")
    ];

    this.shaders[0].setUniformsValues({normScale: 1});

    this.selected = [];
   	
    this.setPickEnabled(true);
    this.initScene();
    this.axis = new CGFaxis(this);

}

XMLscene.prototype.initScene = function(){
	this.ambients = [];
	this.selectedAmbient = 0;
	this.ambients[0] = getUrlVars()['file'] || "game.xml";
	this.ambients[1] = getUrlVars()['file'] || "game1.xml";
}

XMLscene.prototype.switchScene = function(){
    
    if(this.gameStart == 'false'){
        this.selectedAmbient++;
        if(this.selectedAmbient > (this.ambients.length-1)){
            this.selectedAmbient = 0;
        }
            
        var myGraph = new MySceneGraph(this.ambients[this.selectedAmbient], this);  
    }   

}


/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.
    
    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];
            
            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);
            
            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            
            this.lights[i].update();
            
            i++;
        }
    }
    
}

XMLscene.prototype.selectedList = function() {

    for( var i=0; i < this.graph.selectableList.length; i++){
        this.selected.push(this.graph.selectableList[i]);
    }
}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    this.cameras = [];
    this.selectedCamera = 0
    this.cameras[0] = [0.4,0.1,500,[15, 15, 15],[0, 0, 0]];
    this.cameras[1] = [0.87,0.1,100,[4.5,5,11],[4.5,0,4]];
    this.camera = new CGFcamera(this.cameras[0][0],this.cameras[0][1], this.cameras[0][2],this.cameras[0][3],this.cameras[0][4]);
}

XMLscene.prototype.switchCamera = function(){

    this.selectedCamera++;
    if(this.selectedCamera > (this.cameras.length-1)){
        this.selectedCamera = 0;
    }
    console.log(this.cameras);
    console.log(this.cameras[this.selectedCamera]);
    this.camera = new CGFcamera(this.cameras[this.selectedCamera][0],this.cameras[this.selectedCamera][1], 
        this.cameras[this.selectedCamera][2],this.cameras[this.selectedCamera][3],this.cameras[this.selectedCamera][4]);
    this.interface.setActiveCamera(this.camera); 
}

/* Handler called when the graph is finally loaded. 
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() 
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);
    
    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1], 
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);
    
    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
    
    this.initLights();
    this.selectedList();
       
    this.setUpdatePeriod(50);    

    // Adds lights group.

    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addSettings();
    
    //this.interface.addNodesGroup(this.selected);
   
}

XMLscene.prototype.logPicking = function ()
{
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
        for (var i=0; i < this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj)
                {
                    this.customId = this.pickResults[i][1];

                    if(this.graph.board.selectedTileID[0] == null || this.graph.board.selectedTileID[1] == null || 
                        this.customId == this.graph.board.selectedTileID[0] || this.customId == this.graph.board.selectedTileID[1]){

                        if(this.graph.board.selectedTileID[0] == null){
                            this.graph.board.getClickedTile(this.customId);
                            this.graph.board.selectedTileID[0] = this.customId;
                        }
                        else if(this.customId == this.graph.board.selectedTileID[0]){
                            this.graph.board.getClickedTile(this.customId);
                            this.graph.board.selectedTileID[0] = null;
                            
                        }
                        else if(this.graph.board.selectedTileID[1] == null){
                            this.graph.board.getClickedTile(this.customId);
                            this.graph.board.selectedTileID[1] = this.customId;
                        }
                        else if(this.customId == this.graph.board.selectedTileID[1]){
                            this.graph.board.getClickedTile(this.customId);
                            this.graph.board.selectedTileID[1] = null;
                        }
                    }
                    //console.log(obj);	
                }
            
            }
            this.pickResults.splice(0,this.pickResults.length);
        }		
    }
    
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup
    
    this.logPicking();
   
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();
    
    if (this.graph.loadedOk) 
    {        
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}
    

    this.popMatrix();
    
    // ---- END Background, camera and axis setup   
}

XMLscene.prototype.update = function(currTime) {

    for(nodeID in this.graph.nodes){
        const node = this.graph.nodes[nodeID];
        if(node.animations.length > 0) {
            if(node.animations[node.currAnimation].finished == false){
                node.animations[node.currAnimation].update(currTime);
            }
            else if(node.currAnimation + 1 < node.animations.length){
                node.currAnimation ++;
            }
        }
    }

    this.graph.game.update(currTime);

    /*var ivory = this.graph.board.getQueen('ivory');
    if(ivory != null){
        for(var i = 0; i < ivory.animations.length; i++){
            ivory.animations[i].update(currTime);
        }
    }
    
    var cigar = this.graph.board.getQueen('cigar');
    if(cigar != null){
        for(var i = 0; i < cigar.animations.length; i++){     
            cigar.animations[i].update(currTime);
        }
    }*/

    var pieces = this.graph.board.getPieces();
    for(var i = 0; i < pieces.length; i++){
        for(var j = 0; j < pieces[i].animations.length; j++){
            pieces[i].animations[j].update(currTime);
        }    
    }
    
}
