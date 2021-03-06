function change(Perf,metrics){
		console.log('Change')
		console.log(metrics)
		console.log(Perf)
		
		if(!metrics){
			console.log('no metrics')
			return;
		}
		console.log('metrics not null')
		console.log(Perf.get_classifiers())
		
		if(url_params['classifier_params']=='[]' || Perf.no_default==true || Perf.classifiers == '*'){
			d3.csv('/get_classifier_performances_'+metrics+'-'+Perf.get_classifiers()+encode_params(url_params),function(data){
				console.log('classifier performances')
				console.log(data)
				Perf.draw(data);
			})
		}else {
			d3.csv('/compare_default_'+metrics+'-'+Perf.get_classifiers()+encode_params(url_params),function(data){
				console.log('classifier performances')
				console.log(data)
				Perf.draw(data);
			})
		}
	}

class Performance{
	
	constructor(id,data,classifiers='*',no_default = false,w=560,h=400){
		this.id = id;
		this.data = data;
		
		
		this.no_default = no_default;
		var self = this;
		this.w=+w;
		this.h=+h;
		d3.json('/get_metrics',function(d){
			self.Checkbox = new Checkbox_menu(self.id,d,self)
			self.set_classifiers(classifiers)
			self.draw([])	
			change(self,self.Checkbox.selected());
		});


	}
	
	update(){
		change(this,this.Checkbox.selected());
	}

	draw(data){
		if(!data){
			data =  [];
		}
		d3.select(this.id).selectAll('svg').remove();
		
		this.Checkbox.draw()
		
		// set the dimensions and margins of the graph
		var margin = {top: 10, right: 50, bottom: 30, left: 140},
			width = this.w - margin.left - margin.right,
			height = this.h - margin.top - margin.bottom;
			
		console.log('width, height')
		console.log(width)
		console.log(height)
		// append the svg object to the body of the page
		var svg = d3.select(this.id)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.style('float','left')
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");		
		
		let unique_classifiers = [...new Set(data.map(d => d.classifier))]
		var outerScale = d3.scaleBand()
			.domain(unique_classifiers)
			.range([0, height])
			.paddingInner(0.05)
			.paddingOuter(0.05);
		
		console.log('inner scale set')
		console.log(new Set(data.map(d => d.metric)))
		let unique_metrics = [...new Set(data.map(d => d.metric))]
		var innerScale = d3.scaleBand()
			.domain(unique_metrics)
			.range([0, outerScale.bandwidth()])
			.paddingInner(0.05)
			.paddingOuter(0.05);
		console.log('inner scale metric')
		console.log(innerScale('f1_score'))
			
		var linScale = d3.scaleLinear()
			.domain([0,1])
			.range([0, 400]);

		svg
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('y', function(d) {
				console.log(d)
				console.log(d.metric+' '+innerScale(d.metric))
				return outerScale(d.classifier)+innerScale(d.metric);
			})
			.attr('height', innerScale.bandwidth())
			.attr('width', function(d) {
				console.log(d.classifier+' '+d.value)
				return d.value*400;
			})
			.attr('fill', 'teal')
			.attr('stroke', 'black');
		console.log('unique_classifiers')
		console.log(unique_classifiers)
		if(unique_classifiers.length>1){
			svg
			  .append("g")
			  .attr("transform", "translate(0,0)")// This controls the vertical position of the Axis
			  .call(d3.axisLeft(outerScale));
		}else{
			svg
			  .append("g")
			  .attr("transform", "translate(0,0)")// This controls the vertical position of the Axis
			  .call(d3.axisLeft(innerScale));
		}

		svg
		  .append("g")
		  .attr("transform", "translate(0,"+height+")")// This controls the vertical position of the Axis
		  .call(d3.axisBottom(linScale));

	}
	
	set_classifiers(classifiers){
		this.classifiers=classifiers;
		change(this,this.Checkbox.selected());
	}
	
	get_classifiers(){
		return this.classifiers;
	}
	
	hide(){
		d3.select(this.id).selectAll('svg').remove();
	}
}


class Checkbox_menu{
	constructor(id,data,Perf) {
		this.data = data;
		this.id = id;
		this.Perf = Perf
		this.div = d3.select(id).append('div').style('overflow-y','auto').style('float','left').style('text-align','left')
	}
	
	draw(){
		console.log('Checkbox_draw()');
		var data = this.data;
		var spans = this.div
			.selectAll("span")
			.data(data)
			.enter()
			.append("span");

		var self = this;
		spans.append("input")
			.attr('type',"checkbox")
			.attr('color','red')
			.attr('name', this.id)
			.attr('value', function(d, i) {return d;})
			.attr('checked',true)
			.on("change",function(d,i) {
				//if(self.selected().length>0)
				change(self.Perf,self.selected());
				});

		spans.append("label")
			.text(function(d) {return d;});
			
		spans.append('br');		
	}

	selected(){
		var checked=[];
		d3.selectAll('input[name="'+this.id+'"]:checked').each(function() {
			checked.push(this.value);
			});
		console.log(checked);
		return checked;
	}
}
