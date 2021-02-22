var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function searchYear() {
    var year = document.getElementById("year-input").value;
    if (!isNaN(year)) {
        var value = parseInt(year);
        if (value < 0 || value > 2021) {
            alert("Invalid input of year!");
        } else {
            document.getElementById("year-header").innerHTML = year;
        }
    } else {
        alert("The format of input is wrong!");
    }
}

function searchMonth() {
    var month = document.getElementById("month-input").value;
    if (!isNaN(month)) {
        var value = parseInt(month);
        if (value < 0 || value > 12) {
            alert("Invalid input of month!");
        } else {
            document.getElementById("month-header").innerHTML = month;
        }
    } else {
        alert("The format of input is wrong!");
    }
}

function gotoDate(day) {
    var year = document.getElementById("year-header").innerText;
    var monthString = document.getElementById("month-header").innerText;
    var month = getMonth(monthString);
    // window.location.href = "ScheduleDetails.html?date="+year+"-"+getFormatNumber(month)+"-"+getFormatNumber(day);
    window.location.href = "ScheduleDetails.html?year="+year+"&month="+month+"&day="+day;
}

function getFormatNumber(number) {
    if (number >= 10) {
        return number+"";
    } else {
        return "0"+number;
    }
}

function getMonth(month) {
    for (let index = 0; index < months.length; index++) {
        const element = months[index];
        if (element == month) {
            return index+1;
        }
    }
}