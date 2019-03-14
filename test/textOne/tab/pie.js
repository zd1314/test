class Pie {
	constructor(x, y) {
		this.width = 300
		this.height = 300,
			this.pie = document.querySelector('.pie')
		this.data = [30, 10, 43, 55, 13];
		this.innerRadius = this.width / 4;
		this.outerRadius = this.height / 4;
		this.color = ['#FF1493', '#BA55D3', '#7B68EE', '#AFEEEE', '#FFD700']
		this.m = Math.PI;
		// this.colorList=d3.scaleOrdinal(d3.schemeCategory10)

	}
	create() {
		let me = this;
		// 创建svg
		me.svg = d3.select(this.pie).append('svg')
			.attr('width', me.width)
			.attr('height', me.height)
			.attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
		let pie = d3.pie()
		let pieData = pie(me.data)
		//弧生成器
		let arcs = d3.arc()
			.innerRadius(me.innerRadius)
			.outerRadius(me.outerRadius + 40)
		let arcChange = d3.arc()
			.innerRadius(me.innerRadius)
			.outerRadius(me.outerRadius + 60)
		//定义一个g	
		let g = me.svg.append('g')
			.attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
		let arcPath = g.append('g').attr('class', 'arcPath')
		//包含很多g 每个小g里边有一个path一个text
		let slices = arcPath.selectAll('g').data(pieData).enter().append('g')
			//鼠标滑过让每个path半径变大
			.on('mouseover', function () {
				d3.select(this).select('path').transition().attr('d', function (d) {
					return arcChange(d)
				})
			})
			//鼠标离开让每个path回到原来
			.on('mouseout', function () {
				d3.select(this).select('path').transition().attr('d', function (d) {
					return arcs(d)
				})
			})
		//path
		let path = slices.append('path')
			.attr("fill", function (d, i) {
				return me.color[i]
				// return me.colorList(i)
			})
			.attr("d", function (d) {
				return arcs(d);
			});
		//text
		let text = slices.append("text")
			//arcs.centroid() 弧的中心点
			.attr("transform", function (d) {
				let x = arcs.centroid(d)[0]
				let y = arcs.centroid(d)[1]
				return `translate(${x} ${y})`;
			})
			.attr("text-anchor", "middle")
			.text(function (d) {
				return d.data;
			});
		//画label
		let lines = g.append('g').attr('class', 'lines')
		let line = lines.selectAll('line').data(pieData)
			.enter()
			.append('line')
			.attr('')
		//画label
		let label = g.append('g').attr('class', 'label')
	}
}