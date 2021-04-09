class Scatterplot{
	constructor(id,data,dataset,dr){
		console.log('SCATTER')
		console.log('dataset',dataset)
		this.id = id;
		this.setup(data,dataset,dr);
	}
	
	obj_min(obj){
		let arr = Object.values(obj);
		return Math.min(...arr);
	}
	
	obj_max(obj){
		let arr = Object.values(obj);
		return Math.max(...arr)
	}
	
	setup(data,dataset,dr){
		var self = this;
		
		var margin = {right:0,top:0}
		var text = {bottom: 30, left: 140},
			width = 560,
			height = 400 ;
				
		var p_height = height -margin.top,
			p_width = width - margin.right;


		var div = d3
			.select(this.id)
			.append('div');
		div.append('h4').text(dr+' of '+dataset)

		var svg = div
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform",
			"translate(0," + p_height + ")");
			
		//Background
		svg.append("rect")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "white")
			.attr("transform","translate(0," + (-p_height) + ")");
		

		var x_max = d3.max(data.map((d)=>+d.x)),		
			x_min = d3.min(data.map((d)=>+d.x)),
			y_max = d3.max(data.map((d)=>+d.y)),		
			y_min = d3.min(data.map((d)=>+d.y));
		
		console.log("scale min: "+x_min +" scale max: "+x_max);

		var x_scale = d3.scaleLinear().domain([x_min - Math.abs(x_min)*0.05,x_max+Math.abs(x_max)*0.05]).range([0,p_width]),
			y_scale = d3.scaleLinear().domain([y_min - Math.abs(y_min)*0.05,y_max+Math.abs(y_max)*0.05]).range([0,-p_height]);
		
		
		svg.append('line')
			.style("stroke", "black")
			.style("stroke-width", 2)
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", height)
			.attr("transform","translate(0," + (-p_height) + ")");
		
		svg.append('line')
			.style("stroke", "black")
			.style("stroke-width", 2)
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", width)
			.attr("y2", 0);
		
		var draw = svg.selectAll("circle")
					.data(data)
					.enter()
					.append("circle")
					.style("stroke", "gray")
					.style("fill", function(d){if(d.selected==0){return "blue"} else {return 'yellow'}})
					.attr("r", 3)
					.attr("cx", (d)=>x_scale(d.x))
					.attr("cy", (d)=>y_scale(d.y));
		
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