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
			.style('margin','20px')
			.style('width','fill')
			.style('height','fill')
			.style( 'float','left')
			
		var button = this
			.div.append("input")
			.attr("type", "button")
			.attr("value", this.selected)
			.attr('class',"btn btn-secondary dropdown-toggle")

		
		var temp =this.div.append("div").attr( 'display','none').attr('class',"dropdown-menu")

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