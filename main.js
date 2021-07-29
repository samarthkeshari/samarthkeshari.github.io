import {casesOverview} from './overview.js';
import {casesStates} from './state.js';
import {casesCounties} from './county.js';

var current_slide =1;
var previous_slide =0;

function previousButtonClick(){
    const prevButton = document.getElementById("P");
    const nextButton = document.getElementById("N");

    if (current_slide === 3){
        current_slide = 2
        previous_slide = 1;
        nextButton.disabled = false;

        casesByStates();

    } else if (current_slide === 2){
        current_slide = 1
        previous_slide = 0;
        nextButton.disabled = false;
        prevButton.disabled = true;

        overview();

    } else if (current_slide === 1){
        previous_slide = 0;
    };
};

function nextButtonClick(){
    const prevButton = document.getElementById("P");
    const nextButton = document.getElementById("N");

    previous_slide = current_slide;
    current_slide = current_slide + 1

    if (current_slide === 3){
        nextButton.disabled = true;
        casesByCounty();
    };
    prevButton.disabled = false;

    // Call the neccessary function
    if (current_slide === 2){
        casesByStates();
    };
};

function overview() {
    //addHtml();
    const prevButton = document.getElementById("P");
    prevButton.disabled = true;
    casesOverview();
};

function casesByStates() {
    menus.textContent = "Select State    ";
    casesStates();
};

function casesByCounty() {
    menus.textContent = "Select County  ";
    casesCounties();
};

// Event Listener
window.main = overview();
//window.main = casesByStates();
document.getElementById("P").onclick = previousButtonClick;
document.getElementById("N").onclick = nextButtonClick;