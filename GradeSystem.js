let students = [];//[studentId, firstName, lastName, selectedcourses]
let courses = [];//[Course ID, Course Name, Array of Test IDs] ex: [101, "CS101", [1, 2]]
let tests = []; // [Test ID, Course ID, Test Name] ex: [1, 101, "MidtermJava2"]
let grades = []; //[Grade ID, Course ID, Test ID, Student ID, Grade] ex: [1, NFA032, 1, 1, 85]
let studentIdCounter = 1;
let testCounter = 1;
let gradeCounter = 1;


function populateCoursesDropdown() {
    let coursesDropdowns = [
        document.getElementById("courses"), // Add Student Section
        document.getElementById("courseIdForTest"), // Add Test Section
        document.getElementById("courseIdForGrade"), // Add Grade Section
        document.getElementById("ViewcourseId") // View Grades Section
    ];
    
    for (let i = 0; i < coursesDropdowns.length; i++) {
        coursesDropdowns[i].innerHTML = ""; 
       
    }
    document.getElementById("courseIdForGrade").innerHTML = "<option> Select a course </option>";
    if (courses.length > 0) {
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < coursesDropdowns.length; j++) {
                coursesDropdowns[j].innerHTML += `<option value="${courses[i][0]}">${courses[i][1]}</option>`;
            }
        }
    }
}


function populateStudentsDropdown() {
    let GradeDropdown =[
     document.getElementById("studentIdForGrade"),
     document.getElementById("Viewstudent")  
    ];
    for(let i = 0; i < GradeDropdown.length; i++){
     GradeDropdown[i].innerHTML = "";
    }
   

    for (let i = 0; i < students.length; i++) {
        for(let j = 0 ; j< GradeDropdown.length ; j++){
            GradeDropdown[j].innerHTML += `<option value="${students[i][0]}">${students[i][0]} ${students[i][1]} ${students[i][2]}</option>`;

        }
    }
}


function populateTestsDropdown() {
    let courseId = document.getElementById("courseIdForGrade").value; 
    let testDropdown = document.getElementById("testId"); 
    testDropdown.innerHTML = ""; 

    let testDropdownView = document.getElementById("ViewtestId");
    testDropdownView.innerHTML = "";

    // Iterate through tests to find those associated with the selected course
    for (let i = 0; i < tests.length; i++) {
        if (tests[i][1] === courseId) { 
            testDropdown.innerHTML += `<option value="${tests[i][0]}">${tests[i][2]}</option>`; // Add test option (test name is at index2)
        }
        testDropdownView.innerHTML+=`<option value="${tests[i][0]}">${tests[i][2]}</option>`;
    }
}

function updateViewGrade() {
    let selectedCourseId = document.getElementById("ViewcourseId").value;
    let viewTestDropdown = document.getElementById("ViewtestId");

    viewTestDropdown.innerHTML = "";

    for (let i = 0; i < tests.length; i++) {
        if (tests[i][1] == selectedCourseId) {
            viewTestDropdown.innerHTML += `<option value="${tests[i][0]}">${tests[i][2]}</option>`;
        }
    }
}

function updateViewStudent() {
    let selectedCourseId = document.getElementById("ViewcourseId").value;
    let viewStudentDropdown = document.getElementById("Viewstudent");
    
    viewStudentDropdown.innerHTML = ``; 

    for (let i = 0; i < students.length; i++) {
        let studentCourses = students[i][3];
        for (let j = 0; j < studentCourses.length; j++) {
            if (studentCourses[j] == selectedCourseId) {
                viewStudentDropdown.innerHTML += `<option value="${students[i][0]}">${students[i][1]} ${students[i][2]}</option>`;
                break; 
            }
        }
    }
}

function updateAddGradeStudent(){
    let SelectedCourseId = document.getElementById("courseIdForGrade").value;
    let viewStudentDropdown = document.getElementById("studentIdForGrade");

    viewStudentDropdown.innerHTML = "";
    for(let i = 0 ; i < students.length ; i++){
        let studentCourses = students[i][3];
        for(let j = 0 ; j < studentCourses.length ; j++){
            if(studentCourses[j] == SelectedCourseId){
                viewStudentDropdown.innerHTML += `<option value="${students[i][0]}">${students[i][1]} ${students[i][2]}</option>`
                break;
            }
        }
    }


}


function addStudent() {
    let studentId = studentIdCounter++;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let coursesSelect = document.getElementById("courses");
    let selected = [];

    for (let i = 0; i < coursesSelect.length; i++) {
        if (coursesSelect.options[i].selected) {
            selected.push(coursesSelect.options[i].value);
        }
    }

    let student = [studentId, firstName, lastName, selected];
    students.push(student);

    document.getElementById("addStudentForm").reset();
    document.getElementById("studentId").value = studentIdCounter;
    alert("Student Added Successfully");
    populateStudentsDropdown();

}

function addCourse() {
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;

    let course = [courseId, courseName, []]; 
    courses.push(course);

    document.getElementById("addCourseForm").reset();
    alert("Course Added Successfully");
    populateCoursesDropdown(); 
}


function addTest() {
    let courseId = document.getElementById("courseIdForTest").value;
    let testName = document.getElementById("testName").value;
    let testScore = document.getElementById("testScore").value;

    for (let i = 0; i < courses.length; i++) {
        if (courses[i][0] == courseId) {
            let newTestId = testCounter++;
            let newTest = [newTestId, courseId, testName, testScore];

            // Initialize tests array if it doesn't exist
            if (!courses[i][2]) {
                courses[i][2] = []; // Initialize tests array
            }
            courses[i][2].push(newTestId);
            tests.push(newTest);

            alert("Test Added Successfully");
            document.getElementById("addTestForm").reset();
            populateTestsDropdown();
            
        }
    }
}

function addGrade(){
    let gradeId = gradeCounter++;
    let courseId = document.getElementById("courseIdForGrade").value;
    let studentId = document.getElementById("studentIdForGrade").value;
    let testId = document.getElementById("testId").value;
    let Stdgrade = document.getElementById("grade").value;
    let grade = [gradeId,courseId,testId,studentId,Stdgrade];
    grades.push(grade);
    alert(grades);
}

function viewGrades() {
    let courseId = document.getElementById("ViewcourseId").value;
    let testId = document.getElementById("ViewtestId").value;
    let studentId = document.getElementById("Viewstudent").value;
    let found = false;
    
    document.getElementById("MaxStdGrade").innerHTML = "";
    document.getElementById("StdGrade").innerHTML = "";
    document.getElementById("CourseAvg").innerHTML = "";
    document.getElementById("TestAvg").innerHTML = "";

    
  
    for (let i = 0; i < grades.length; i++) {
        if (grades[i][3] == studentId && grades[i][2] == testId) {
            for (let j = 0; j < tests.length; j++) {
                if (tests[j][0] == testId) {
                    document.getElementById("MaxStdGrade").innerHTML = tests[j][3]+'.00'; 
                    document.getElementById("StdGrade").innerHTML = grades[i][4]; 
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
    }

document.getElementById("CourseAvg").innerHTML=CalculateCourseAvarage(courseId);
document.getElementById("TestAvg").innerHTML=calculateTestAverage(testId);
   
}


function CalculateCourseAvarage(cID){
    let courseId = cID;
    let totalGradeSum = 0;
    let totalMaxScoreSum = 0;

    for(let i = 0 ; i < grades.length ; i++){
        if(grades[i][1] == courseId){
            let testId = grades[i][2];
            let studentGrade = Number(grades[i][4]); 

            for (let j = 0; j < tests.length; j++) {
                if (tests[j][0] == testId) {
                    let maxScore = Number(tests[j][3]); 
                    totalGradeSum += studentGrade;
                    totalMaxScoreSum += maxScore;
                }
            }
        }
    }
    let courseAverage = totalMaxScoreSum > 0 ? (totalGradeSum / totalMaxScoreSum) * 100 : 0;
    return courseAverage.toFixed(2); 
}

function calculateTestAverage(tstId) {
    let testId = tstId;
    let totalGradeSum = 0;
    let studentCount = 0;
    let maxScore = 0;

    for (let i = 0; i < grades.length; i++) {
        if (grades[i][2] == testId) { 
            totalGradeSum += Number(grades[i][4]); 
            studentCount++; 
        }
    }

  
    for (let j = 0; j < tests.length; j++) {
        if (tests[j][0] == testId) {
            maxScore = Number(tests[j][3]);
            break;
        }
    }

    let testAverage = studentCount > 0 ? totalGradeSum / studentCount : 0;
    

    let normalizedTestAverage = maxScore > 0 ? (testAverage / maxScore) * 100 : 0;
    
    return normalizedTestAverage.toFixed(2); 
}

