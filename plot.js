function plot_values(filename) {
    
    filename = "./data2/" + filename;
    svg.selectAll("*").remove();
    
    color = ["008C00","C3D9FF"];
    // Load data
//    d3.csv(filename, function(error, data) {
//        data.forEach(function(d) {
//            d.r1 = +d.r1;
//            d.r2 = +d.r2;
//            d.type = +d.type;
//        });


        var xValueR = function(d) { return d.r1;};
        var yValueR = function(d) { return d.r2;};
        
        xScale.domain([d3.min(data, xValueR), d3.max(data, xValueR)]);
        yScale.domain([d3.min(data, yValueR), d3.max(data, yValueR)]);
        
        
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, "+(h-pad)+")")
          .call(xAxis)
          // .append("text")
          // .attr("x", (w-pad - 50))
          //   // .attr("y", (h-pad))
          //   // .attr("dy", ".5em")
          //   .style("text-anchor", "middle")
          //   .text("Component B")
            ;
 
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate("+(left_pad-pad)+", 0)")
          .call(yAxis);

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-80)
        .attr("x",h-400)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Component A");

        svg.append("text")
        //.attr("transform", "rotate(-20)")
        .attr("y", left_pad+170)
        .attr("x",h+450)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Component B");


        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return xScale(d.r1);
            }) 
            .attr("cy", function(d){
                return yScale(d.r2);
            }) 
            .style("fill", function(d) {
                return color[d.type-1];
            })
            .attr("stroke", "black")
            //.attr("stroke-width", function(d) {return d/2;});
            ;
    });

}
