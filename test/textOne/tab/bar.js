// function Bar(){
// 			this.bar=document.querySelector('.bar')
// 		}
// 		Bar.prototype={
// 		 	init:function(){
// 		 		let me=this;
// 				console.log(me.bar)
// 		 	},
// 		 	create:function(){
// 		 		let me=this;
// 		 	}
// 		}
class Bar {
	constructor() {
		this.width = 500
		this.height = 400,
			this.bar = document.querySelector('.bar')
		this.dataset = [500, 300, 240, 200, 190]
		this.rectHeight = 50;
		this.flag = true;
	}
	create() {
		let me = this;
			me.svg = d3.select(me.bar).append('svg')
				.attr('width', me.width)
				.attr('height', me.height)
				.selectAll('rect')
				.data(me.dataset)
				.enter()
				.append('rect')
				.attr('x', 50)
				.attr('y', function (d, i) {
					return i * me.rectHeight
				})
				.attr('width', function (d) {
					console.log(d)
					return d;
				})
				.attr('height', me.rectHeight - 2)
				.attr('fill', 'blue')
		

	}
}