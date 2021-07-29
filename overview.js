import {displayChart} from './lineplot.js';

function casesOverview(){

    d3.select("#overview-section").style("display","block");
    d3.select("#state-section").style("display","none");
    d3.select("#county-section").style("display","none");
    d3.select("#menus").style("display","none");

    d3.csv('./data/us.csv')
        .then(data => {
            data.forEach(d => {
                d.cases = +d.cases;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                //d.date = new Date(d.date);
        });
        //var max = d3.max(data, function(d) { return d.date; });
        //console.log(data)

    displayChart(data);

    });
};

export {casesOverview}