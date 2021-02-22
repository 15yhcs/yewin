function gotoCreate() {
    window.location.href = "createSession.html";
}

function goBack() {
    window.location.href = "Schedule.html";
}

function loadHTMLTable(data) {
    const table = document.querySelector('#schedule-detail-table tbody');
    let table_html = " ";
    var i;
 
    if (data.data.length === 0){
       table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
       return;
    }
 
    for (i=0 ; i<data.data.length; i++){
        var startTime = data.data[i].startTime;
        var endTime = data.data[i].endTime;
        var rank = i+1;
        table_html += "<tr>";
        table_html += "<td> Session " + rank + "</td>";
        table_html += "<td> StartTime:" + startTime + " EndTime: "+ endTime + " </td>";
        table_html += "</tr>";
    }

    table.innerHTML = table_html;
}

function searchSession() {
    var thisURL = document.URL;      
    var getval =thisURL.split('?')[1];    
    var yearVal = getval.split("&")[0];
    var year = yearVal.split("=")[1];
    var monthVal = getval.split("&")[1];
    var month = monthVal.split("=")[1];
    var dayVal = getval.split("&")[2];
    var day = dayVal.split("=")[1];
    fetch('http://localhost:5000/getSession/' + year + '/' + month + '/' + day).then(response => response.json()).then(data => loadHTMLTable(data));
}



