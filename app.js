const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const https = require("https");


const app = express();
const DBService = require("./DB");
var path = require("path");
const { log } = require("console");

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.static("public"));





app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/index.html"));
});

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

    const db = DBService.getDbServiceInstance();
    db.insertNewPatient(patientNum,firstName,LastName,Gender,birthday,age,email,Ptype,assignedDoc,MedicalHis,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,salutation,Mname,Pphone,Cphone,tStatus,tcause,verteran,group,sDate,eDate,Disability);
    

    

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

app.listen(5000, function(){
    console.log("Server running on port 5000");
});
