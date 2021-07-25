import {addHtml,showOverviewChart} from './overview.js'

var data= await d3.csv('./data/time_series_covid19_confirmed_US.csv');


function overview() {
    //addHtml();
    console.log(data)
    //showOverviewChart(data);
};

// Event Listener
window.main = overview();