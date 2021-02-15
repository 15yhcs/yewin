document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getCourse').then(response => response.json()).then(data => loadAllcourse(data));

})
function loadAllcourse(data){
    const courses = document.querySelector('#courseSelect');
    let course_html = "<option selected>Select Course: </option>";
    var i;
 
    for (i=0 ; i<data.data.length; i++){
        course_html += "<option>";
        course_html += data.data[i].courseName;
        course_html += "</option>";
    }

    courses.innerHTML = course_html;
 }


function loadHTMLTable(data){
    const table = document.querySelector('#courseTable tbody');
    let table_html = " ";
    var i;
 
    if (data.data.length === 0){
       table.innerHTML = "<tr><td colspan = 3><strong>The data is empty</strong></td></tr>";
       return;
    }
 
    for (i=0 ; i<data.data.length; i++){
        var p_name = data.data[i].course;
        var rank = i+1;
        var p_id = data.data[i].patient;
        table_html += "<tr>";
        table_html += "<td>" + rank + "</td>";
        table_html += "<td>" + p_id + "</td>";
        table_html += "<td><button type='button' class='btn btn-outline-success my-2 my-sm-0' name='" + p_id + "' id='update_" + p_id + "' onClick='deleteRow(this.name," + rank + "," + p_name + ")'> Delete </button>"
        table_html += "</tr>";
    }

    table.innerHTML = table_html;
 }


const searchNameBtn = document.querySelector("#addBtn");
searchNameBtn.onclick = function(){
   const searchNameValue = document.querySelector("#courseSelect").value;
   
   fetch('http://localhost:5000/courseWaitList/' + searchNameValue).then(response => response.json()).then(data => loadHTMLTable(data));
}




function deleteRow(patientName,rank,courseName){
    const searchNameValue = document.querySelector("#courseSelect").value;
    fetch('http://localhost:5000/deleteRow/' + patientName + '/' + courseName, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    
    fetch('http://localhost:5000/courseWaitList/' + searchNameValue).then(response => response.json()).then(data => loadHTMLTable(data));
}