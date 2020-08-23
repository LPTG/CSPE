// Displays pass / fail rates grouped by Category
function byStudent() {
    highlightCurrent('#byStudent');
    $('#mytable').bootstrapTable('destroy'); 
    $('#mytable').bootstrapTable({
      url: baseURL + 'api/stats/timingsByUser.php',
      buttonsClass: "ucf",
      showButtonText: true,
      showExport: true,
      columns: [{
        field: 'id',
        title: 'Student ID',
        sortable: 'true'
      }, {
          field: 'examStartTime',
          title: 'Start Time',
          sortable: 'true'
      }, {
          field: 'examEndTime',
          title: 'End Time',
          sortable: 'true'
      }, {
          field: 'ExamDuration',
          title: 'Duration (minutes)',
          sortable: 'true'
      }]
    });
  }
  
// Displays pass / fail rates grouped by Exam Groupings
function byExamGroup() {
  highlightCurrent('#byExamGroup');
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/timingsByExamGroup.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showExport: true,
    columns: [{
      field: 'examGroup',
      title: 'Exam Group',
      sortable: 'true'
    }, {
      field: 'MinDuration',
      title: 'Minimum Time (minutes)',
      sortable: 'true'
    }, {
      field: 'MaxDuration',
      title: 'Maximum Time (minutes)',
      sortable: 'true'
    }, {
      field: 'AvgDuration',
      title: 'Average Time (minutes)',
      sortable: 'true'
    }]
  });
}

// Displays pass / fail rates grouped by Exam
function byExam() {
  highlightCurrent('#byExam');
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/timingsByExam.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showExport: true,
    columns: [{
      field: 'examID',
      title: 'Exam ID',
      sortable: 'true'
    }, {
        field: 'MinDuration',
        title: 'Minimum Time (minutes)',
        sortable: 'true'
      }, {
        field: 'MaxDuration',
        title: 'Maximum Time (minutes)',
        sortable: 'true'
      }, {
        field: 'AvgDuration',
        title: 'Average Time (minutes)',
        sortable: 'true'
    }]
  });
}

// Displays pass / fail rates grouped by Individual Question
function byQuestion() {
  highlightCurrent('#byQuestion');
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/timingsByQuestion.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showExport: true,
    columns: [{
      field: 'questionID',
      title: 'Question ID',
      sortable: 'true'
    }, {
        field: 'MinDuration',
        title: 'Minimum Time (seconds)',
        sortable: 'true'
      }, {
        field: 'MaxDuration',
        title: 'Maximum Time (seconds)',
        sortable: 'true'
      }, {
        field: 'AvgDuration',
        title: 'Average Time (seconds)',
        sortable: 'true'
    }]
  });
}

function highlightCurrent(selector) {
  // Set all buttons to default unselected color
  $(":button").removeClass("ucf-colors-selected");
  $(":button").addClass("ucf-colors");

  // Set current button to selected colors
  $(selector).removeClass("ucf-colors");
  $(selector).addClass("ucf-colors-selected");
}

// Initial table to display
byStudent();

