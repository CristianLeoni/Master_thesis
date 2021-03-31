class Int_parameter{
	
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
			// .style("width","fill")
			// .style("height","fill");
			
		this.display = this.div.append("h4");

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
			// .style("width","fill")
			// .style("height","fill");
			
		this.display = this.div.append("h4");

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