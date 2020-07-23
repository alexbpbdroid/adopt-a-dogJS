(function () {
  const width = 760;
  const height = 600;

  const projection = d3.geo.mercator()
    .center([-120,37])
    .translate([width / 2, height / 2])
    .scale([width*3.3]);

  const path = d3.geo.path()
    .projection(projection);

  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json("cb_2014_us_county_5m.json", function(json) {
    console.log(json);
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
        .on("mouseover", function(d){
          const xPos = width / 2 + 150;
          const yPos = height / 2;
          d3.select("#tooltip")
            .style("left", xPos + "px")
            .style("top", yPos + "px")
          d3.select("#county")
            .text(d.properties.NAME);
          d3.select("#tooltip")
            .classed("hidden", false);
        })
        .on("mouseout", function(){
          d3.select("#tooltip").classed("hidden", true)
        })
  })
})()