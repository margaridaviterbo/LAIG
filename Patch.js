/**
 * Patch
 * 
 */
class Patch extends CGFnurbsObject{
	constructor(scene, degree1, degree2, controlvertexes) {
		var getKnotsVector = function(degree) { 
			
			var v = new Array();
			for (var i=0; i<=degree; i++) {
				v.push(0);
			}
			for (var i=0; i<=degree; i++) {
				v.push(1);
			}
			return v;
		};

		var knots1 = getKnotsVector(degree1); 
		var knots2 = getKnotsVector(degree2); 
		
		console.log("degree1:" + degree1);
		console.log("degree2:" + degree2);
		console.log("knots1:" + knots1);
		console.log("knots2:" + knots2);
		console.log("controlvertexes:" + controlvertexes);

		var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); 
		var getSurfacePoint = function(u, v) {
			return nurbsSurface.getPoint(u, v);
		};

		super(scene, getSurfacePoint, 20, 20);
	}

	setTextCoords(s,t) {}
}




