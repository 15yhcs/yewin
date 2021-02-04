//CREATE TABLE `patientsdatabase`.`patient` ( `PatientNum` INT NOT NULL, `Fname` VARCHAR(255) NOT NULL , `Lname` VARCHAR(255) NOT NULL , `Gender` INT NOT NULL , `Birthday` DATE NOT NULL , `Age` INT NOT NULL , `Email` varchar(255) , `Ptype` varchar(255) NOT NULL , `assignedDoc` varchar(255) , `MedicalH` varchar(255) , `PaidAmount` INT , `Street` varchar(255), `city` varchar(255), `PostalCode` varchar(255), `province` varchar(255), `country` varchar(255), `EmergencyContactName` varchar(255), `EmergencyContactNum` varchar(255), `Relationship` varchar(255), PRIMARY KEY (`PatientNum`))
const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: 'localhost' ,
    user: 'otherSample' ,
    password: 'test1234' ,
    database: 'patientsdatabase' ,
    port: '3306'
})

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log("DB state: ", connection.state);
})

class DBService{
    static getDbServiceInstance(){
        return instance ? instance : new DBService()
    }

    async getPatient(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT PatientNum,Fname,Ptype FROM patient";
                connection.query(query, (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async insertNewPatient(patientNum,firstName,LastName,Gender,birthday,age,email,Ptype,assignedDoc,MedicalHis,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,salutation,Mname,Pphone,Cphone,tStatus,tcause,verteran,group,sDate,eDate,Disability){
        try{
            var query = "INSERT INTO patient (PatientNum,Fname,Lname,Gender,Birthday,Age,Email,Ptype,assignedDoc,MedicalH,PaidAmount,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,servingDuration) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                connection.query(query, [patientNum,firstName,LastName,Gender,birthday,age,email,Ptype,assignedDoc,MedicalHis,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,salutation,Mname,Pphone,Cphone,tStatus,tcause,verteran,group,sDate,eDate,Disability] ,(error,results) => {
                    console.log(results);
                })
        }catch(error){
            console.log(error);
        }
    }

    async searchPatient(ptype){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT PatientNum,Fname,Ptype FROM patient WHERE Ptype = ?";
                connection.query(query, [ptype], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async searchPatientName(lName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT PatientNum,Fname,Lname,Ptype FROM patient WHERE Lname = ?";
                connection.query(query, [lName], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async searchPatientId(Id){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT PatientNum,Fname,Lname,Ptype FROM patient WHERE PatientNum = ?";
                connection.query(query, [Id], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }
    
}

module.exports = DBService;