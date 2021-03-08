
function show(data,initial_date){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: initial_date,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: data
        
      ,
      dateClick: function(info) {
        alert("View details of: " + info.dateStr);
      },
      
      
    });

    calendar.render();

    calendar.on('dateClick', function(info) {
        window.location.href = "ScheduleDetails.html?date=" + info.dateStr;
    });

};

function getAllSessions(){
    fetch('http://localhost:5000/getSession').then(response => response.json())
    .then(data=>
        
        show(data["data"].map(obj => {
            if(obj.sessionStatus === "Yes"){
              return {
                title: obj.sessionName,
                groupId: obj.sessionId,
                daysOfWeek: obj.repeatDays,
                startRecur: obj.start_date.substring(0,10),
                endRecur: obj.end_date.substring(0,10),
                startTime: obj.startTime,
                endTime: obj.endTime,
                color: "red"
              }
            }
            else{
              return {
                title: obj.sessionName,
                start: obj.start_date.substring(0,10) + "T" + obj.startTime,
                end: obj.end_date.substring(0,10) + "T" + obj.endTime,
                color: "rgb(0,0,0)"
              };
            }
            
        }),getInitial_date())
    )
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
getAllSessions();



