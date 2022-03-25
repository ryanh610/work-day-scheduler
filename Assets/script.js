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
var currentHour = 13;

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