// Displays table of all users
function viewAll() {
  highlightCurrent('#viewAll');
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/users/read.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    showColumns: true,
    columns: [{
      field: 'id',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'firstName',
      title: 'First Name',
      sortable: 'true'
    }, {
      field: 'lastName',
      title: 'Last Name',
      sortable: 'true'
    }, {
      field: 'uploadDate',
      title: 'Date Uploaded',
      sortable: 'true'
    }, {
      field: 'examID',
      title: 'Exam Taken',
      sortable: 'true'
    }, {
      field: 'examDate',
      title: 'Exam Date',
      sortable: 'true'
    }, {
      field: 'examStartTime',
      title: 'Exam Started'
    }, {
      field: 'examEndTime',
      title: 'Exam Ended'
    }, {
      field: 'examScore',
      title: 'Score',
      sortable: 'true'
    }, {
      field: 'isAdmin',
      title: 'Faculty',
      sortable: 'true'
    }]
  });
}

// Displays table of faculty users
function viewFaculty() {
  highlightCurrent('#viewFaculty');
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/users/readFaculty.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    columns: [{
      field: 'id',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'firstName',
      title: 'First Name',
      sortable: 'true'
    }, {
      field: 'lastName',
      title: 'Last Name',
      sortable: 'true'
    }, {
      field: 'uploadDate',
      title: 'Date Added',
      sortable: 'true'
    }, {
      field: 'isAdmin',
      title: 'Faculty'
    }, {
      field: 'actionA',
      title: 'Delete',
      formatter: 'deleteFacultyFormatter',
      align: 'center' 
    }]
  });
}

function deleteFacultyFormatter(value, row, index) {
  return [
    '<a href="javascript:void(0)" onclick="deleteFaculty(\'' + row.id + '\');" title="Delete User">',
    '<i class="fa fa-trash fa-2x ucf-colors-selected"></i>',
    '</a>  '
  ].join('')
}

function deleteFaculty(id) {
  let messageTxt = "<p><strong>Warning: </strong>Deleting a user permanently purges them from the system. "
   + "<br><br> Are you sure? </p>"
   + '<p><button type="button" onclick="callDeleteFaculty(\'' + id + '\')" class="btn ucf-colors m-3">Delete Faculty</button></p>';
  document.getElementById("message").innerHTML = messageTxt;
  $('#message').css('display', 'block');
}

function callDeleteFaculty(id) {
  let deleteUserURL = baseURL + 'api/users/delete.php';
  let payload = { "id" : id};
  axios.post(deleteUserURL,payload).then(response => {
    // console.log(response);
    viewFaculty();
  });
}

// Displays table of students who have not taken exam
function viewNotTakenExam() {
  highlightCurrent('#viewNotTakenExam');
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/users/readNotTakenExam.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    sortName: 'uploadDate',
    columns: [{
      field: 'id',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'firstName',
      title: 'First Name',
      sortable: 'true'
    }, {
      field: 'lastName',
      title: 'Last Name',
      sortable: 'true'
    }, {
      field: 'uploadDate',
      title: 'Date Uploaded',
      sortable: 'true'
    }, {
      field: 'examID',
      title: 'Exam Assigned',
      formatter: 'examAssignedFormatter',
      sortable: 'true'
    }, {
      field: 'actionA',
      title: 'Delete',
      formatter: 'deleteUserFormatter',
      align: 'center' 
    }]
  });
}

function examAssignedFormatter(value, row, index) {
  if( row.examID == null) {
    return [ 'Current']
  } else {
    return [row.examID]
  }
}

// Used when displaying students who have taken exam to show links for answer and time logs
function deleteUserFormatter(value, row, index) {
  return [
    '<a href="javascript:void(0)" onclick="deleteUser(\'' + row.id + '\');" title="Delete User">',
    '<i class="fa fa-trash fa-2x ucf-colors-selected"></i>',
    '</a>  '
  ].join('')
}

function deleteUser(id) {
  let messageTxt = "<p><strong>Warning: </strong>Deleting a user permanently purges them from the system. "
   + "Examine the upload date before deleting the user. If the user was added during freshman orientation, "
   + "it may take several semesters for the student to take the CSPE exam. If the user is deleted, the user "
   + "will have to be manually added back in to take the test. <br><br> Are you sure? </p>"
   + '<p><button type="button" onclick="callDeleteUser(\'' + id + '\')" class="btn ucf-colors m-3">Delete User</button></p>';
  document.getElementById("message").innerHTML = messageTxt;
  $('#message').css('display', 'block');
}

function callDeleteUser(id) {
  let deleteUserURL = baseURL + 'api/users/delete.php';
  let payload = { "id" : id};
  axios.post(deleteUserURL,payload).then(response => {
    // console.log(response);
    viewNotTakenExam();
  });
}

// Displays table of students who have taken exam and gotten score
function viewTakenExam() {
  highlightCurrent('#viewTakenExam');
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/users/readTakenExam.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    showColumns: true,
    sortName: 'examDate',
    sortOrder: 'desc',
    columns: [{
      field: 'id',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'firstName',
      title: 'First Name',
      sortable: 'true'
    }, {
      field: 'lastName',
      title: 'Last Name',
      sortable: 'true',
    }, {
      field: 'uploadDate',
      title: 'Date Uploaded',
      sortable: 'true'
    }, {
      field: 'examID',
      title: 'Exam Taken',
      sortable: 'true'
    }, {
      field: 'examDate',
      title: 'Exam Date',
      sortable: 'true'
    }, {
      field: 'examTimeLimit',
      title: 'Time Limit'
    }, {
      field: 'examStartTime',
      title: 'Exam Started'
    }, {
      field: 'examEndTime',
      title: 'Exam Ended'
    }, {
      field: 'examScore',
      title: 'Score',
      sortable: 'true'
    }, {
      field: 'actionA',
      title: 'Details',
      formatter: 'viewScoreFormatter',
      align: 'center' 
    }]
  });
}

// Used when displaying students who have taken exam to show links for answer and time logs
function viewScoreFormatter(value, row, index) {
  return [
    '<a href="javascript:void(0)" onclick="showScoreTable(\'' + row.id + '\');" title="Answer Details">',
    '<i class="fa fa-check-square fa-2x ucf-colors-selected"></i>',
    '</a>  ',
    '<a href="javascript:void(0)" onclick="showTimeTable(\'' + row.id + '\');" title="Time Audit">',
    '<i class="fa fa-clock fa-2x ucf-colors-selected"></i>',
    '</a>'
  ].join('')
}

// Used when displaying students who have taken exam to show answer table for that user
function showScoreTable(id) {
  $('#clrButton').css('display', 'block');
  $('#detailtable').bootstrapTable('destroy'); 
  $('#detailtable').bootstrapTable({
    url: baseURL + 'api/results/readByKey.php?key=' + id,
    Striped: true,
    tableSm: true,
    columns: [{
        field : 'id',
        title: 'ID',
    }, {
        field: 'examID',
        title: 'Exam ID'
    }, {
        field: 'questionID',
        title: 'Question ID'
    }, {
        field: 'answered',
        title: 'Answered'
    }, {
        field: 'correctAnswer',
        title: 'Correct Answer'
    }, {
        field: 'seconds',
        title: 'Time (s)'
    }]
  });
  let messageTxt = "<p><strong>Note: </strong>Answered 'z' means student did not answer that question. "
  document.getElementById("message").innerHTML = messageTxt;
  $('#message').css('display', 'block');
}

// Used when displaying students who have taken exam to show timelog table for that user
function showTimeTable(id) {
  $('#clrButton').css('display', 'block');
  $('#detailtable').bootstrapTable('destroy'); 
  $('#detailtable').bootstrapTable({
    url: baseURL + 'api/timelog/readByKey.php?key=' + id,
    Striped: true,
    tableSm: true,
    columns: [{
        field : 'id',
        title: 'ID',
    }, {
        field: 'examID',
        title: 'Exam ID'
    }, {
        field: 'questionID',
        title: 'Question ID'
    }, {
        field: 'actionWord',
        title: 'Action'
    }, {
        field: 'actionTime',
        title: 'Time of Action'
    }]
  });
  let messageTxt = "<p><strong>Note: </strong>Action shows exam start and students clicking buttons (Next, Previous, Finish). "
      + "It shows timeout if they ran out of time on the exam, followed by the timer pushing the finish button."
  document.getElementById("message").innerHTML = messageTxt;
  $('#message').css('display', 'block');
}

function hideClrButton() {
  $('#detailtable').bootstrapTable('destroy');
  $('#clrButton').css('display', 'none');
  $('#message').css('display', 'none');
}

function viewNotFinished() {
  highlightCurrent('#viewNotFinished');
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/users/readNotFinished.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    showColumns: true,
    buttonsClass: "ucf",
    sortName: 'currentServerTime',
    sortOrder: 'desc',
    columns: [{
      field: 'id',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'firstName',
      title: 'First Name',
      sortable: 'true'
    }, {
      field: 'lastName',
      title: 'Last Name',
      sortable: 'true',
    }, {
        field: 'examID',
        title: 'Exam Taken',
        sortable: 'true'
    }, {
        field: 'examTimeLimit',
        title: 'Time Limit'
    }, {
        field: 'examStartTime',
        title: 'Exam Started'
    }, {
        field: 'currentServerTime',
        title: 'Current Server Time'
    }, {
        field: 'status',
        title: 'Status'
    }, {
        field: 'actionA',
        title: 'Reset',
        formatter: 'viewResetFormatter',
        align: 'center' 
    }]
  });
}

function viewResetFormatter(value, row, index) {
  if (row.status == "Aborted") {
    return [
      '<a href="javascript:void(0)" onclick="doResetUser(\'' + row.id + '\');" title="Time Audit">',
      'Reset',
      '</a>'
    ].join('')
  } else {
    return [
      '<a href="javascript:void(0)">N/A</a>'
    ]
  }
}

function doResetUser(id) {
  showTimeTable(id);
  let messageTxt = "<p><strong>Warning: </strong>Examine the time log above for details prior to resetting the user. The time log "
   + "shows how many questions the student saw, and how much time the student spent on each question. "
   + "The student may have taken screenshots of the questions. This action will reset all student records for "
   + "that exam attempt and allow the student to retake the exam. <br><br> Are you sure? </p>"
   + '<p><button type="button" onclick="callResetAPI(\'' + id + '\')" class="btn ucf-colors m-3">Reset User</button></p>';
  document.getElementById("message").innerHTML = messageTxt;
  $('#message').css('display', 'block');
}

function callResetAPI(id) {
  // console.log("Deleting attempt for: " + id);
  let cleanAttemptURL = baseURL + 'api/users/cleanAttempt.php';
  let postData = { "id" : id };
    axios.post(cleanAttemptURL, postData).then(response => {
        // console.log(response);
        viewNotFinished();
    });
}

function highlightCurrent(selector) {
  // Set all buttons to default unselected color
  $(":button").removeClass("ucf-colors-selected");
  $(":button").addClass("ucf-colors");

  // Set current button to selected colors
  $(selector).removeClass("ucf-colors");
  $(selector).addClass("ucf-colors-selected");

  // Hide clear Button and table if shown
  hideClrButton();
}

// Initial table to display
viewTakenExam();