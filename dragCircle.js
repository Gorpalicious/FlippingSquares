// set the dimensions and margins of the graph
var width = 450;
var height = 450;

// append the svg object to the body of the page
var svg = d3
	.select('#my_dataviz')
	.append('svg')
	.attr('width', 450)
	.attr('height', 450);

// create dummy data -> just one element per circle
var data = [
	{ name: 'A' },
	// { name: 'B' },
	// { name: 'C' },
	// { name: 'D' },
	// { name: 'E' },
	// { name: 'F' },
	// { name: 'G' },
	// { name: 'H' },
];

// Initialize the circle: all located at the center of the svg area
var node = svg
	.append('g')
	.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
	.attr('cx', 450)
	.attr('cy', 450)
	.attr('r', 25)
	.style('fill', '#19d3a2')
	.style('fill-opacity', 0.3)
	.attr('stroke', '#b3a2c8')
	.style('stroke-width', 4)
	.call(
		d3
			.drag() // call specific function when circle is dragged
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended)
	);

// Features of the forces applied to the nodes:
var simulation = d3.forceSimulation().force(
	'center',
	d3
		.forceCenter()
		.x(width / 2)
		.y(height / 2)
); // Attraction to the center of the svg area
// .force('charge', d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
// .force(
// 	'collide',
// 	d3
// 		.forceCollide()
// 		.strength(0.1)
// 		.radius(30)
// 		.iterations(1)
// ); // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation.nodes(data).on('tick', function(d) {
	node
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		});
});

// What happens when a circle is dragged?
function dragstarted(d) {
	// if (!d3.event.active) simulation.alphaTarget(0.03).restart();
	d.fx = d.x;
	d.fy = d.y;
}
function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}
function dragended(d) {
	// if (!d3.event.active) simulation.alphaTarget(0.03);
	d.fx = null;
	d.fy = null;
}
