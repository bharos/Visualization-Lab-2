
function plot_values(da, type,side, data_type)
{
   
      d3.selectAll("svg").remove();

if(type == 'pca' && data_type == 'random')
{
  data = da.pca_random;
  
}
else if(type == 'pca' && data_type == 'stratified')
{
  data = da.pca_stratified;
  
}

else if(type == 'correlation' && data_type == 'random')
  data = da.random_corr_vals;
else if(type == 'correlation' && data_type == 'stratified')
  data = da.stratified_corr_vals;

else if(type == 'euclidean' && data_type == 'random')
  data = da.random_euclidean_vals;
else if(type == 'euclidean' && data_type == 'stratified')
  data = da.stratified_euclidean_vals;


console.log(data);
  id = '#scatter_plot_'+side;
  console.log(id);


    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
//              .domain([0, d3.max(data, function(d) { return d[0]; })])
              .domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])
              .range([ 0, width ]);

    var y = d3.scale.linear()
//    	      .domain([0, d3.max(data, function(d) { return d[1]; })])
              .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })])
    	      .range([ height, 0 ]);

    var chart = d3.select(id)
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom+25)
	.attr('class', 'chart');

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')

    // draw the x axis
    var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis)
  .append("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "translate(900,0)" )
      .text("PCA1")
      .style('font','20px times');

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -55)
      .attr("dy", ".80em")
      .style("text-anchor", "end")
      .text("PCA2")
      .style('font','20px times');

    var g = main.append("svg:g");

    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) {
           return x(0);
         } )
          .attr("cy", function (d) { 
          return y(0);
          } )
          .attr("r", 4)
          .attr("fill", "steelblue")
                  .transition()
        .duration(2000)
          .attr("cx", function (d,i) { return x(d[0]); } )
        .attr("cy", function(d) {
            return y(d[1]);
          });
}

function scree_plot(da,id)
{   
    var data;

    if(id == '1')
      data  = da.scree_random;
    else if(id == '2')
      data = da.scree_stratified;


    labels = da.labels;

    for(var i=0;i<labels.length;i++)
    {
      for(var j=0;j<labels.length-i-1;j++)
      {
        if(data[j] < data[j+1])
        {
          var temp = data[j];
          data[j] = data[j+1];
          data[j+1] = temp;

          temp = labels[j];
          labels[j] = labels[j+1];
          labels[j+1] = temp;
        }
      }
    }
    var c10 = d3.scale.category10();
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;



var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    // .tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .ticks(10);

var svg = d3.select("#scree_plot_"+id).append("svg")
    .attr("width", width + margin.left + margin.right+50)
    .attr("height", height + margin.top + margin.bottom+50)
  .append("g")
    .attr("transform", 
          "translate(" + (margin.left +20)+ "," + margin.top + ")");



  x.domain(data.map(function(d,i) { return labels[i]; }));
  y.domain([0, d3.max(data, function(d) { return d; })]);

  xa = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    xa.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
      
  xa.append("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "translate(300,100)" )
      .text("Attributes");
     
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("PCA Loadings");

   var lineData =[];

   if(id == '1')
   {
     lineData = [{"x":0,"y":y(4.5)},{"x":width,"y":y(4.5)}];
   }
   else if(id == '2')
     lineData = [{"x":0,"y":y(4.7)},{"x":width,"y":y(4.7)}];

  var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");
var lineGraph = svg.append('path')
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "black")
                           .attr("stroke-width", 2)
                           .attr("fill", "none");  


  var bar_graph  = svg.append("g").
    attr("class",'bar-graph');

  bar_graph.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", c10)
      .attr("x", function(d,i) { return x(labels[i]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d); })
      .attr('class','bar');


var circle_graph  = svg.append("g").
    attr("class",'circle-graph');

   circle_graph.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d,i) {return  x(labels[i]);})
    .attr("cy", function (d) { return y(d); })
    .attr("r", "4px")
    .attr("fill", "red")

var plotline = d3.svg.line()
    .x(function(d,i) { return x(labels[i]); })
    .y(function(d) { return y(d); });


var line_graph  = svg.append("g").
    attr("class",'line-graph');

   line_graph.append("path")
        .attr("class", "line")
        .attr("d", plotline(data));


}

function multi_graph_plot(da,id,type, label)
{
  var data;
  var shift_left = 0, add_size = 0;
  if(id == '1')
  {
    data = da['random_'+type];
  }
  else if(id == '2')
  {
    data = da['stratified_'+type];
  }
  else if(id == '3') //This is for k-means elbow plot
  {
    data = da['elbow_vals'];
    shift_left = 80;
    add_size = 200;
  }

  if(type == 'eigen_vals')
  {

    shift_left = 20;
    add_size = 30;
  }

console.log(data);

    var c10 = d3.scale.category10();
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right +add_size,
    height = 300 - margin.top - margin.bottom + add_size;


var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    // .tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .ticks(10);

var svg = d3.select("#plot_"+id).
    append("svg")
    .attr("width", width + margin.left + margin.right + shift_left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + (margin.left+shift_left) + "," + margin.top + ")");


  x.domain(data.map(function(d,i) { 
    if(id=='3')return i+1;
    return i; 
  }));
  y.domain([0, d3.max(data, function(d) { return d; })]);


  var lineData = [{"x":0,"y":y(1)},{"x":width,"y":y(1)}];

  var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");
var lineGraph = svg.append('path')
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "black")
                           .attr("stroke-width", 2)
                           .attr("fill", "none");  

    var xa = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    

    xa.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "translate(15,25)" );


    xa.append("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "translate(300,55)" )
      .text(function()
        {
          if(type == 'eigen_vals')
              return "ID";

          if(type == 'elbow_vals')
              return "Value of K"; 
        });
     

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", function()
        {
          if(type == 'eigen_vals')
              return "rotate(-90)";

          if(type == 'elbow_vals')
              return "translate(0,0)";
    })
      .attr("y", function()
      {
        if(type == 'eigen_vals')
        {
            return  -50;
        }
        else if(type == 'elbow_vals')
        {
          return 0;
        }
      })
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(label);

  var bar_graph  = svg.append("g").
    attr("class",'bar-graph');

  bar_graph.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", c10)
      .attr("x", function(d,i) { 
        if(id=='3')return x(i+1);
        return x(i); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d); })
      .attr('class','bar');


var circle_graph  = svg.append("g").
    attr("class",'circle-graph');

   circle_graph.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d,i) {
      if(id=='3')return x(i+1)+40;
      return  x(i)+20;})
    .attr("cy", function (d) { return y(d); })
    .attr("r", "4px")
    .attr("fill", "red")

var plotline = d3.svg.line()
    .x(function(d,i) { 
      if(id=='3')return x(i+1)+40;
      return x(i); })
    .y(function(d) { return y(d); });


var line_graph  = svg.append("g").
    attr("class",'line-graph');

   line_graph.append("path")
        .attr("class", "line")
        .attr("d", plotline(data));

}


function scatter_matrix(da,side,labels)
{

d3.selectAll("svg").remove();
  var data = da;
var width = 960,
    size = 200,
    padding = 20;

var x = d3.scale.linear()
    .range([padding / 2, size - padding / 2]);

var y = d3.scale.linear()
    .range([size - padding / 2, padding / 2]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(6);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(6);

var color = d3.scale.category10();
  var domains = {},index,n;

    if(side == "front") //Random samples
      {
        index = [3,11,5];
      
      }
      else
      {
        index = [12,7,10];
      }
        n = index.length;
      

  index.forEach(function(index) {
    domains[index] = d3.extent(data, function(d) { return d[index]; });
  });


  xAxis.tickSize(size * n);
  yAxis.tickSize(-size * n);
console.log(n);

  var svg = d3.select("#plot_"+side).append("svg")
      .attr("width", size * n + padding+ 100)
      .attr("height", size * n + padding + 30)
    .append("g")
    .attr("transform", "translate(0,0)");

  svg.selectAll(".x.axis")
      .data(index)
    .enter().append("g")
      .attr("class", "x axis")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { 
        console.log(x)
        x.domain(domains[d]); 
        d3.select(this).call(xAxis); 
      });

  svg.selectAll(".y.axis")
      .data(index)
    .enter().append("g")
      .attr("class", "y axis")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { y.domain(domains[d]); d3.select(this).call(yAxis); });

  var cell = svg.selectAll(".cell")
      .data(cross(index,index))
    .enter().append("g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);

  // Titles for the diagonal.
  cell.filter(function(d) { return d.i === d.j; }).append("text")
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d,i) { 

        return labels[d.x];
         })
      .style('font','16px times');

  function plot(p) {
    var cell = d3.select(this);

    x.domain(domains[p.x]);
    y.domain(domains[p.y]);

    cell.append("rect")
        .attr("class", "frame")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding);

    cell.selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("cx",function(d){return x(0);})
        .attr("cy",function(d){return y(0);})
        .transition()
        .duration(2000)
        .attr("cx", function(d) { return x(d[p.x]); })
        .attr("cy", function(d) { return y(d[p.y]); })
        .attr("r", 4)
        .style("fill", function(d) { return color(p.x)
          ; });
  }
function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
  return c;
}
}