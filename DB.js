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

    async searchAdmin(user,psw){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT adminID from admin WHERE username = ? and password = ?';
                connection.query(query, [user,psw], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}
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

    async insertNewPatient(patientNum,firstName,LastName,Gender,birthday,age,email,Ptype,assignedDoc,MedicalHis,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,salutation,Mname,Pphone,Cphone,tStatus,tcause,verteran,group,sDate,eDate,servingDuration,Disability){
        try{
            var query = "INSERT INTO patient (PatientNum,Fname,Lname,Gender,Birthday,Age,Email,Ptype,assignedDoc,MedicalH,PaidAmount,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,servingDuration,disbility) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                connection.query(query, [patientNum,firstName,LastName,Gender,birthday,age,email,Ptype,assignedDoc,MedicalHis,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,salutation,Mname,Pphone,Cphone,tStatus,tcause,verteran,group,sDate,eDate,servingDuration,Disability] ,(error,results) => {
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

    async getAllPatientInfo(Id){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM patient WHERE PatientNum = ?";
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

    async updatePatient(Fname,Lname,Gender,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,disbility,extraNote,PatientNum){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE patient SET Fname = ?, Lname = ?, Gender = ?, Age = ?, Email = ?, Ptype = ?, assignedDoc = ?, MedicalH = ?, Street = ?, city = ?, PostalCode = ?, province = ?, country = ?, EmergencyContactName = ?, EmergencyContactNum = ?, Salutation = ?, mailingName = ?, homePhone = ?, cellPhone = ?, tStatus = ?, tCause = ?, vstatus = ?, a_group = ?, start_date = ?, end_date = ?, extraNote = ? WHERE PatientNum = ?";
                connection.query(query, [Fname,Lname,Gender,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,disbility,extraNote,PatientNum], (error,result) => {
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

    async insertNewDoc(file_name, file_type, file){
        try{
            var query = "INSERT INTO document (name, type, fileContent) VALUES (?,?,?)";
                connection.query(query, [file_name, file_type, file] ,(error,results) => {
                    console.log(results);
                })
        }catch(error){
            console.log(error);
        }
    }

    async getAllDoc(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM document";
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

    async getCourse(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT DISTINCT courseName FROM course INNER JOIN waiting ON course.c_id = waiting.course";
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

    async getCourseWaitList(course){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT DISTINCT * FROM waiting INNER JOIN course ON course.c_id = waiting.course WHERE course.courseName = ?";
                connection.query(query,[course],(error,result) => {
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

    async deleteRow(patientName, courseName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM waiting WHERE patient = ? AND course = ?";
                connection.query(query,[patientName, courseName], (error,result) => {
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
    // id,startDate,endDate,sessionLink,startTime,endTime,instructor,sessionType,sessionName,repeatDay,repeatDuration
    async createSession(id,startDate,endDate,sessionLink,startTime,endTime,instructor,sessionType,sessionName,repeatDay,repeatDuration,repeatStatus,repeatDates){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO session(sessionID,start_date,end_date,sessionLink,startTime,endTime,instructor,sessionType,sessionName,repeatDays,sessionDuration,sessionStatus,repeatDates)VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?)';
                connection.query(query, [id,startDate,endDate,sessionLink,startTime,endTime,instructor,sessionType,sessionName,repeatDay,repeatDuration,repeatStatus,repeatDates], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    console.log(result);
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}
    }

    async getSessionList() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM session";
                connection.query(query,(error,result) => {
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

    async getSessionParticipants(req_session) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT PatientNum, Fname, Lname, cellPhone, Email FROM patient INNER JOIN participate on patient.PatientNum = participate.patient WHERE participate.session = ?";
                connection.query(query,[req_session],(error,result) => {
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

    async createCourse(id,name,spot){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO course(c_id, courseName, courseSpot) VALUE(?,?,?)';
                connection.query(query, [id,name,spot], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}

    }

    async getAllCourse(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM course ";
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
    
    async addIntoCourse(content){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO Taken(patient,course) VALUE ?';
                connection.query(query, [content], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}

    }

    async takenGroupStatus(course){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT COUNT(taken.patient) AS total_patient, course.c_id, course.courseSpot FROM course INNER JOIN taken ON taken.course = course.c_id where course.c_id = ? GROUP BY course.c_id';
                connection.query(query,[course], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}

    }
    async deleteTakenRow(patientName, courseName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM taken WHERE patient = ? AND course = ?";
                connection.query(query,[patientName, courseName], (error,result) => {
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

    async addIntoWaitlist(patientName, courseName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO waiting(patient,course) VALUE (?,?)';
                connection.query(query, [patientName, courseName], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}

    }

    async addIntoSession(content){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO participate(patient,session) VALUE ?';
                connection.query(query, [content], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}

    }

}

module.exports = DBService;