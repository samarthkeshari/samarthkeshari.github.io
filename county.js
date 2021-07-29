import { displayChart } from './lineplot.js';
import { dropdownMenu } from './dropdownMenu.js';

var defaultCounty = 'California,Los Angeles';
var data = 0;


function displayCounties() {
    let options = [...new Set(data.map(d => d.county))].sort();
    var selectedData = data.filter(d => { return d.county == defaultCounty});
    displayChart(selectedData);

    dropdownMenu(d3.select('#menus'),{
        options: options,
        onOptionClicked: county => {
            var selectedData = data.filter(d => { return d.county == county});
            displayChart(selectedData);
        }
    });
}

function casesCounties(){

    d3.select("#overview-section").style("display","none");
    d3.select("#state-section").style("display","none");
    d3.select("#county-section").style("display","block");

    d3.select("#menus").style("display","block");

    if (data===0){
    d3.csv('./data/us-counties.csv')
        .then(loadedData => {
            data = loadedData;
            data.forEach(d => {
                d.county = d.state + ',' + d.county;
                d.cases = +d.cases;
                d.deaths = +d.deaths;
                d.date = new Date(d.date);


            });
            displayCounties();
        });
    }
    else {
        displayCounties();};
};

export {casesCounties}