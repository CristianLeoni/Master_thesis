function change(Perf,metrics){
		console.log('Change')
		console.log(metrics)
		console.log(Perf)
		
		if(!metrics){
			console.log('no metrics')
			return;
		}
		console.log('metrics not null')
		d3.csv('/get_classifier_performances_'+metrics+''+encode_params(url_params),function(data){
			console.log('classifier performances')
			console.log(data)
			Perf.draw(data);
		})
	}

class Performance{
	
	constructor(id,data){
		this.id = id;
		this.data = data;

		
		var self = this;
		d3.json('/get_metrics',function(d){
			self.Checkbox = new Checkbox_menu(self.id,d,self)
			self.draw([])
		});
	}

	draw(data){
		if(!data){
			data = this.data;
		}
		d3.select(this.id).selectAll('svg').remove();
		
		this.Checkbox.draw()
		
		// set the dimensions and margins of the graph
		var margin = {top: 10, right: 30, bottom: 30, left: 40},
			width = 460 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

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
		svg
		  .append("g")
		  .attr("transform", "translate(0,0)")// This controls the vertical position of the Axis
		  .call(d3.axisLeft(outerScale));

		svg
		  .append("g")
		  .attr("transform", "translate(0,"+height+")")// This controls the vertical position of the Axis
		  .call(d3.axisBottom(linScale));

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
				this.div = d3.select(id).append('div').style('overflow-y','auto').style('float','left')
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
					.on("change",function(d,i) {change(self.Perf,self.selected());});

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
