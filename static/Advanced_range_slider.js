class Advanced_range_slider{
	
	constructor(id,name,value,min_value,max_value){
		this.id = id,
		this.name = name;

		this.min_value=+min_value;
		this.max_value = +max_value;

		this.selected_value=+value;

		this.setup();
		this.draw();
	}
			
	setup(){
		var self=this;

		
		this.div = d3.select(this.id)
			.append("div")
			.style("width","fill")
			.style("height","fill");
			
		this.display = this.div.append("h2");
		var range = this.div.append("div").style("width","fill").style("text-align","center");
		this.min_value_label = range.append("label");
		this.slider = range.append("input")
			.attr("type", "range")
			.on("change",function(){self.select_value(parseInt(this.value))});
		this.max_value_label = range.append("label");
		
		var nav = this.div.append("div").style('margin', '0 auto').style("text-align","center");

		nav.append("button")
			.text("<")
			.on("click",()=>self.prev_value());
		
		this.text_input = nav.append("input")
							.attr("type", "text");
		this.text_input.on("keypress", function() {
				if(d3.event.keyCode === 13){
					self.select_value(parseInt(this.value));
					this.value ="";
				}
			  });
		nav.append("button")
			.text(">")
			.on("click",()=>self.next_value());
	}

	draw(){
		
		this.display.text(this.selected_value).style("text-align","center").style('user-select','none');
		
		this.min_value_label.text(this.min_value);
		this.slider
			.attr('min',this.min_value)
			.attr('max',this.max_value)
			.attr('value',this.selected_value)
		
		this.max_value_label.text(this.max_value);								
	}
	
	next_value(){
		if(this.selected_value<this.max_value){
			this.selected_value = this.selected_value+1;
			this.update();
		}
	}
	
	prev_value(){
		if(this.selected_value>this.min_value){
			this.selected_value = this.selected_value-1;
			this.update();
		}
	}

	select_value(value){
		if(value>=this.min_value && value<=this.max_value){
			this.selected_value = value;
			this.update();
		}
	}

	update(){
		this.display.text(this.selected_value);
		this.slider.property("value",this.selected_value);
	}

	selected(){
		return this.selected_value;
	}
	
	set_value(value){
		this.selected_value = +value;
		this.update();
	}
	
}