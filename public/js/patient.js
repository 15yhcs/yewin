

fetch('http://localhost:5000/getPatient').then(response => response.json()).then(data => loadHTMLTable(data));


function loadHTMLTable(data){
   const table = document.querySelector('#patientTable tbody');
   let table_html = " ";
   var i;
   if (data.length === 0){
      table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
      return;
   }


   
   for (i=0 ; i<data.data.length; i++){
      table_html += "<tr>";
      table_html += "<td>" + data.data[i].Fname + "</td>";
      table_html += "<td>" + data.data[i].PatientNum + "</td>";
      table_html += "<td>" + data.data[i].Ptype + "</td>";
      table_html += "</tr>";
   }
   table.innerHTML = table_html;
   
}

const searchBtn = document.querySelector("#addBtn");
searchBtn.onclick = function(){
   const searchValue = document.querySelector("#patientSelect").value;
   if(searchValue === "default"){
      fetch('http://localhost:5000/getPatient').then(response => response.json()).then(data => loadHTMLTable(data));
   }
   else{
      fetch('http://localhost:5000/searchPtype/' + searchValue).then(response => response.json()).then(data => loadHTMLTable(data));
   }
   
}

const searchNameBtn = document.querySelector("#nameSelectBtn");
searchNameBtn.onclick = function(){
   const searchNameValue = document.querySelector("#nameSelect").value;
   
   fetch('http://localhost:5000/searchPname/' + searchNameValue).then(response => response.json()).then(data => loadHTMLTable(data));
   
   
}

const searchIdBtn = document.querySelector("#idSelectBtn");
searchIdBtn.onclick = function(){
   const searchIdValue = document.querySelector("#idSelect").value;
   
   fetch('http://localhost:5000/searchPId/' + searchIdValue).then(response => response.json()).then(data => loadHTMLTable(data));
   
   
}

