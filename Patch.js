/**
 * Patch
 * 
 */
class Patch extends CGFnurbsObject{
	constructor(scene, partsU, partsV, degree1, degree2, controlvertexes) {
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

		var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); 
		var getSurfacePoint = function(u, v) {
			return nurbsSurface.getPoint(u, v);
		};

		super(scene, getSurfacePoint, partsU, partsV);
	}

	setTextCoords(s,t) {}
}




