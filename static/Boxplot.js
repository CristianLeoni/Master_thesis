class Boxplot{
	constructor(id,data){
		this.id = id;
		this.setup(data);
	}
	
	obj_min(obj){
		let arr = Object.values(obj);
		return Math.min(...arr);
	}
	
	obj_max(obj){
		let arr = Object.values(obj);
		return Math.max(...arr)
	}
	
	setup(data){
		var self = this;
		
		var margin = {right:10,top:10}
		var text = {bottom: 30, left: 40},
			width = 460,
			height = 400 ;
				
		var p_height = height - text.bottom -margin.top,
			p_width = width - text.left -margin.right;

		// append the svg object to the body of the page
		var svg = d3
			.select(this.id)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform",
			"translate("+text.left+"," + p_height + ")");
		
		var arrays = []
		var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
			.rollup(function(d){
				d.columns.forEach(function(col){
					var q1 = d3.quantile(d.map(function(g) {return +g[col];}).sort(d3.ascending),0.25)
					var median = d3.quantile(d.map(function(g) { return +g[col];}).sort(d3.ascending),0.5)
					var q3 = d3.quantile(d.map(function(g) { return +g[col];}).sort(d3.ascending),0.75)
					var interQuantileRange = q3 - q1
					var min = q1 - 1.5 * interQuantileRange
					var max = q3 + 1.5 * interQuantileRange
					arrays.push({key:col,q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
				})
			})
			.entries(data)

		var x_max = d3.max(arrays,a=>a.max),		
			x_min = d3.min(arrays,a=>a.min);
		
		console.log("scale min: "+x_min +" scale max: "+x_max);

		var x_scale = d3.scaleLinear().domain([x_min - Math.abs(x_min)*0.05,x_max+Math.abs(x_max)*0.05]).range([0,p_width]),
			y_scale = d3.scaleBand().domain(data.columns).range([0,-p_height]).paddingInner(0.05).paddingOuter(0.05);	

		//draw axis
		svg.append("g").call(d3.axisLeft(y_scale));
		svg.append("g").call(d3.axisBottom(x_scale));
		
		
		var draw = svg
			.selectAll("boxplot")
			.data(arrays)
			.enter().append("g").attr("id",(d)=>d.col);
		
		//draw rectangles
		draw.append("rect")
				.attr("y", function(d){return(y_scale(d.key))})
				.attr("x", function(d){return(x_scale(d.q1))})
				.attr("width", function(d){return (x_scale(d.q3)-x_scale(d.q1))})
				.attr("height", y_scale.bandwidth() )
				.attr("stroke", "black")
				.style("fill", "#69b3a2");
		//draw middle line
		draw.append("line")
				.style("stroke-dasharray", ("3, 3"))
				.attr("x1", function(d){return(x_scale(d.max))})
				.attr("y1", function(d){return(y_scale(d.key)+y_scale.bandwidth()/2)})
				.attr("x2", function(d){console.log(d.min+" "+x_scale(d.min));return(x_scale(d.min))})
				.attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth()/2)} )
				.attr("stroke", "black");
		
		//draw wiskers
		draw.append("line")
			.attr("x1", function(d){console.log("min: "+d.min);return(x_scale(d.min))})
			.attr("y1", function(d){return(y_scale(d.key)+y_scale.bandwidth()*0.2)})
			.attr("x2", function(d){return(x_scale(d.min))})
			.attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth()*0.8)} )
			.attr("stroke", "black");
		
		draw.append("line")
			.attr("x1", function(d){console.log("max: "+d.max);return(x_scale(d.max))})
			.attr("y1", function(d){return(y_scale(d.key)+y_scale.bandwidth()*0.2)})
			.attr("x2", function(d){return(x_scale(d.max))})
			.attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth()*0.8)} )
			.attr("stroke", "black");
		
		//draw median
		draw.append("line")
				.attr("x1", function(d){return(x_scale(d.median))})
				.attr("y1", function(d){return(y_scale(d.key))})
				.attr("x2", function(d){return(x_scale(d.median))})
				.attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth())} )
				.attr("stroke", "black");			
	}
}
























// OLD CODE


		// //For each box evaluate parameters
		// data.columns.forEach(function(element){
			// //evaluate parameters
			// var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
				// .key(()=>element)
				// .rollup(function(d) {
					// var q1 = d3.quantile(d.map(function(g) {return +g[element];}).sort(d3.ascending),0.25)
					// var median = d3.quantile(d.map(function(g) { return +g[element];}).sort(d3.ascending),0.5)
					// var q3 = d3.quantile(d.map(function(g) { return +g[element];}).sort(d3.ascending),0.75)
					// var interQuantileRange = q3 - q1
					// var min = q1 - 1.5 * interQuantileRange
					// var max = q3 + 1.5 * interQuantileRange
					// return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
				// })
				// .entries(data)
						
			// var draw = svg
				// .selectAll("boxplot")
				// .data(sumstat)
				// .enter().append("g").attr("id",element);
			
			
			// //draw rectangles
			// draw.append("rect")
					// .attr("y", function(d){return(y_scale(d.key))})
					// .attr("x", function(d){return(x_scale(d.value.q1))})
					// .attr("width", function(d){return (x_scale(d.value.q3)-x_scale(d.value.q1))})
					// .attr("height", y_scale.bandwidth() )
					// .attr("stroke", "black")
					// .style("fill", "#69b3a2");
			// //draw middle line
			// draw.append("line")
					// .attr("x1", function(d){return(x_scale(d.value.max))})
					// .attr("y1", function(d){return(y_scale(d.key)+y_scale.bandwidth()/2)})
					// .attr("x2", function(d){console.log(d.value.min+" "+x_scale(d.value.min));return(x_scale(d.value.min))})
					// .attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth()/2)} )
					// .attr("stroke", "black");
			
			// //draw wiskers
			// draw.append("line")
				// .attr("x1", function(d){console.log("min: "+d.value.min);return(x_scale(d.value.min))})
				// .attr("y1", function(d){return(y_scale(d.key))})
				// .attr("x2", function(d){return(x_scale(d.value.min))})
				// .attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth())} )
				// .attr("stroke", "black");
			
			// draw.append("line")
				// .attr("x1", function(d){console.log("max: "+d.value.max);return(x_scale(d.value.max))})
				// .attr("y1", function(d){return(y_scale(d.key))})
				// .attr("x2", function(d){return(x_scale(d.value.max))})
				// .attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth())} )
				// .attr("stroke", "black");
			
			// //draw median
			// draw.append("line")
					// .attr("x1", function(d){return(x_scale(d.value.median))})
					// .attr("y1", function(d){return(y_scale(d.key))})
					// .attr("x2", function(d){return(x_scale(d.value.median))})
					// .attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth())} )
					// .attr("stroke", "black");
					
		// });