class Int_parameter{
	
	constructor(id,name,default_value,min_value,max_value){
		this.id = id,
		this.name = name;
		this.changed = false;
		this.min_value=+min_value;
		this.max_value = +max_value;

		this.selected_value=default_value;
		
		if(!default_value){
			this.selected_value='None';
		}		

		this.setup();
		this.draw();
	}
			
	setup(){
		var self=this;
		this.div = d3.select(this.id)
			.append("div")
			.style( 'float','left')
			.style('border','1px solid black')
			.style("width","fill")
			.style("height","fill")
			.style("text-align","center");
			
		this.display = this.div.append("h4").style('margin','4px');
		this.div.append("h5").text('<integer>').style('margin','2px');
		
		this.text_input = this.div.append("input")
							.attr("type", "text")
							.attr('value',this.selected_value);
		console.log(this.name+' : '+this.selected_value)
							
		this.text_input.on("click", function() {this.value ='';});
		this.text_input.on("mouseout", function() {
				self.select_value(this.value);
				console.log('selected value: '+self.selected_value)
				this.value =self.selected_value;
			;});
		this.text_input.on("keypress", function() {
				if(d3.event.keyCode === 13){
					self.select_value(this.value);
					console.log('selected value: '+self.selected_value)
					this.value =self.selected_value;
				}
			  });
	}

	draw(){
		
		this.display.text(this.name).style("text-align","center").style('user-select','none');							
	}

	select_value(value){
		console.log('changing value: '+value+' - '+this.selected_value)
		if((!this.min_value || value>=this.min_value) && (!this.max_value || value<=this.max_value)){
			const parsed = parseInt(value);
			if (isNaN(parsed)){
				console.log('parsinf error:'+value+" - "+parsed);
				return 0;
			}
			this.selected_value = parsed;
			this.changed = true;
			if(this.listener){
				this.listener.event_update()
			}
		}
	}

	selected(){
		return this.selected_value;
	}
	
	set_listener(listener){
		this.listener = listener;
		console.log('this.listener');
		console.log(this.listener);
		return this;
	}
}

class Float_parameter{
	
	constructor(id,name,default_value,min_value,max_value){
		this.id = id,
		this.name = name;
		this.changed = false;
		
		this.min_value=+min_value;
		this.max_value = +max_value;

		this.selected_value=+default_value;
		if(!default_value){
			this.selected_value='None';			
		}
		this.setup();
		this.draw();
	}
			
	setup(){
		var self=this;		
		this.div = d3.select(this.id)
			.append("div")
			.style( 'float','left')
			.style('border','1px solid black')
			.style("text-align","center");
			// .style("width","fill")
			// .style("height","fill");
			
		this.display = this.div.append("h4").style('margin','4px');
		this.div.append("h5").text('<float>').style('margin','2px');
		var nav = this.div.append("div").style('margin', '0 auto').style("text-align","center");
		
		this.text_input = nav.append("input")
							.attr("type", "text")
							.attr('value',this.selected_value);
							
		this.text_input.on("click", function() {this.value ='';});
		this.text_input.on("mouseout", function() {
				self.select_value(this.value);
				console.log('selected value: '+self.selected_value)
				this.value =self.selected_value;
			;});
		this.text_input.on("keypress", function() {
				if(d3.event.keyCode === 13){
					self.select_value(this.value);
					console.log('selected value: '+self.selected_value)
					this.value =self.selected_value;
				}
			  });
	}

	draw(){
		
		this.display.text(this.name).style("text-align","center").style('user-select','none');							
	}

	select_value(value){
		console.log('changing value: '+value+' - '+this.selected_value)
		if((!this.min_value || value>=this.min_value) && (!this.max_value || value<=this.max_value)){
			const parsed = parseFloat(value);
			if (isNaN(parsed)){
				console.log('parsinf error:'+value+" - "+parsed);
				return 0;
			}
			this.selected_value = parsed;
			this.changed = true;
			if(this.listener){
				this.listener.event_update()
			}
		}
	}

	selected(){
		return this.selected_value;
	}
	
	set_listener(listener){
		this.listener = listener;
		return this;
	}
	
}

class Categorical_chooser{
	
	constructor(id,name,default_value,values,update_function){
		console.log('name+default_value+values')

		console.log(name+default_value+values)
		this.id = id,
		this.name = name;
		this.changed = false;
		this.selected_value = default_value;
		this.values = values;
		this.update_function = update_function;
		
		this.draw();


	}
			
	draw(){
		var self = this;
		this.div = d3.select(this.id)
			.append("div")
			.attr('class','dropdown')
			// .style('margin','20px')
			// .style('width','fill')
			// .style('height','fill')
			.style( 'float','left')
			.style('border','1px solid black')
			.style("text-align","center")

		this.display = this.div.append("h4").style('margin','4px').text(this.name).style("text-align","center").style('user-select','none');
		this.div.append("h5").text('<categorical>').style('margin','2px');
		
		
	
		var button = this
			.div.append("input")
			.attr("type", "button")
			.attr("value", this.selected_value)
			.attr('class',"btn btn-secondary dropdown-toggle")
		
		var temp =this.div.append("div").attr('class',"dropdown-menu").style( 'display','none').style('background-color','rgba(255, 255, 255,1)').style('border', '1px solid black');

		button
			.on("click", function(d){
					if(temp.style('display').localeCompare('block') == 0)
						{
							temp.style('display','none')							
						} 
					else 
						{
							temp.style('display','block')
							d3.select(temp).raise();
						}
			});

		temp.selectAll('.menu_option')
			.data(this.values)
			.enter()
			.append('div')			
			.text((d)=>d)
			.on("click", function(d){
				self.changed = true;
				if(self.listener){
					self.listener.event_update();
				}
				self.selected_value = d; 
				temp.attr('display','none');
				button.attr('value',d);
				temp.style('display','none');
				});				
	}
	
	selected(){
		return this.selected_value;
	}
	
	set_listener(listener){
		this.listener = listener;
		return this;
	}
	
}

class Parameter_grid{
	constructor(id,data,update_function){
		this.parameters = []
		this.id = id;
		this.data = data;
		this.update_function = update_function;
	}
	
	update(data){
		this.data = data;
		this.parameters = []
		d3.select(this.id).style('display','grid').selectAll('div').remove()
		this.draw();
	}
	
	draw(){
		var self = this;
		this.data.forEach(function(d){
					console.log(d)
					if(d[0]==='categorical'){
						console.log('categorical')
						self.parameters.push(new Categorical_chooser(self.id,d[1],d[2],d[3]).set_listener(self));
					}
					if(d[0]==='int'){
						console.log('int')
						self.parameters.push(new Int_parameter(self.id,d[1],d[2]).set_listener(self));
					}
					if(d[0]==='float'){
						console.log('float')
						self.parameters.push(new Float_parameter(self.id,d[1],d[2],d[3]).set_listener(self));
					}
				});
	}
		
	get_selected(){
		var selected=[];
		this.parameters.forEach(function(d){
			// console.log(d.name+':'+d.changed+':'+d.selected())
			if(d.changed==true){
				selected.push([d.name,d.selected()])
			}
		});
		return selected;
	}
	
	hide(){
		d3.select(this.id).style('visibility',"hidden").selectAll('div').remove();
	}
	
	show(){
		d3.select(this.id).style('visibility',"visible").selectAll('div').remove();
	}
	
	event_update(){
		console.log('good udpate')
		if(this.update_function){
			this.update_function();
		}
	}
}