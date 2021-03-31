class Menu{
	
	constructor(id,data,callback){
		this.id = id;
		this.data = data;
		console.log(data)
		this.callback=callback;
		this.draw()
		}
				
	draw(){		
		var self = this;
		
		var menu_holder = d3.select(this.id);
		
		
		var menu_item = menu_holder.selectAll('div')
			.data(this.data)
			.enter()
			.append('div')
			.attr('class','menu_entry')
			.attr('id',(d)=>d)
			.on("click", function(d) {
				console.log(d);
				self.select(d);
			})
			.append('p')
			.text((d)=>d)
			
	}
	
	select(d){
		d3.select(this.id).select('#'+this.selected).style('background-color','#f1f1f1');
		d3.select(this.id).select('#'+d).style('background-color','orange');
		this.selected = d;
		this.callback();
	}
	
	get_selected(){
		return this.selected;
	}
}


class OLD_Menu{
	
	constructor(id,data,callback){
		this.id = id;
		this.data = data;
		console.log(data)
		this.callback=callback;
		this.draw()
		}
				
	draw(){		
		var self = this;
		
		var menu_holder = d3.select(this.id);
		
		
		var menu_item = menu_holder.selectAll('div')
			.data(this.data)
			.enter()
			.append('div')
			.attr('class','menu_entry')
			.attr('id',(d)=>d[0])
			.on("click", function(d) {
				console.log(d[0]);
				self.select(d[0]);
			})
			
		menu_item.selectAll('p')
			.data((d)=>d)
			.enter()
			.append('p')
			.text((d)=>d)
			.append('br');
	}
	
	select(d){
		d3.select(this.id).select('#'+this.selected).style('background-color','#f1f1f1');
		d3.select(this.id).select('#'+d).style('background-color','orange');
		this.selected = d;
		this.callback();
	}
	
	get_selected(){
		return this.selected;
	}
}
