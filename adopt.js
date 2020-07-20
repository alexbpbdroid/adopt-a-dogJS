(function () {
  const margin = { top: 0, left: 0, right: 0, bottom: 0 },
    height = 720 - margin.top - margin.bottom,
    width = 1280 - margin.left - margin.right;

  const svg = d3.select("#map")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //add data (us.json)
  d3.queue()
    .defer(d3.json, "us.json")
    .await(ready)

  // use Albers USA to create to projection and center it
  const projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(1500)

  const path = d3.geoPath()
    .projection(projection)

  function ready(error, data) {
    console.log(data)

    const states = topojson.feature(data, data.objects.states).features
    console.log(states)

    svg.selectAll(".state")
      .data(states)
      .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
  }
})()