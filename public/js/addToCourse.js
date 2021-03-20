document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getPatient').then(response => response.json()).then(data => loadHTMLPatientTable(data["data"]));
    fetch('http://localhost:5000/getAllCourse').then(response => response.json()).then(data => loadHTMLCourseTable(data["data"]));

})


// ALL PATIENT TABLE
function loadHTMLPatientTable(data){
   const table = document.querySelector('#patientTable');
   let table_html = " ";
   var i;
   table_html += "<thead class='thead-dark'>";
   table_html += "<tr><th colspan = 4><h3>Patient table</h3></th></tr>"
   table_html += "<tr><th>Name</th><th>Patient num</th><th>Patient type</th><th></th></tr>";
   table_html += "</thead>";

   if (data.length === 0){
      table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
      return;
   }

   table_html += "<tbody>"
   
   for (i=0 ; i<data.length; i++){
      var row_id = data[i].PatientNum;
      table_html += "<tr>";
      table_html += "<td>" + data[i].Fname + "</td>";
      table_html += "<td>" + data[i].PatientNum + "</td>";
      table_html += "<td>" + data[i].Ptype + "</td>";
      table_html += "<td><input type='checkbox' id='"+ row_id + "Checkbox' name='"+ row_id + "Checkbox'  value='"+ row_id +"' onclick=disablePatient(this)></td>"
      table_html += "</tr>";
   }
   table_html += "</tbody>"
   table.innerHTML = table_html;
}


function loadHTMLCourseTable(data){
    const table = document.querySelector('#courseTable');
    let table_html = " ";
    var i;
    table_html += "<thead class='thead-dark'>";
    table_html += "<tr><th colspan = 4><h3>Course table</h3></th></tr>"
    table_html += "<tr><th>Course ID</th><th>Course Name</th><th>Course Spots</th><th></th></tr>";
    table_html += "</thead>";
 
    if (data.length === 0){
       table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
       return;
    }
 
    table_html += "<tbody>"
    
    for (i=0 ; i<data.length; i++){
       var row_id = data[i].c_id;
       table_html += "<tr>";
       table_html += "<td>" + row_id + "</td>";
       table_html += "<td>" + data[i].courseName + "</td>";
       table_html += "<td>" + data[i].courseSpot + "</td>";
       table_html += "<td><input type='checkbox' id='"+ row_id + "CourseCheckbox' name='"+ row_id + "CourseCheckbox'  value='"+ row_id +"' onclick=disableCourse(this)></td>"
       table_html += "</tr>";
    }
    table_html += "</tbody>"
    table.innerHTML = table_html;
 }

 function addToCourse(){
      var selectedPatient = [];
      var selectedCourse = [];
      var results = [];
      var p_table = document.getElementById("patientTable");
      for (let index = 2; index < p_table.rows.length; index++) {
         console.log("1");
            if(p_table.rows[index].cells[3].children[0].checked){
               selectedPatient.push(p_table.rows[index].cells[1].innerHTML);
            }
      }

      var c_table = document.getElementById("courseTable");
      for (let index = 2; index < c_table.rows.length; index++) {
            if(c_table.rows[index].cells[3].children[0].checked){
               selectedCourse.push(c_table.rows[index].cells[0].innerHTML);
            }
      }

      
      for (let i = 0; i < selectedPatient.length; i++) {
         for (let j = 0; j < selectedCourse.length; j++) {
            results.push(`${selectedPatient[i]} ${selectedCourse[j]}`.split(" "));
            
         }
      }

      
      fetch('http://localhost:5000/addIntoCourse', {
         method: 'POST',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify({
            addContent: results
            
         })

      })
     
 }

 function disableCourse(checkItem) { 
   const table = document.getElementById('courseTable');
   for (let index = 2; index < table.rows.length; index++) {
      if(checkItem.checked && table.rows[index].cells[3].children[0].id != checkItem.id){
         table.rows[index].cells[3].children[0].disabled = true
      }
      else{
         table.rows[index].cells[3].children[0].disabled = false
      }
   }
  }

  function disablePatient(checkItem) { 
   const table = document.getElementById('patientTable');
   for (let index = 2; index < table.rows.length; index++) {
      if(checkItem.checked && table.rows[index].cells[3].children[0].id != checkItem.id){
         table.rows[index].cells[3].children[0].disabled = true
      }
      else{
         table.rows[index].cells[3].children[0].disabled = false
      }
      
   }
 }

 const searchedPatientBtn = document.querySelector('#patientIdSelectBtn');

searchedPatientBtn.addEventListener("click", function () {
   const searchedPatient = document.querySelector('#patientIdSelect').value;
   
   
   fetch('http://localhost:5000/getPatient').then(response => response.json()).then(data => {
      for (i=0 ; i<data.data.length; i++){
         if (data.data[i].PatientNum == searchedPatient) {
            loadHTMLPatientTable([data.data[i]]);
         }
         
      }
      
   })
})

const searchedCourseBtn = document.querySelector('#courseIdSelectBtn');

searchedCourseBtn.addEventListener("click", function () {
   const searchedCourse = document.querySelector('#courseIdSelect').value;
   
   
   fetch('http://localhost:5000/getAllCourse').then(response => response.json()).then(data => {
      for (i=0 ; i<data.data.length; i++){
         if (data.data[i].c_id == searchedCourse) {
            loadHTMLCourseTable([data.data[i]]);
         }
         
      }
      
   })
})

function reload() {
   window.location.reload();
}