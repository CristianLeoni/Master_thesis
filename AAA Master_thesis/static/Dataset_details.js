class Dataset_details{
	
	constructor(id,data){
		this.id = id;
		this.data = data;
		console.log(data)
		this.draw()
		}
				
	draw(){
				
		var description = d3.select(this.id);
		
		description.selectAll('h2').remove()
		description.selectAll('p').remove()
		
		description.append("h2").text(this.data[0])

		description.selectAll('p')
			.data(this.data.slice(1))
			.enter()
			.append('p')
			.text((d)=>d)
			.append('br');
	}
	
	update(d){
		var self = this;
		d3.json('/dataset_'+d+'_details',function(d){
			self.data = d;
			self.draw()
		})

	}
}
