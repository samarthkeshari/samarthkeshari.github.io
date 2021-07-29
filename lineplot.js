// set the dimensions and margins of the graph
/*
var margin = {top: 20, right: 20, bottom: 110, left: 110},
    margin2 = {top: 430, right: 20, bottom: 30, left: 110},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;
*/

var margin = {top: 20, right: 20, bottom: 110, left: 150},
    margin2 = {top: 330, right: 20, bottom: 30, left: 150},
    width = 1400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    height2 = 400 - margin2.top - margin2.bottom;

function displayChart(data){

  d3.selectAll('svg').remove();

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
      .append("svg")
          .attr("width", 1500)
          .attr("height", 500);

  // Add X axis --> it is a date format

  var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

  var xAxis = d3.axisBottom(x)
                .ticks(10)
                .tickPadding(10)
                .tickFormat(d3.timeFormat("%m/%d/%y"));

  var xAxis2 = d3.axisBottom(x)
                .ticks(10)
                .tickPadding(10)
                .tickFormat(d3.timeFormat("%m/%d/%y"));

  var yAxis = d3.axisLeft(y)
                .tickPadding(10)
                .tickFormat(d3.format("~s"));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.cases; })]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  ///
  var wave1Date = '2020-10-21';
  var wave2Date = '2021-07-20';

  const wave1Line = svg
    .append("g")
    .append("rect")
    .attr("class", "wave1")
    .attr("stroke-width", "1px")
    .attr("fill","maroon")
    .attr("width", "2px")
    .attr("height", height)
    .attr("x",x(new Date(wave1Date)));

  const wave2Line = svg
    .append("g")
    .append("rect")
    .attr("class", "wave2")
    .attr("stroke-width", "1px")
    .attr("fill","maroon")
    .attr("width", "2px")
    .attr("height", height)
    .attr("x",x(new Date(wave2Date)));

  const wave1Text = svg.append("g")
    .append("text")
    .attr("class", "wave1Text")
    .attr("font-size",15)
    .attr("x",x(new Date(wave1Date))-50)
    .attr("y", 20 )
    .text("US WAVE-1");

  const wave2Text = svg.append("g")
    .append("text")
    .attr("class", "wave2Text")
    .attr("font-size",15)
    .attr("x",x(new Date(wave2Date))-50)
    .attr("y", 20)
    .text("US WAVE-2");
  /////

  var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

  var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

  var area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.cases); });

  var area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.cases); });

  svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

  var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


  /////
  focus.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  focus.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  focus.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
    .append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -height / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text('Cases');

  context.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area2);

  context.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);

  context.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, x.range());

  svg.append("rect")
    .attr("class", "zoom")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

  /////
  const bounds = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");
  const listeningRect = bounds
    .append("rect")
    .attr("class", "listening-rect")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", onMouseMove)
    .on("mousemover", onMouseMove)
    .on("mouseleave", onMouseLeave);

  const tooltipLine = bounds
    .append("g")
    .append("rect")
    .attr("class", "dotted")
    .attr("stroke-width", "1px")
    .attr("width", ".5px")
    .attr("height", height);

  const dateParser = d3.timeFormat("%-m/%-d/%y");
  ////

  /////////////
  function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
      var s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      focus.select(".area").attr("d", area);
      focus.select(".axis--x").call(xAxis);
      svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
          .scale(width / (s[1] - s[0]))
          .translate(-s[0], 0));

      d3.select(".wave1").attr("x",x(new Date(wave1Date)));
      d3.select(".wave2").attr("x",x(new Date(wave2Date)));

      d3.select(".wave1Text").attr("x",x(new Date(wave1Date))-100);
      d3.select(".wave2Text").attr("x",x(new Date(wave2Date))-100);
    };

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
      var t = d3.event.transform;
      x.domain(t.rescaleX(x2).domain());
      focus.select(".area").attr("d", area);
      focus.select(".axis--x").call(xAxis);
      context.select(".brush").call(brush.move, x.range().map(t.invertX, t));

      d3.select(".wave1").attr("x",x(new Date(wave1Date)));
      d3.select(".wave2").attr("x",x(new Date(wave2Date)));
      d3.select(".wave1Text").attr("x",x(new Date(wave1Date))-200);
      d3.select(".wave2Text").attr("x",x(new Date(wave2Date))-200);
    };

    /////

    function onMouseMove(){
      const mousePosition = d3.mouse(this);
      const hoveredDate = x.invert(mousePosition[0]);

      const closestIndex = data.findIndex(d => dateParser(d.date)===dateParser(hoveredDate));
      const closestDataPoint = data[closestIndex];
      //console.log(closestIndex-1,closestIndex,closestDataPoint.cases,data[closestIndex-1].cases);

      const closestXValue = closestDataPoint.date;
      //const closestYValue = closestDataPoint.cases;
      const closestYValue = data[closestIndex].cases;
      const closestZValue = closestDataPoint.deaths;

      //const formatDate = d3.timeFormat("%B %A %-d, %Y");
      const formatDate = d3.timeFormat("%-m/%-d/%y");

      tooltip.select("#date").text(formatDate(closestXValue));
      tooltip.select("#cases").html(closestYValue);
      tooltip.select("#deaths").html(closestZValue);

      tooltip.style("left", (d3.event.pageX-55) + "px")
              .style("top", (d3.event.pageY+10) + "px")


      tooltip.style("opacity", 1);
      tooltipLine.style("opacity", 1);

      //tooltipCircle
      //  .attr("cx", x(closestXValue))
      //  .attr("cy", y(closestYValue))
      //  .style("opacity", 1);

      tooltipLine.attr("x", x(closestXValue));

    };

    function onMouseLeave(){
      tooltip.style("opacity", 0);
//      tooltipCircle.style("opacity", 0);
      tooltipLine.style("opacity", 0);
    };

  const tooltip = d3.select("#tooltip");
  //const tooltipCircle = svg.append("g")
  //    .append("circle")
  //    .attr("class", "tooltip-circle")
  //    .attr("r", 6)
  //    .attr("stroke", "red")
  //    .attr("fill", "white")
  //    .attr("stroke-width", 3)
  //    .style("opacity", 0);
/////

};



export {displayChart};