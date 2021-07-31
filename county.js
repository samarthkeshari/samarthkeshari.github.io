import { displayChart } from './lineplot.js';
import { dropdownMenu } from './dropdownMenu.js';
import { data } from './main.js';
import { defaultState } from './state.js';

var defaultCounty = 0;

function displayCounties() {
    //let options = [...new Set(data.map(d => d.county))].sort();
    //var selectedData = data.filter(d => { return d.county == defaultCounty});

    var stateData = data.filter(d => { return d.state == defaultState});
    let options = [...new Set(stateData.map(d => d.county))].sort();

    if (defaultCounty==0) {
        defaultCounty=options[0];
    };

    var selectedData = data.filter(d => { return d.county == defaultCounty});
    console.log(options[0]);
    displayChart(selectedData);

    dropdownMenu(d3.select('#menus'),{
        options: options,
        onOptionClicked: county => {
            defaultCounty = county;
            var selectedData = data.filter(d => { return d.county == county});
            displayChart(selectedData);
        },
        selectedOption:defaultCounty
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
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                //d.date = new Date(d.date);


            });
            displayCounties();
        });
    }
    else {
        displayCounties();};
};

export {casesCounties}