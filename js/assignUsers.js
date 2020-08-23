// Global variable that holds currently selected examID
var examID = document.querySelector('#examID').value;;
var readNotTakenURL = baseURL + 'api/users/readNotTakenExam.php';
var mapToExamURL = baseURL + 'api/users/mapToExam.php';
var students = [];
var table = $('#table');

viewAllNotTaken();
populateExistingUsers();

// Build table to view all students that have not taken an exam
function viewAllNotTaken() {
    table.bootstrapTable('destroy');
    table.bootstrapTable({
        url: readNotTakenURL,
        pagination: true,
        pageSize: "15",
        toolbar: "#toolbar",
        search: true,
        showButtonText: true,
        showSearchClearButton: true,
        buttonsClass: "ucf",
        dataToggle: "table",
        showSearchClearButton: "true",
        showButtonText: "true",
        clickToSelect: "true",
        buttonsClass: "ucf",
        checkboxHeader: "false",
        columns: [
            {
                checkbox: true,
                formatter: 'checkStudents'
            },
            {
                field: 'id',
                title: 'User ID',
                sortable: true
            },
            {
                field: 'firstName',
                title: 'First Name',
                sortable: true
            },
            {
                field: 'lastName',
                title: 'Last Name',
                sortable: true
            }
        ]
    });
}

// Refresh table after changing the value of the selected exam
function selectedExam() {
    examID = document.querySelector('#examID').value;
    document.getElementById("alertArea").style.display = "none";
    populateExistingUsers();
}

// Fill out the questions array depending on which questions are in the current exam
function populateExistingUsers() {
    // Reset students array and get currently selected examID
    students = [];
    examID = document.querySelector('#examID').value;

    // Get list of users that have not taken an exam
    axios.get(readNotTakenURL).then(response => {
        // Filling students array
        response.data.forEach(student => {
            if (student.examID == examID) {
                students.push(student.id);
            }
        });

        table.bootstrapTable('refresh');
    })
        .catch(error => console.log(error));
}

// Decides if the current row of the table should be checked or unchecked
function checkStudents(row, element) {
    if (students.includes(element.id)) {
        return {
            checked: true
        };
    } else {
        return {
            checked: false
        };
    }
}

// Events to run on check or uncheck of question
$(function () {
    // On check
    table.on('check.bs.table', function (row, element) {
        document.getElementById("alertArea").style.display = "none";
        var studentID = element.id;
        students.push(studentID);
    });

    // On uncheck
    table.on('uncheck.bs.table', function (row, element) {
        document.getElementById("alertArea").style.display = "none";
        var studentID = element.id;

        // Remove unchecked student from students array
        for (var i = 0; i < students.length; i++) {
            if (students[i] === studentID) {
                students.splice(i, 1);
            }
        }
    });

    // On check all
    table.on('check-all.bs.table', function (e, rows) {
        document.getElementById("alertArea").style.display = "none";
        students = [];
        rows.forEach(row => {
            students.push(row.id);
        });
    });

    // On uncheck all
    table.on('uncheck-all.bs.table', function (e, rows) {
        document.getElementById("alertArea").style.display = "none";
        students = [];
    });
});

// Update questions depending on which questions are currently in the questions array
function updateQuestions() {
    examID = document.querySelector('#examID').value;

    if (students.length === 0)
        students = [""];

    const payload = { examID, students };

    axios.post(mapToExamURL, payload)
        .then(response => {
            // alert("Exam " + examID + " has been updated!")
            let message = "Exam " + examID + " has been updated!";
            document.getElementById("alertArea").innerHTML = message;
            document.getElementById("alertArea").style.display = "block";
        })
        .catch(error => console.log(error));
}