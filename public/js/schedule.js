
function show(data){
    var calendarEl = document.getElementById('calendar');
    var today = new Date();
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2021-02-07',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: data
        
      ,
      dateClick: function() {
        alert('a day has been clicked!');
      }
    });

    calendar.render();

    calendar.on('dateClick', function(info) {
        window.location.href = "ScheduleDetails.html?date=" + info.dateStr;
    });

    console.log(data);
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
            
        }))
    )
}

getAllSessions();



