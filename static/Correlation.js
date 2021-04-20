class Correlation{
	constructor(id,grid,labels){
		this.id = id;
		this.grid = grid;
		console.log('GRID')
		console.log(grid)
		this.labels = grid.columns
		var self = this;
		this.grid = [] 
		d3.nest() // nest function allows to group the calculation per level of a factor
			.rollup(function(d){
				d.columns.forEach(function(col){
					self.grid.push(d.map((g)=>+g[col]))
				})
			})
			.entries(grid)
		console.log('GRID')
		console.log(grid)		
		this.setup();

	}
	
	setup(){
		
		var text_size=140,
		root = d3.select(this.id).append('div')
			.style('width',200+text_size+'px')
			.style('height',200+'px')
			.style('display','inline-block')
			
		root.append('h4').text('Correlation matrix');
		this.div = root.append('div')
			.style('padding','0')
			.style('margin','0')
			.style('height', '100%')
			.style('width','100%')
			//.style('border','2px solid #000')
			.style('overflow-y', 'scroll')
			.style('overflow-x', 'scroll');
			
		var svg = this.div.append('svg'),
			self = this;
			
		console.log((+svg.style("width").slice(0,-2)))

		//Assume square grid
		var map_size = this.grid.length,
			tile_size_x = (+svg.style("width").slice(0,-2))/map_size,
			tile_size_y = (+svg.style("height").slice(0,-2)+text_size)/map_size,
			tile_size = Math.max(Math.max(tile_size_x,tile_size_y),25);

		var offset = tile_size;
		
		svg
			.style('width',offset*map_size+text_size+'px')
			.style('height',offset*map_size+text_size+'px');		
			
		var colorMap = d3.scaleLinear()
			.domain([-1,0,1])
			.range(["tomato", "white", "steelblue"]);


		//add offset for grid start
		svg = svg.append('g').attr('transform','translate('+text_size+',10)');
		
		var myimage_grid = svg
			.selectAll('g')
			.data(this.grid)
			.enter()
			.append('g')
			.attr("transform",(d,i)=>'translate(0,'+(i*offset )+')')
	
		console.log(myimage_grid.data())


		myimage_grid
			.selectAll('g')
			.data((d)=>d)
			.enter()
			.append('rect')
			.attr('fill',(d)=>colorMap(d))
			.attr('width', tile_size)
			.attr('height', tile_size )
			.attr("transform",(d,i)=>'translate('+(i*offset)+',0)');
	
		myimage_grid
			.selectAll('g')
			.data((d)=>d)
			.enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.attr("transform",(d,i)=>'translate('+(i*offset+tile_size/2)+','+(tile_size/2+5)+')')
			.text(function(d) { return d; })
			.style("font-size", tile_size* 0.5+"px");


			
			// dragHandler(svg.selectAll("image"));
			this.offset=offset;
			
		var x = d3.scaleBand()
			.domain(this.labels)
			.range([0, tile_size*map_size]);

		var y = d3.scaleBand()
			.domain(this.labels)
			.range([0, tile_size*map_size]);
		
		svg.append('g')
			.call(d3.axisLeft(y));
		svg.append('g')
			.attr("transform",(d,i)=>'translate(0,'+tile_size*map_size+')')
			.call(d3.axisBottom(x))
			.selectAll('text')
				.attr("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", "rotate(-65)");
		 }
		 
		 get_tile_size(){
			 return this.offset;
		 }
}