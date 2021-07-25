function addHtml(){
    d3.select('#textSection').html("<h3>Overview</h3>");
    d3.select('#svgSection').html("<svg width=1000 height=800></svg>");
};

function showOverviewChart(data){
    var xlogScale = d3.scaleLog().base(10).domain([10,150]).range([0,200]);
    var ylogScale = d3.scaleLog().base(10).domain([10,150]).range([200,0]);

    d3.select('svg').append('g').attr('transform','translate(50,50)')
    .selectAll('circle').data(data).enter().append('circle')
    .data(data)
    .attr('cx',function(d,i){return xlogScale(parseInt(d.AverageCityMPG))})
    .attr('cy',function(d,i){return ylogScale(parseInt(d.AverageHighwayMPG))})
    .attr('r',function(d,i){return parseInt(d.EngineCylinders)+2});

    d3.select('svg').append('g').attr('transform','translate(50,50)')
                    .call(d3.axisLeft(ylogScale)
                    .tickValues([10, 20, 50, 100])
                    .tickFormat(d3.format("~s")));


    d3.select('svg').append('g').attr('transform','translate(50,750)')
                    .call(d3.axisBottom(xlogScale)
                    .tickValues([10, 20, 50, 100,200])
                    .tickFormat(d3.format("~s")));
};

export {addHtml,showOverviewChart}