function create_navigation(){
	
	var div = d3.select('body')
		.insert('div','div')
		.style('width','100%')
		.style('height','30px')
		;
	
	var nav = [['Dataset','dataset_selection'],['Dimensionality Reduction','dimensionality_reduction_selection','dataset'],
				['Cluster selection','test_scatter_flask','D_R'],['Classifier selection','classifier_selection','selection'],['Explanation','Explanation','classifier']];
	
	div.selectAll('button')
		.data(nav)
		.enter()
		.insert('button','button')
		.text((d,i)=>i+1+') '+d[0])
		.on('click',function(d){
			if(d[0]=='Dataset' || url_params[d[2]])
				window.location.href = d[1]+encode_params(url_params)})
		.style('float','right')
		.style('padding','5px')
		.style('margin-right','1.2px')
		.style('background-color',function(d){
			console.log(url_params[d[2]]);
			if(d[0]=='Dataset' || url_params[d[2]])
				return 'white'//#f1f1f1
			else
				return 'black'
			})
		.style('border-radius','10px')
		.style('border','2px solid black')
	
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
					// return({q1, q1, median, median, q3, q3, interQuantileRange, interQuantileRange, min, min, max, max})
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
				// .attr("x1", function(d){console.log("min, "+d.value.min);return(x_scale(d.value.min))})
				// .attr("y1", function(d){return(y_scale(d.key))})
				// .attr("x2", function(d){return(x_scale(d.value.min))})
				// .attr("y2", function(d){return(y_scale(d.key)+y_scale.bandwidth())} )
				// .attr("stroke", "black");
			
			// draw.append("line")
				// .attr("x1", function(d){console.log("max, "+d.value.max);return(x_scale(d.value.max))})
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