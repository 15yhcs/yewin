document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getAlldoc').then(response => response.json()).then(data => loadHTMLTable(data));

})

function loadHTMLTable(data){
    const table = document.querySelector('#docTable tbody');
    let table_html = " ";
    var i;
 
    if (data.data.length === 0){
       table.innerHTML = "<tr><td colspan = 3><strong>The data is empty</strong></td></tr>";
       return;
    }
 
    for (i=0 ; i<data.data.length; i++){
      
      
      table_html += "<tr>";
      table_html += "<td>" + data.data[i].documentID + "</td>";
      table_html += "<td>" + data.data[i].name + "</td>";
      table_html += "<td>" + data.data[i].type + "</td>"; 
      table_html += "</tr>";


       
       
    }
    
    
  
    
    table.innerHTML = table_html;

    
  
 }


