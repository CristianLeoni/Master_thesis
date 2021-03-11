class Performance_wheel{
	
	constructor(id,data){
		this.id = id;
		this.data = data;
		this.draw()
		}
				
	draw(){
		var performance = 1;
		
		// set the dimensions and margins of the graph
		var margin = {top: 10, right: 30, bottom: 30, left: 40},
			width = 460 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svg = d3.select(this.id)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform",
				  "translate(" + width/2 + "," + height/2 + ")");

		var data = this.data;
		
		var hand_scale = d3.scaleLinear()
			.range([-Math.PI/2,Math.PI/2])
			.domain([0,1]);
		
		var arcGenerator = d3.arc();
		var outerRadius= 100
		
		// Generate background
		var pathData = arcGenerator({
		  startAngle: hand_scale(0),
		  endAngle: hand_scale(1),
		  innerRadius: 50,
		  outerRadius: outerRadius
		});
		
		svg
			.append('path')
			.attr('d', pathData)
			.style('fill','#039be5 ');

		
		// Generate aim zone
		pathData = arcGenerator({
		  startAngle: hand_scale(0.8),
		  endAngle: hand_scale(0.95),
		  innerRadius: 50,
		  outerRadius: outerRadius
		});
		
		svg
			.append('path')
			.attr('d', pathData)
			.style('fill','#9ccc9c ');


		// Generate performance indicator
		pathData = arcGenerator({
		  startAngle: hand_scale(0)-0.025,
		  endAngle: hand_scale(0)+0.025,
		  innerRadius: 48,
		  outerRadius: outerRadius*0.8
		  // 1.01
		});
		
		var indicator=svg
			.append('g');
			
		indicator.append('path')
			.attr('class','performance')
			.attr('d', pathData)
			.style('fill','red');
			
		indicator.transition()
			.attr("transform",  "rotate(" + (performance-0.003)*180+ ")")
			.duration(1000)
			.ease(d3.easeBackOut.overshoot(1));
	}
}
