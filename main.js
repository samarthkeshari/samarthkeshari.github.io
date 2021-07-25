import {addHtml,showOverviewChart} from './overview.js'


async function getData() {
    data = await(d3.csv('./data/time_series_covid19_confirmed_US.csv'));
    return data;
    //console.log(data);
};

var data = getData();

function overview() {
    //addHtml();
    console.log(data)
    //showOverviewChart(data);
};

// Event Listener
window.main = overview();