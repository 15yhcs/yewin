

fetch('http://localhost:5000/getPatient').then(response => response.json()).then(data => loadHTMLTable(data));

// ALL PATIENT TABLE
function loadHTMLTable(data){
   const table = document.querySelector('#patientTable');
   let table_html = " ";
   var i;
   table_html += "<thead class='thead-dark'>";
   table_html += "<tr><th>Name</th><th>Patient num</th><th>Patient type</th><th></th><th></th></tr>";
   table_html += "</thead>";

   if (data.length === 0){
      table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
      return;
   }

   table_html += "<tbody>"
   
   for (i=0 ; i<data.data.length; i++){
      var row_id = data.data[i].PatientNum;
      table_html += "<tr>";
      table_html += "<td>" + data.data[i].Fname + "</td>";
      table_html += "<td>" + data.data[i].PatientNum + "</td>";
      table_html += "<td>" + data.data[i].Ptype + "</td>";
      table_html += "<td><button type='button' class='btn btn-outline-success my-2 my-sm-0' name='" + row_id + "' id='view_" + row_id + "' onClick='reply_click(this.name)'> view </button>"
      table_html += "<td><button type='button' class='btn btn-outline-success my-2 my-sm-0' name='" + row_id + "' id='update_" + row_id + "' onClick='edit_click(this.name)'> edit </button>"
      table_html += "</tr>";
   }
   table_html += "</tbody>"
   table.innerHTML = table_html;
}

//ALL INFO TABLE
function loadAllInfoTable(data){
   const table = document.querySelector('#patientTable');
   let table_html = " ";
   var i;

   table_html += "<thead class='thead-dark'>";
   table_html += "<tr><th>Categories</th><th>Information</th></tr>";
   table_html += "</thead>";
   if (data.length === 0){
      table.innerHTML = "<tr><td colspan = 2><strong>The data is empty</strong></td></tr>";
      return;
   }
   
   
   for (i=0 ; i<Object.keys(data[0]).length; i++){
      table_html += "<tr>";
      table_html += "<td>" + Object.keys(data[0])[i] + "</td><td>" + Object.values(data[0])[i] + "</td>";
      table_html += "</tr>";
   }
   table.innerHTML = table_html;
   
}

function edit_info(data){
   var cur_info = [];
   var i;
   let queryString = "";
   Object.entries(data[0]).forEach(element => {
      cur_info.push(element);
   });
   queryString += "?para1=" + Object.entries(data[0])[0];
   for (i=1; i<cur_info.length; i++){
      queryString += "&para"+ parseInt(i+1) + "=" + cur_info[i];
   }

   

   window.document.location = "/upDateV.html" + queryString;
}

//SEARCHBTN
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

//SEARCHNAME
const searchNameBtn = document.querySelector("#nameSelectBtn");
searchNameBtn.onclick = function(){
   const searchNameValue = document.querySelector("#nameSelect").value;
   
   fetch('http://localhost:5000/searchPname/' + searchNameValue).then(response => response.json()).then(data => loadHTMLTable(data));
   
   
}

//SEARCHID
const searchIdBtn = document.querySelector("#idSelectBtn");
searchIdBtn.onclick = function(){
   const searchIdValue = document.querySelector("#idSelect").value;
   
   fetch('http://localhost:5000/searchPId/' + searchIdValue).then(response => response.json()).then(data => loadHTMLTable(data));
   
   
}

//CLICK VIEW
function reply_click(clicked_id){
   fetch('http://localhost:5000/getAllInfo/' + clicked_id).then(response => response.json()).then(data => loadAllInfoTable(data['data']));
}

//CLICK EDIT
function edit_click(clicked_id){
   // console.log(); document.getElementById("main").setAttribute("src","/upDateV.html");
   fetch('http://localhost:5000/getAllInfo/' + clicked_id).then(response => response.json()).then(data => edit_info(data['data']));
}


