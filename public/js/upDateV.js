
document.addEventListener('DOMContentLoaded', function(){
    let cur_val = [];
    let queryString = "";
    queryString += decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    for (var i = 0; i < queries.length; i++){
        try {
            var subString_key = queries[i].substring(queries[i].lastIndexOf("=") + 1, queries[i].lastIndexOf(","));
            var subString_val = queries[i].substring(queries[i].lastIndexOf(",") + 1, queries[i].length);
            var query_type = document.getElementById(subString_key).type;
            
            if (query_type === "date"){
                var jsDate = subString_val.substr(0,10);
                document.getElementById(subString_key).value = jsDate;
            }
            else{
                document.getElementById(subString_key).value = subString_val;
            }
        } catch (error) {
            console.log(error);
        }
        
            
    }

})



var update_btn = document.querySelector("#update_btn") 
update_btn.onclick = function() {


    

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            
            PatientNum: document.querySelector("#PatientNum").value,

            Fname: document.querySelector("#Fname").value,

            Lname: document.querySelector("#Lname").value,

            Gender: document.querySelector("#Gender").value,

            Age: document.querySelector("#Age").value,

            Email: document.querySelector("#Email").value,

            Ptype: document.querySelector("#Ptype").value,

            assignedDoc: document.querySelector("#assignedDoc").value,

            MedicalH: document.querySelector("#MedicalH").value,

            Street: document.querySelector("#Street").value,

            city: document.querySelector("#city").value,

            PostalCode: document.querySelector("#PostalCode").value,

            province: document.querySelector("#province").value,

            country: document.querySelector("#country").value,

            EmergencyContactName: document.querySelector("#EmergencyContactName").value,

            EmergencyContactNum: document.querySelector("#EmergencyContactNum").value,

            Salutation: document.querySelector("#Salutation").value,

            mailingName: document.querySelector("#mailingName").value,

            homePhone: document.querySelector("#homePhone").value,

            cellPhone: document.querySelector("#cellPhone").value,

            tStatus: document.querySelector("#tStatus").value,

            tCause: document.querySelector("#tCause").value,

            vstatus: document.querySelector("#vstatus").value,

            a_group: document.querySelector("#a_group").value,

            start_date: document.querySelector("#start_date").value,

            end_date: document.querySelector("#end_date").value,

            extraNote: document.getElementById("extraNote").value
        })
        
        
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}