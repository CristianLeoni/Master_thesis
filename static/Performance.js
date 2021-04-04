class Performance{
	
	constructor(id,data){
		this.id = id;
		this.data = data;
		this.draw()
		}
		
	draw(){
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
				  "translate(" + margin.left + "," + margin.top + ")");

		var data = this.data;
		
		
		
		var bandScale = d3.scaleBand()
			.domain(data.map(d => d.classifier))
			.range([0, 200])
			.paddingInner(0.05);

		svg
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('y', function(d) {
				return bandScale(d.classifier);
			})
			.attr('height', bandScale.bandwidth())
			.attr('width', function(d) {
				console.log(d.classifier+' '+d.value)
				return d.value*100;
			});
		svg
		  .append("g")
		  .attr("transform", "translate(0,0)")      // This controls the vertical position of the Axis
		  .call(d3.axisLeft(bandScale));
	}
}
