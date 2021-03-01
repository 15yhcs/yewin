

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getSession').then(response => response.json()).then(data => loadAllsession(data));

})
function loadAllsession(data){
    const sessions = document.querySelector('#sessionSelect');
    let session_html = "<option selected>Select Session: </option>";
    var i;
    for (i=0 ; i<data.data.length; i++){
        session_html += "<option>";
        session_html += data.data[i].sessionName + ":" + data.data[i].sessionID + "(" + data.data[i].startTime + "-" + data.data[i].endTime + ")";
        session_html += "</option>";
    }

    sessions.innerHTML = session_html;
 }

 function loadExportData(data){
     var user = JSON.stringify(data);
     console.log(user);
 }

function loadHTMLTable(data){
    const table = document.querySelector('#sessionTable tbody');
    let session_table_html = " ";
    var i;
 
    if (data.data.length === 0){
       table.innerHTML = "<tr><td colspan = 3><strong>The data is empty</strong></td></tr>";
       return;
    }
 
    for (i=0 ; i<data.data.length; i++){
        var p_id = data.data[i].PatientNum;
        var p_name = data.data[i].Fname + "," + data.data[i].Lname;
        var p_contact = data.data[i].cellPhone;
        var p_email = data.data[i].Email;
        session_table_html += "<tr>";
        session_table_html += "<td>" + p_id + "</td>";
        session_table_html += "<td>" + p_name + "</td>";
        session_table_html += "<td>" + p_contact + "</td>";
        session_table_html += "<td>" + p_email + "</td>";
        session_table_html += "</tr>";
    }

    table.innerHTML = session_table_html;
 }


const searchNameBtn = document.querySelector("#searchBtn");
searchNameBtn.onclick = function(){
    const searchNameValue = document.querySelector("#sessionSelect").value;
    const sessionName = searchNameValue.split(':')[1];
    const sessionID = sessionName.substring(0,sessionName.lastIndexOf("("));
    fetch('http://localhost:5000/sessionParticipants/' + sessionID).then(response => response.json()).then(data => loadHTMLTable(data));
}

const toExcelNameBtn = document.querySelector("#toExcelBtn");
toExcelNameBtn.onclick = function(){
    const searchNameValue = document.querySelector("#sessionSelect").value;
    const sessionName = searchNameValue.split(':')[1];
    const sessionID = sessionName.substring(0,sessionName.lastIndexOf("("));
    fetch('http://localhost:5000/sessionParticipants/' + sessionID).then(response => response.json()).then(data => loadExportData(data["data"]));
}


function loadExportData(data){
    var user = JSON.stringify(data);
    
    fetch('http://localhost:5000/export/' + user).then(response => response.json()).then(data => console.log(data));
}