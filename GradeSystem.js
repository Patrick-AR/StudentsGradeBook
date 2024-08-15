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

    // Clear existing options in all dropdowns
    for (let i = 0; i < coursesDropdowns.length; i++) {
        coursesDropdowns[i].innerHTML = ""; 
       
    }
    // Add options from the courses array if it exists
    if (courses.length > 0) {
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < coursesDropdowns.length; j++) {
                coursesDropdowns[j].innerHTML += `<option value="${courses[i][0]}">${courses[i][1]}</option>`;
            }
        }
    }
}

// Function to populate students dropdown
function populateStudentsDropdown() {
    let studentIdForGradeDropdown = document.getElementById("studentIdForGrade");
    studentIdForGradeDropdown.innerHTML = ""; // Clear existing options

    // Add options from the students array
    for (let i = 0; i < students.length; i++) {
        studentIdForGradeDropdown.innerHTML += `<option value="${students[i][0]}">${students[i][0]} ${students[i][1]} ${students[i][2]}</option>`;
    }
}


function populateTestsDropdown() {
    let courseId = document.getElementById("courseIdForGrade").value; // Get the selected course ID
    let testDropdown = document.getElementById("testId"); // Get the test dropdown
    testDropdown.innerHTML = ""; // Clear existing options



    // Iterate through tests to find those associated with the selected course
    for (let i = 0; i < tests.length; i++) {
        if (tests[i][1] === courseId) { // Check if the test is associated with the selected course
            testDropdown.innerHTML += `<option value="${tests[i][0]}">${tests[i][2]}</option>`; // Add test option (test name is at index2)
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
    alert("Student Added Successfully");
    populateStudentsDropdown(); // Update the student dropdown options

}

function addCourse() {
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;

    let course = [courseId, courseName, []]; // empty array for tests
    courses.push(course);

    document.getElementById("addCourseForm").reset();
    alert("Course Added Successfully");
    populateCoursesDropdown(); // Update the course dropdown options
}

// Add Test Function
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
}


