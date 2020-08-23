function viewAll() {
  $('#clrButton').css('display', 'none');
  $('#detailTable').bootstrapTable('destroy');
  highlightCurrent('#viewAll');  
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/exams/read.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    sortName: 'dateCreated',
    sortOrder: 'desc',
    columns: [{
      field: 'examID',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'examName',
      title: 'Name',
      sortable: 'true'
    }, {
      field: 'examGroup',
      title: 'Exam Group',
      sortable: 'true'
    }, {
      field: 'dateCreated',
      title: 'Date Created',
      sortable: 'true'
    }, {
      field: 'author',
      title: 'Author',
      sortable: 'true'
    }, {
      field: 'passFailPct',
      title: 'Pass Score'
    }, {
      field: 'current',
      title: 'Current',
      formatter: 'currentFormatter',
      sortable: 'true'
    }, {
      field: 'actionA',
      title: 'Set Current',
      formatter: 'viewExamFormatter',
      align: 'center'
    }, {
      field: 'actionB',
      title: 'Detail',
      formatter: 'viewDetailFormatter',
      align: 'center'
    }]
});
}

function currentFormatter(value, row, index) {
  if(row.current) {
    return [ '<i class="fa fa-check fa-2x ucf-colors-selected"></i>']
  } else {
    return [ ' ']
  }
}

function viewExamFormatter(value, row, index) {
  return [
    '<a href="javascript:void(0)" onclick="setCurrent(\'' + row.examID + '\');" title="Make Current">',
    '<i class="fa fa-arrow-circle-left fa-2x ucf-colors-selected"></i>',
    '</a>  '
  ].join('')
}

function setCurrent(id) {
  //console.log('id is ' + id);
  axios.put(baseURL + 'api/exams/setCurrent.php', {
    examID: id
  }).then(response => {
    // console.log(response);
    // alert('Current exam has been changed.');
    location.reload();
  }).catch(error => { console.log(err); });

}

    

function viewCurrent() {
  $('#clrButton').css('display', 'none');
  $('#detailTable').bootstrapTable('destroy');
  highlightCurrent('#viewCurrent');
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/exams/readCurrent.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    columns: [{
      field: 'examID',
      title: 'ID'
    }, {
      field: 'examName',
      title: 'Name'
    }, {
      field: 'examGroup',
      title: 'Exam Group'
    }, {
      field: 'dateCreated',
      title: 'Date Created'
    }, {
        field: 'author',
        title: 'Author'
    }, {
        field: 'passFailPct',
        title: 'Pass Score'
    }, {
        field: 'actionA',
        title: 'Detail',
        formatter: 'viewDetailFormatter',
        align: 'center'
    }]
  });
}
 
function viewPast() {
  $('#clrButton').css('display', 'none');
  $('#detailTable').bootstrapTable('destroy');
  highlightCurrent('#viewPast');
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/exams/readPast.php',
    pagination: true,
    search: true,
    showButtonText: true,
    showSearchClearButton: true,
    buttonsClass: "ucf",
    columns: [{
      field: 'examID',
      title: 'ID',
      sortable: 'true'
    }, {
      field: 'examName',
      title: 'Name',
      sortable: 'true'
    }, {
      field: 'examGroup',
      title: 'Exam Group',
      sortable: 'true'
    }, {
      field: 'dateCreated',
      title: 'Date Created',
      sortable: 'true'
    }, {
        field: 'author',
        title: 'Author',
        sortable: 'true'
    }, {
        field: 'passFailPct',
        title: 'Pass Score'
    }, {
        field: 'actionA',
        title: 'Set Current',
        formatter: 'viewExamFormatter',
        align: 'center'
    }, {
        field: 'actionB',
        title: 'Detail',
        formatter: 'viewDetailFormatter',
        align: 'center'
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

function viewDetailFormatter(value, row, index) {
  return [
    '<a href="javascript:void(0)" onclick="showDetailTable(\'' + row.examID + '\');" title="Statistics Details">',
    '<i class="fa fa-check-square fa-2x ucf-colors-selected"></i>',
    '</a>  ',
  ].join('')
}

function showDetailTable(examID) {
  $('#clrButton').css('display', 'block');
  $('#detailTable').bootstrapTable('destroy');
  $('#detailTable').bootstrapTable({
    url: baseURL + 'api/stats/examDetailbyKey.php?key=' + examID,
    buttonsClass: "ucf",
    pagination: true,
    pageSize : 5,
    pageList : [5,10,20],
    columns: [{
      field: 'examID',
      title: 'exam ID',
    }, {
        field: 'questionID',
        title: 'question ID',
    }, {
        field: 'stem',
        title: 'Stem',
    }]
  });
}

function hideClrButton() {
  $('#detailTable').bootstrapTable('destroy');
  $('#clrButton').css('display', 'none');
}

viewAll();