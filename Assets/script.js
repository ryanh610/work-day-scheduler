// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

var nine = $('#9')
var ten = $('#10')
var eleven = $('#11')
var twelve = $('#12')
var thirteen = $('#13')
var fourteen = $('#14')
var fifteen = $('#15')
var sixteen = $('#16')
var seventeen = $('#17')
var times = [nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen];
var buttons = $('.btn')
var textBox = $('.entryBox')

var currentDay = moment().format("[Today is] dddd, MMMM Do");
$("#currentDay").text(currentDay);
var currentHour = moment().format("H");

times.forEach(timeTable);

function timeTable(value) {
    if (Number(value[0].dataset.time) < currentHour) {
        value.attr("style", "background-color: gray");
    }
    else if (Number(value[0].dataset.time) === currentHour) {
        value.attr("style", "background-color: red");
    }
    else if (Number(value[0].dataset.time) > currentHour) {
        value.attr("style", "background-color: green");
    }
};

function submission(event) {
    var content = {
        time: 0,
        entry: ""
    };
    content.time = event.target.parentElement.dataset.time;
    content.entry = event.target.parentElement.children[1].value;
    var entries = localStorage.getItem("entries");
    if (entries === undefined || entries === null) {
        localStorage.setItem("entries", JSON.stringify([content]));
    }
    else {
        entries = JSON.parse(entries);
        // iterate through the entries list for the matching time that we have,
        // if it does exist, then modify it within the array
        // OR if it does exist, then remove it, and then append the new one
        var wasFound = false;
        for (var i = 0; i < entries.length; i++) {
            if (content.time === entries[i].time) {
                entries[i].entry = content.entry;
                wasFound = true;
                break;
            }
        }

        if (!wasFound) {
            entries.push(content);
        }

        localStorage.setItem("entries", JSON.stringify(entries));
    }
};

buttons.on("click", submission);
textBox.submit(submission);

// Run once on refresh
// get item entries
// if it is undefined, dont do anything
// if it is a list, then iterate through the list, and populate the respective DOM objects
function refresh() {
    var entries = localStorage.getItem("entries");
    if (entries === undefined) {
        return;
    }
    else {
        entries = JSON.parse(entries);
        for (var i = 0; i < entries.length; i++) {
            var timesIndex = entries[i].time-9;
            times[timesIndex][0].children[1].value = entries[i].entry;
        }
    }
};

refresh()