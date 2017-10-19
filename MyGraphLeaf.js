/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {

    this.type = graph.reader.getString(xmlelem, 'type');
    this.args = graph.reader.getString(xmlelem, 'args');
    var coords = this.args.split(" ");

    switch (this.type) {
        case 'triangle':
            this.element = new Triangle(graph.scene, coords);
            break;
        case 'sphere':
            this.element = new Sphere(graph.scene,coords);   
            break;
        case 'cylinder':
            this.element = new CompleteCylinder(graph.scene,coords);
            break;
        case 'patch':
            var leafSpecs = xmlelem.children;

            var controlPoints = [];
            var orderU = leafSpecs.length-1;
            var orderV;
            for (var k = 0; k < leafSpecs.length; k++) {
                var cplineSpecs = leafSpecs[k].children;
                var cpoints = [];
                orderV = cplineSpecs.length-1;
                for (var l = 0; l < cplineSpecs.length; l++) {
                    var xx = graph.reader.getFloat(cplineSpecs[l], 'xx');
                    var yy = graph.reader.getFloat(cplineSpecs[l], 'yy');
                    var zz = graph.reader.getFloat(cplineSpecs[l], 'zz');
                    var ww = graph.reader.getFloat(cplineSpecs[l], 'ww');
                    cpoints.push([xx, yy, zz, ww]);
                }
                controlPoints.push(cpoints);
            }

            this.element = new Patch(graph.scene, parseFloat(coords[0]), parseFloat(coords[1]), orderU, orderV, controlPoints);
            break;
        case 'rectangle':
            this.element = new Rectangle(graph.scene, coords); 
            break;
        default:
            this.element = null;
            break;
    }

}
MyGraphLeaf.prototype.setTextCoords = function (s, t) {

    if (this.element != null) {
        this.element.setTextCoords(s, t);
    }

};

MyGraphLeaf.prototype.display = function () {

    if (this.element != null) {
        this.element.display();
    }
};

