/**
 * BezierAnimation
 * 
 */
class BezierAnimation extends Animation{
	constructor(scene, controlPoints, velocity) {
		super();
	
		this.scene = scene;
		this.controlPoints = controlPoints;
		this.velocity = velocity;

		this.positionX = 0;
		this.positionZ = 0;

	}

	getType(){
        return "bezier";
	}
	
	lerp(a, b, t)
	{
		var point = [a.x + (b.x-a.x)*t, 0, a.y + (b.y-a.y)*t];

		return point;
	}

	update(currTime){




		
		
		// evaluate a point on a bezier-curve. t goes from 0 to 1.0
		void bezier(point &dest, const point& a, const point& b, const point& c, const point& d, const float t)
		{
			var ab = lerp(this.controlPoints[0], this.controlPoints[1], t);	//TODO o que raio é t?
			var bc = lerp(this.controlPoints[1], this.controlPoints[2], t);
			var cd = lerp(this.controlPoints[2], this.controlPoints[3], t);
			var abbc = lerp(ab, bc, t);
			var bccd = lerp(bc, cd, t);
			var point = lerp(abbc, bccd, t);
			
			this.positionX = point[0];
			this.positionZ = point[2];
		}
		
		// small test program.. just prints the points
		int main()
		{
			// 4 points define the bezier-curve. These are the points used
			// for the example-images on this page.
			point a = { 40, 100 };
			point b = { 80, 20  };
			point c = { 150, 180 };
			point d = { 260, 100 };
		
			for (int i=0; i<1000; ++i)
			{
			point p;
			float t = static_cast<float>(i)/999.0;
			bezier(p,a,b,c,d,t);
			printf("%f %f\n", p.x, p.y);
			}
		
			return 0;
		}









	}

	push(){

	}

	
}