class Histogram{
	
	constructor(id,data){
		this.id = id;
		this.data = data;
		this.listeners = [];
		this.draw()
		}
		
	draw(){
		var self = this;
		// set the dimensions and margins of the graph
		var margin = {top: 0, right: 30, bottom: 30, left: 0},
			width = 460 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svg = d3.select(this.id)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
		
			
		var data = this.data;
		
		var interest_cols =data.columns;
			
		var x_max = d3.max(interest_cols,(col)=>d3.max(data.map((g)=>+g[col]))),	
			x_min = d3.min(interest_cols,(col)=>d3.min(data.map((g)=>+g[col])));

		// X axis: scale and draw:
		var x = d3.scaleLinear()
		  .domain([x_min - Math.abs(x_min)*0.05-0.2,x_max+Math.abs(x_max)*0.05+0.2])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
		  .range([0, width]);
		svg.append("g")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x));
		//Background
		svg.append("rect")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "white");
		console.log(data.length)
		// set the parameters for the histogram
		var histogram = d3.histogram()
		  .value(function(d) { return +d; })   // I need to give the vector of value
		  .domain(x.domain()) // then the domain of the graphic
		  .thresholds(x.ticks(Math.sqrt(data.length))); // then the numbers of bins

		console.log(histogram);
		var bins =[]
		var histat = d3.nest() // nest function allows to group the calculation per level of a factor
			.rollup(function(d){
				d.columns.forEach(function(col){
					var bin = histogram(d.map(function(g) {return g[col];}));
					var max_bin_height = d3.max(bin, function(d) { return d.length; });
					bins.push({key:col, bin:bin, max: max_bin_height})//.replace("=","_").replace("(","_").replace(")","_").replace(".","_").replace("/","_")
				})
			})
			.entries(data)
			
		console.log(bins);
		// And apply twice this function to data to get the bins.
		
		var outer_scale = d3.scaleBand()
			.domain(bins.map((b)=>b.key))
			.range([height,0])
			.paddingInner(0.05)
			.paddingOuter(0.05);
			
		// Y axis: scale and draw:
		var y = d3.scaleLinear()
		  .range([0,outer_scale.bandwidth()]);
		  y.domain([0, d3.max(bins, (d)=> d.max)]);   // d3.hist has to be called before the Y axis obviously

		svg.append("g")
		  .call(d3.axisLeft(outer_scale));

		var col_array = ['#ff0000','#ffbf00','#689f38']
		bins.forEach((b,i)=>
			svg
			  .append('g')
			  .selectAll("rect")//bins.indexOf(b)
			  .append('line')
			  .data(b.bin)
			  .enter()
			  .append("rect")
				.attr("x", (d)=>x(d.x0))//
				.attr("y", (d)=>outer_scale(b.key)+outer_scale.bandwidth()-y(d.length))
				//.attr("transform", (d)=> "translate(" + x(d.x0) + "," + y(d.length) + ")")
				.attr("width", (d)=> x(d.x1) - x(d.x0) -1 )
				.attr("height", (d)=>y(d.length)+1)
				.style("fill", '#69b3a2')//col_array[i]
				.style("opacity", 0.8)
				.on('click',(d)=>console.log(b.key))
		)
		

		// var rectsArr = Array.prototype.slice.call(svg.selectAll("rect")._groups[0])
		// rectsArr.sort((b,a)=>a.__data__.length-b.__data__.length).forEach((r)=>d3.select(r).raise())
		
		
	
		//Invisible on click 
	
		svg.append('g')
			.selectAll('rect')
			.data(bins.map((b)=>b.key))
			.enter()
			.append("rect")
				.attr("y", (d)=>outer_scale(d))
				.attr("x", 0)
				.attr("width", width)
				.attr("height", (d)=>outer_scale.bandwidth()+1)
				.attr('fill','black')
				.style("opacity", 0)
				.on('click',function(d){
					console.log(d);
					self.trigger_change(d)
				});
	}


	trigger_change(val){
		this.listeners.forEach((l)=>l.listener_change(val))
	}
	
	listen(obj){
		this.listeners.push(obj);
	}
}





		// bins.forEach((b,i)=>
			// svg.selectAll("."+b.key)
			  // .data(b.bin)
			  // .enter()
			  // .append("rect")
				// .attr("x", 1)
				// .attr("transform", (d)=> "translate(" + x(d.x0) + "," + y(d.length) + ")")
				// .attr("width", (d)=> x(d.x1) - x(d.x0) -1 )
				// .attr("height", (d)=> height - y(d.length))
				// .style("fill", col_array[i])
				// .style("opacity", 1)
		
		// Handmade legend
		// svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
		// svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
		// svg.append("text").attr("x", 320).attr("y", 30).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
		// svg.append("text").attr("x", 320).attr("y", 60).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")