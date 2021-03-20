document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getPatient').then(response => response.json()).then(data => loadHTMLPatientTable(data["data"]));
    fetch('http://localhost:5000/getSession').then(response => response.json()).then(data => loadHTMLSessionTable(data["data"]));

})


// ALL PATIENT TABLE
function loadHTMLPatientTable(data){
   const searchedPatientBtn = document.querySelector('#patientIdSelectBtn');
   searchedPatientBtn.onclick = function () {
      const searchedPatient = document.querySelector('#patientIdSelect').value;
      
   }
   
   
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
      table_html += "<td><input type='checkbox' id='"+ row_id + "Checkbox' name='"+ row_id + "Checkbox'  value='"+ row_id +"'></td>"
      table_html += "</tr>";
      
   }
   table_html += "</tbody>"
   table.innerHTML = table_html;
}


function loadHTMLSessionTable(data){
    const table = document.querySelector('#sessionTable');
    let table_html = " ";
    var i;
    table_html += "<thead class='thead-dark'>";
    table_html += "<tr><th colspan = 4><h3>Session table</h3></th></tr>"
    table_html += "<tr><th>Session ID</th><th>Session Name</th><th>Session Duration</th><th></th></tr>";
    table_html += "</thead>";
 
    if (data.length === 0){
       table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
       return;
    }
 
    table_html += "<tbody>"
    
    for (i=0 ; i<data.length; i++){
       var row_id = data[i].sessionID;
       table_html += "<tr>";
       table_html += "<td>" + row_id + "</td>";
       table_html += "<td>" + data[i].sessionName + "</td>";
       table_html += "<td>" + data[i].start_date + "-" + data[i].end_date + "</td>";
       table_html += "<td><input type='checkbox' id='"+ row_id + "sessionCheckbox' name='"+ row_id + "sessionCheckbox'  value='"+ row_id +"'></td>"
       table_html += "</tr>";
    }
    table_html += "</tbody>"
    table.innerHTML = table_html;
 }

 function addToSession(){
      var selectedPatient = [];
      var selectedSession = [];
      var results = [];
      // var result_int = [];
      var p_table = document.getElementById("patientTable");
      for (let index = 2; index < p_table.rows.length; index++) {
            if(p_table.rows[index].cells[3].children[0].checked){
               selectedPatient.push(p_table.rows[index].cells[1].innerHTML);
            }
      }

      var c_table = document.getElementById("sessionTable");
      for (let index = 2; index < c_table.rows.length; index++) {
            if(c_table.rows[index].cells[3].children[0].checked){
                selectedSession.push(c_table.rows[index].cells[0].innerHTML);
            }
      }

      
      for (let i = 0; i < selectedPatient.length; i++) {
         for (let j = 0; j < selectedSession.length; j++) {
            results.push(`${selectedPatient[i]} ${selectedSession[j]}`.split(" "));
            
         }
      }

      // for (let i = 0; i < results.length; i++) {
      //    var temp = [];
      //    for (let j = 0; j < results[i].length; j++) {
      //       temp.push(parseInt(results[i][j]));
      //    }
      //    result_int.push(temp)
      // }
      
      fetch('http://localhost:5000/addIntoSession', {
         method: 'POST',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify({
            addContent: results
            
         })

      })
     
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

const searchedSessionBtn = document.querySelector('#sessionIdSelectBtn');

searchedSessionBtn.addEventListener("click", function () {
   const searchedSession = document.querySelector('#sessionIdSelect').value;
   console.log(searchedSession);
   
   fetch('http://localhost:5000/getSession').then(response => response.json()).then(data => {
      for (i=0 ; i<data.data.length; i++){
         if (data.data[i].sessionID == searchedSession) {
            loadHTMLSessionTable([data.data[i]]);
         }
         
      }
      
   })
})

function reload() {
   window.location.reload();
}
