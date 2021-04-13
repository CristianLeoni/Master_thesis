class Explanation_container{
	constructor(id,data){
		this.data = data;
		this.id = id;
		this.setup();
	}
	
	setup(){
		var id = this.id.replace('#','_');

		this.exp_div = d3.select(this.id).append('div').attr('id','exp_cont'+id).style('width','100%');		
		this.hist_div = d3.select(this.id).append('div').attr('id','hist_cont'+id).style('width','100%');
		//.style('visibility','hidden')		

		this.box = new Boxplot('#exp_cont'+id,this.data);
		this.hist = new Histogram('#exp_cont'+id,this.data);
		this.box.listen(this)
	}
	
	listener_change(value){
		this.draw_single_hist(value)
	}
	
	draw_single_hist(col){
		var self = this;
		this.exp_div.style('visibility','hidden');
		d3.json('get_hist_'+col+''+encode_params(decode_parameters()),function(data){
			self.binary_histogram(data,col);
		});
		this.exp_div.style('visibility','visible');

	}
	
	binary_histogram(data,col){
		console.log('data');
		console.log(data);
		var margin = {top: 30, right: 30, bottom: 30, left: 30},
			width = 400 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom;

		var root =this.hist_div.append('div')
			.style('display','inline-block');

		root.append('h3').text(col);
		var svg = root
			.append('svg')
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
		
		//Background
		svg.append("rect")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "white")
			.on('click',function(){console.log('remove');root.remove()});
				
		var x_range_0 = d3.extent(data['0'],(s)=>+s)
		var x_range_1 = d3.extent(data['1'],(s)=>+s)
		var x_range = d3.extent(x_range_0.concat(x_range_1))		
		var x_min=x_range[0],
			x_max=x_range[1];
		
		var x = d3.scaleLinear()
			.domain([x_min - Math.abs(x_min)*0.5,x_max+Math.abs(x_max)*0.5])
			.range([0,width])
		
		var histogram = d3.histogram()
		  .value(function(d) { return +d; })   // I need to give the vector of value
		  .domain(x.domain()) // then the domain of the graphic
		  .thresholds((d)=>x.ticks(Math.sqrt(d.length))); // then the numbers of bins

		var bin_0 = histogram(data['0'].map(function(g) {return g;}));
		var max_bin_height_0 = d3.max(bin_0, function(d) { return d.length; });
		
		var bin_1 = histogram(data['1'].map(function(g) {return g;}));
		var max_bin_height_1 = d3.max(bin_1, function(d) { return d.length; });


		console.log('max_bin_heights');
		console.log(max_bin_height_0);
		console.log(max_bin_height_1);

		var y = d3.scaleLinear()
			.domain([0,d3.max([max_bin_height_0,max_bin_height_1])])
			.range([0,height])

		svg
			  .append('g')
			  .selectAll("rect")//bins.indexOf(b)
			  .data(bin_0)
			  .enter()
			  .append("rect")
				.attr("x", (d)=>x(d.x0))//
				.attr("y", (d)=>height-y(d.length))
				//.attr("transform", (d)=> "translate(" + x(d.x0) + "," + y(d.length) + ")")
				.attr("width", (d)=> x(d.x1) - x(d.x0) )
				.attr("height", (d)=>y(d.length)+1)
				.style("fill", 'blue')
				.style("opacity", 0.4)
				
		svg
			  .append('g')
			  .selectAll("rect")//bins.indexOf(b)
			  .data(bin_1)
			  .enter()
			  .append("rect")
				.attr("x", (d)=>x(d.x0))//
				.attr("y", (d)=>height-y(d.length))
				//.attr("transform", (d)=> "translate(" + x(d.x0) + "," + y(d.length) + ")")
				.attr("width", (d)=> x(d.x1) - x(d.x0) )
				.attr("height", (d)=>y(d.length)+1)
				.style("fill", 'yellow')
				.style("opacity", 0.4);
		
		var mock_y = d3.scaleLinear()
			.domain([d3.max([max_bin_height_0,max_bin_height_1]),0])
			.range([0,height])
			
		svg.append("g")
		  .call(d3.axisLeft(mock_y));
		svg.append("g")
			.attr("transform", (d)=> "translate(0," + height + ")")
		  .call(d3.axisBottom(x));

		svg.on('click',()=>d3.select(svg).remove())
	}
	
}