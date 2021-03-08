const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const https = require("https");
const moment = require("moment");
const up_file = require("express-fileupload")
const out_excel = require("xlsx");



const app = express();
const DBService = require("./DB");
const path = require("path");
const { log } = require("console");
const { type } = require("os");
const { json } = require("body-parser");


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(up_file());





app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/index.html"));
});

// app.get("/",function(req,res){
//     res.sendFile(path.join(__dirname + "/signIn.html"));
// });

// app.get("/index",function(req,res){
//     res.sendFile(path.join(__dirname + "/index.html"));
// });

// app.get("/main",function(req,res){
//     res.sendFile(path.join(__dirname + "/public/main.html"));
// });

app.post("/login",function(req,res){
    var user = req.body.user;
    var psw = req.body.psw;
    // cannot log in without entering both username & psw
    if (user && psw){
        const db = DBService.getDbServiceInstance();
        const result = db.searchAdmin(user,psw);
        result.then( data =>{
            if(data.length > 0){
                console.log("login sucessed");
                res.redirect('/index');
            }
            else{
            console.log("login failed");
            // retry
            res.redirect('/');
            }
        }).catch(error => console.log(error));
    }
    else{
        res.redirect('/');
    }
})

app.post("/createProfile",function(req,res){
    var patientNum = req.body.patientNum;
    var salutation = req.body.salutation;
    var firstName = req.body.Fname;
    var LastName = req.body.Lname;
    var Mname = req.body.Mname;
    var Pphone = req.body.Pphone;
    var Cphone = req.body.Cphone;
    var email = req.body.Email;
    var tStatus = req.body.tStatus;
    var tcause = req.body.Tcause;
    var birthday = req.body.birthday; 
    var Gender = req.body.gender;
    var age = req.body.age;
    var verteran = req.body.verteran;
    var assignedDoc = req.body.assignedDoc;
    var Disability = req.body.Disability;
    var group = req.body.group;
    var MedicalHis = req.body.MedicalHis;
    var Ptype = req.body.Ptype;
    var PaidAmount = req.body.PaidAmount;
    var sDate = req.body.sDate;
    var eDate = req.body.eDate;
    var st = req.body.st;
    var city = req.body.city;
    var postalCode = req.body.postalCode;
    var country = req.body.Country;
    var Province = req.body.Province;
    var ContactName = req.body.CName;
    var PhoneNum = req.body.Pnumber;
    var start_date = moment(sDate, 'YYYY-MM-DD HH:mm:ss');
    var end_date = moment(eDate, 'YYYY-MM-DD HH:mm:ss');
    var duration = moment.duration(end_date.diff(start_date));
    var servingDuration = duration.asDays();  
    const db = DBService.getDbServiceInstance();
    db.insertNewPatient(patientNum,firstName,LastName,Gender,birthday,age,email,Ptype,assignedDoc,MedicalHis,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,salutation,Mname,Pphone,Cphone,tStatus,tcause,verteran,group,sDate,eDate,servingDuration,Disability);
    

    

});

app.get("/getPatient",function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getPatient();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
});


app.get("/searchPtype/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.searchPatient(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/searchPname/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.searchPatientName(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/searchPId/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.searchPatientId(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/getAllInfo/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.getAllPatientInfo(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

//updating
app.patch("/update", function(req,res){
    const { PatientNum,Fname,Lname,Gender,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,extraNote } = req.body;
    const db = DBService.getDbServiceInstance();
    const result = db.updatePatient(Fname,Lname,Gender,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,extraNote,PatientNum);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.post("/uploadDoc", function(req,res){
    if(req.files){
        
        var file = req.files.file;
        var file_type = req.body.docSelect;
        var file_name = file.name;
        var jaso_file = JSON.stringify(file)
        // var file_path = './upload/'+ file_name;
        // file.mv(file_path, function(error){
        //     if(error){
        //         res.send(error);
        //     }
        //     else{
        //         res.send("file uploaded");
        //     }
        // });
        console.log(typeof file);
        const db = DBService.getDbServiceInstance();
        db.insertNewDoc(file_name, file_type, jaso_file);
    }
})

app.get("/getAllDoc", function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getAllDoc();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/getCourse", function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getCourse();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/courseWaitList/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.getCourseWaitList(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.delete("/deleteRow/:patientName/:courseID", function(req,res){
    const { patientName , courseID } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.deleteRow(patientName,courseID);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})


app.post("/createSession",function(req,res){
    var id = req.body.sessionID;
    var sessionName = req.body.sessionName;
    var sessionLink = req.body.sessionLink;
    var instructor = req.body.instructor;
    var sessionType = req.body.sessionType;
    var startDate = req.body.start_date;
    var endDate = req.body.end_date;
    var startTime = req.body.start_time;
    var endTime = req.body.end_time;
    var repeatDay_s = JSON.stringify(req.body.repeat_day);
    var repeatDuration = req.body.repeat_duration;
    var repeatStatus = req.body.repeat_status;


    var repeatDay = req.body.repeat_day;
    
    if(repeatStatus === "Yes"){

        var split_start_date = startDate.split("-");
        var startYear = split_start_date[0];
        var start_month_trim = () => {
            if(split_start_date[1][0] == "0"){
                return split_start_date[1][1];
            }
            else{
                return split_start_date[1];
            }
        };
        var start_day_trim = () => {
            if(split_start_date[2][0] == "0"){
                return split_start_date[2][1];
            }
            else{
                return split_start_date[2];
            }
        };

        var split_end_date = endDate.split("-");
        var endYear = split_end_date[0];
        var end_month_trim = () => {
            if(split_end_date[1][0] == "0"){
                return split_end_date[1][1];
            }
            else{
                return split_end_date[1];
            }
        };
        var end_day_trim = () => {
            if(split_end_date[2][0] == "0"){
                return split_end_date[2][1];
            }
            else{
                return split_end_date[2];
            }
        };
       
        var daysOfYear = [];
        var temp_start = new Date(startYear, start_month_trim()-1, start_day_trim());
        var temp_end = new Date(endYear, end_month_trim()-1, end_day_trim());
        var int_convert = arr => arr.map(Number);
        var repeatDay_int = int_convert(repeatDay);
        for (var d = temp_start; d <= temp_end; d.setDate(d.getDate() + 1)) {
            var temp_d = new Date(d);
            
            if(repeatDay_int.includes(temp_d.getDay())){
                daysOfYear.push(temp_d);
            }
        }
        
    }

    var daysOfYear_s = JSON.stringify(daysOfYear);

    
    
    
    
    
        
    const db = DBService.getDbServiceInstance();
    db.createSession(id,startDate,endDate,sessionLink,startTime,endTime,instructor,sessionType,sessionName,repeatDay_s,repeatDuration,repeatStatus,daysOfYear_s);
        
    
})



app.get("/getSession", function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getSessionList();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})


app.get("/sessionParticipants/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.getSessionParticipants(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/export/:name", function(req,res){

    const { name } = req.params;
    const user_data = JSON.parse(name);
    const user_columnName = [
        "PatientID",
        "First Name",
        "Last Name",
        "Cell Phone",
        "Email"
    ]
    var array = [];
    function user_data_map(user_data){
        for(var i=0; i<user_data.length; i++){
            array.push(
                { 
                    PatientNum : user_data[i].PatientNum, 
                    Fname: user_data[i].Fname, 
                    Lname: user_data[i].Lname, 
                    cellPhone: user_data[i].cellPhone, 
                    Email: user_data[i].Email
                }
            )
        }
    }

    user_data_map(user_data);
    const final_data = array.map(user =>{
        return[user.PatientNum,user.Fname,user.Lname,user.cellPhone,user.Email];
    })
    const user_sheet_name = "users";
    const user_path = __dirname + "/exportContent.xlsx";
    const export_excel = (data, workSheetColumnNames, workSheetName, filePath) => {
        const workBook = out_excel.utils.book_new();
        const workSheetData = [
            workSheetColumnNames,
            ... data
        ];
        const workSheet = out_excel.utils.aoa_to_sheet(workSheetData);
        out_excel.utils.book_append_sheet(workBook, workSheet, workSheetName);
        out_excel.writeFile(workBook, path.resolve(filePath));
    }

    export_excel(final_data,user_columnName,user_sheet_name,user_path);
    

    
})

app.post("/createCourse",function(req,res){
    var id = req.body.courseID;
    var name = req.body.courseName;
    var spot = req.body.courseSpot;
    const db = DBService.getDbServiceInstance();
    db.createCourse(id,name,spot);
        
})

app.get("/getAllCourse",function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getAllCourse();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
        
})
app.post("/addIntoCourse",function(req,res){
    var content = req.body.addContent;
    var result_int = [];
    for (let i = 0; i < content.length; i++) {
        var temp = [];
        for (let j = 0; j < content[i].length; j++) {
           temp.push(parseInt(content[i][j]));
        }
        result_int.push(temp)
     }
    var array_len = result_int.length
    

    const db = DBService.getDbServiceInstance();
    db.addIntoCourse(result_int);
    const result = db.takenGroupStatus(result_int[0][1]);
    result.then(data => 
            data.forEach(element => {
                console.log(element);
                if(element.total_patient <= element.courseSpot){
                    res.json({success: true})
                }
                else{
                    db.deleteTakenRow(result_int[array_len-1][0],result_int[array_len-1][1]);
                    db.addIntoWaitlist(result_int[array_len-1][0],result_int[array_len-1][1]);
                    res.json({delete: true})
                }
            })
        ).catch(error => console.log(error));      
})

app.post("/addIntoSession",function(req,res){
    var content = req.body.addContent;
    var result_int = [];
    for (let i = 0; i < content.length; i++) {
        var temp = [];
        for (let j = 0; j < content[i].length; j++) {
           temp.push(parseInt(content[i][j]));
        }
        result_int.push(temp)
     }

    const db = DBService.getDbServiceInstance();
    db.addIntoSession(result_int);
         
})

app.listen(5000, function(){
    console.log("Server running on port 5000");
});

