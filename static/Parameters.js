class Int_parameter{
	
	constructor(id,name,default_value,min_value,max_value){
		this.id = id,
		this.name = name;

		this.min_value=+min_value;
		this.max_value = +max_value;

		this.selected_value=default_value;
		
		if(!default_value){
			this.selected_value='None';			
		}
		console.log(this.selected_value)
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
		}
	}

	selected(){
		return this.selected_value;
	}
	
}

class Float_parameter{
	
	constructor(id,name,default_value,min_value,max_value){
		this.id = id,
		this.name = name;

		this.min_value=+min_value;
		this.max_value = +max_value;

		this.selected_value=+default_value;
		if(!default_value){
			this.selected_value='None';			
		}
		console.log(this.selected_value)
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
		}
	}

	selected(){
		return this.selected_value;
	}
	
}

class Categorical_chooser{
	
	constructor(id,name,default_value,values){
		console.log('name+default_value+values')

		console.log(name+default_value+values)
		this.id = id,
		this.name = name;

		this.selected = default_value;
		this.values = values;

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
			.attr("value", this.selected)
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
						}
			});

		temp.selectAll('.menu_option')
			.data(this.values)
			.enter()
			.append('div')			
			.text((d)=>d)
			.on("click", function(d){self.selected = d; temp.attr('display','none');button.attr('value',d);temp.style('display','none')});				
	}
	
	get_selected(){
		return this.selected;
	}
	
}