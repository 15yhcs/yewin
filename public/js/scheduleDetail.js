
let queryString = "";
queryString += decodeURIComponent(window.location.search);
var selectedDate =JSON.stringify(queryString.substring(queryString.lastIndexOf("=")+1, queryString.length));
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getSession').then(response => response.json()).then(data => loadHTMLTable(data['data'],selectedDate));
})

function loadHTMLTable(data,selectedDate,searchValue,searchName) {
    
    const table_head = document.querySelector('#scheduleTable thead tr');
    const table = document.querySelector('#scheduleTable tbody');
    let table_html = " ";
    var i;
    var keys = Object.keys(data[0]);
    
    
    if (data.length === 0){
        table.innerHTML = "<tr><td colspan = 5><strong>The data is empty</strong></td></tr>";
        return;
    }

    for (i=0 ; i<keys.length; i++){
        var para = document.createElement("th");
        var node = document.createTextNode(keys[i]);
        para.appendChild(node);
        table_head.appendChild(para);
    }
    var repeat_dates_array = [];
    for (i=0 ; i<data.length; i++){
        if(data[i].sessionStatus === "Yes"){
            var repeat_dates = JSON.parse(data[i].repeatDates);
            for (var index = 0; index < repeat_dates.length-1; index++) {
                if(repeat_dates[index].substring(0,10) == JSON.parse(selectedDate)){
                    repeat_dates_array.push(data[i]);
                }
                
            }
        }
        else{
            if(data[i].start_date.substring(0,10) == JSON.parse(selectedDate)){
                repeat_dates_array.push(data[i]);
            }
        }
        
    }

    if(searchValue === undefined && searchName === undefined){
        for (i=0 ; i<repeat_dates_array.length; i++){
            table_html += "<tr>";
            var object_val = Object.values(repeat_dates_array[i]);
            for (let index = 0; index < object_val.length; index++) {
                
                table_html += "<td>" + object_val[index] + "</td>";
            }
            table_html += "</tr>";
        }
        table.innerHTML = table_html;
    }
    else if(searchValue != undefined && searchName === undefined){
        for (i=0 ; i<repeat_dates_array.length; i++){
            if(repeat_dates_array[i].sessionID == searchValue){
                table_html += "<tr>";
                var object_val = Object.values(repeat_dates_array[i]);
                for (let index = 0; index < object_val.length; index++) {
                
                    table_html += "<td>" + object_val[index] + "</td>";
                }
                table_html += "</tr>";
            }
            
        }
        table.innerHTML = table_html;
    }
    else if(searchValue === undefined && searchName != undefined){
        for (i=0 ; i<repeat_dates_array.length; i++){
            if(repeat_dates_array[i].sessionName.toUpperCase() == searchName.toUpperCase()){
                table_html += "<tr>";
                var object_val = Object.values(repeat_dates_array[i]);
                for (let index = 0; index < object_val.length; index++) {
                
                    table_html += "<td>" + object_val[index] + "</td>";
                }
                table_html += "</tr>";
            }
            
        }
        table.innerHTML = table_html;
    }
}

var searchIdButton = document.querySelector("#searchIDBtn")
searchIdButton.onclick = function(){
    document.querySelector('#scheduleTable thead tr').innerHTML = "";
    document.querySelector('#scheduleTable tbody').innerHTML = "";
    var user_search_id = document.getElementById("searchSession").value;
    console.log(user_search_id);
    fetch('http://localhost:5000/getSession').then(response => response.json()).then(data => loadHTMLTable(data['data'],selectedDate,user_search_id,undefined));
    
}

var searchIdButton = document.querySelector("#SearchNameBtn")
searchIdButton.onclick = function(){
    document.querySelector('#scheduleTable thead tr').innerHTML = "";
    document.querySelector('#scheduleTable tbody').innerHTML = "";
    var user_search_Name = document.getElementById("searchName").value;
    fetch('http://localhost:5000/getSession').then(response => response.json()).then(data => loadHTMLTable(data['data'],selectedDate,undefined,user_search_Name));
    
}


function reload(){
    window.location.reload();
}