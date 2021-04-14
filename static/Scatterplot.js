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
			width = 370,
			height = 370 ;
				
		var p_height = height -margin.top,
			p_width = width - margin.right;


		var div = d3
			.select(this.id)
			.append('div').style('display','inline-block').style('padding-bottom','30px');
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

		var x_scale = d3.scaleLinear().domain([x_min - Math.abs(x_min)*0.05-0.2,x_max+Math.abs(x_max)*0.05+0.2]).range([0,p_width]),
			y_scale = d3.scaleLinear().domain([y_min - Math.abs(y_min)*0.05-0.2,y_max+Math.abs(y_max)*0.05+0.2]).range([0,-p_height]);
		
		
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
					.attr('id',(d,i)=>i)
					.style("stroke", "gray")
					.style("fill", function(d,i){if(i==10){console.log(d.x),console.log(x_scale(d.x))}if(d.selected==0){return "blue"} else {return 'yellow'}})
					.attr("r", 3)
					.attr("cx", (d)=>x_scale(d.x))
					.attr("cy", (d)=>y_scale(d.y));
		
		
		//mouse selection
		svg.on( "mousedown", function() {
            var p = d3.mouse( this);

            svg.append("rect")            
				.attr('class'  , 'selection')
				.attr('x'  , p[0])
				.attr('y'  , p[1])
				.attr('width'  , 10)
				.attr('height'  , 10);
        })
        .on( "mousemove", function() {
            var s = svg.select( "rect.selection");

            if( !s.empty()) {
                var p = d3.mouse( this);
				
				var d = {
                        x       : +s.attr( "x"),
                        y       : +s.attr( "y"),
                        width   : +s.attr( "width"),
                        height  : +s.attr( "height")
                    };
					
				var move = {
                        x : p[0] - d.x,
                        y : p[1] - d.y
                }
			
				if( move.x < 1 || (move.x*2<d.width)) {
					d.x = p[0];
                    d.width -= move.x;
                } else {
                    d.width = move.x;       
                }

                if( move.y < 1 || (move.y*2<d.height)) {
                    d.y = p[1];
                    d.height -= move.y;
                } else {
                    d.height = move.y;       
                }				
				
				s
					.attr('x'  , d.x)
					.attr('y'  , d.y)
					.attr('width'  , d.width)
					.attr('height'  , d.height);


				svg
					.selectAll("circle")
					.style("fill", function(p,i){
						if(
						 x_scale(p.x) <= d.x+d.width && d.x <= x_scale(p.x)  
						 && y_scale(p.y) <= d.y+d.height && d.y <= y_scale(p.y) 
						 )
						{
							p.selected = 1;
							return 'yellow'
						} 
						else {
							p.selected = 0;
							return "blue"
						}
					});
			}
				
		})
		.on( "mouseup", function() {
			// remove selection frame
			svg.selectAll("rect.selection").remove();
			console.log(svg.selectAll("circle").data().map(a => a.selected))

        });
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