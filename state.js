import {displayChart} from './lineplot.js';
import {dropdownMenu} from './dropdownMenu.js';

var defaultState = 'Alabama';

//var data;
function displayStates(data) {
    let options = [...new Set(data.map(d => d.state))].sort();
    var selectedData = data.filter(d => { return d.state == defaultState});
    displayChart(selectedData);

    dropdownMenu(d3.select('#menus'),{
        options: options,
        onOptionClicked: state => {
            defaultState = state;
            var selectedData = data.filter(d => { return d.state == state});
            displayChart(selectedData);
        },
        selectedOption:defaultState
    });
}

function casesStates(){

    d3.select("#overview-section").style("display","none");
    d3.select("#state-section").style("display","block");
    d3.select("#county-section").style("display","none");
    d3.select("#menus").style("display","block");

    d3.csv('./data/us-states.csv')
        .then(loadedData => {
            let data = loadedData;
            data.forEach(d => {
                d.cases = +d.cases;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                //d.date = new Date(d.date);


            });
            displayStates(data);
        });
};

export {casesStates,defaultState}