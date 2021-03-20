document.addEventListener("DOMContentLoaded", () => {
    var queryString = decodeURIComponent(window.location.search); 
    var user_id = queryString.substring(1);
    document.querySelector("#admin").innerHTML = "Hi admin:  " + user_id
    fetch('http://localhost:5000/getPatientStartDate').then(response => response.json()).then(data => anniversary(data["data"]));
})



function anniversary(data) { 
    var current_date = getInitial_date();
    var anniversary;
    for (let i = 0; i < data.length; i++) {
        if (data[i].start_date.substring(5,10) == current_date.substring(5,10)) {
            
            anniversary = parseInt(current_date.substring(0,4)) - parseInt(data[i].start_date.substring(0,4))
            anniversaryUser = data[i].Fname + " " + data[i].Lname;
            let ul = document.querySelector("#anniversary")
            let li = document.createElement("li")
            let span_user = document.createElement("span")
            span_user.setAttribute("style", "text-decoration: underline;")
            span_user.appendChild(document.createTextNode(" Patient  " + anniversaryUser + "  is having a " + anniversary + " year anniversaries"))
            li.appendChild(span_user)
            li.setAttribute("id", i);
            ul.appendChild(li);
        }
        
    }
}

function getInitial_date(){
    var today = new Date();
    var today_year = today.getFullYear();
    var today_month = today.getMonth() + 1;
    var today_day = today.getDate();
    if(today_day<10) today_day='0'+today_day;
    if(today_month<10) today_month='0'+today_month;
    var initial_date = today_year + '-' + today_month + '-' + today_day;
    return initial_date;
}

