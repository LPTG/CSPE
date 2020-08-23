// Displays histogram of student scores across all students
function studentHistogram() {
  highlightCurrent('#studentHistogram');
  document.getElementById("passFailChart").style.display = "block";
  $('#mytable').bootstrapTable('destroy'); 
  showChart();
}

function showChart() {
  axios.get(baseURL + 'api/stats/getScoreHistogram.php').then((response) => {
    let histogramResponse = response.data;
    let histogramCounts = []
    for (bucket of histogramResponse) {
        histogramCounts.push(bucket.GradeCount)
        // console.log(bucket.GradeCount)
    }
    let chartDiv = document.getElementById("passFailChart").getContext('2d');
    // ucf colors for bars with hovers
    let ucfBars = ["black", "black", "black", "black", "black", "black", "black", "#ffc904", "#ffc904", "#ffc904"]
    let ucfHover = ["#404025", "#404025", "#404025", "#404025", "#404025", "#404025", "#404025", "goldenrod", "goldenrod", "goldenrod"]
    let histogramChart = new Chart(chartDiv, {
      type: 'bar',
      data: {
        // labels based on bucket names, so buckets can be modified in the future should the cutoff value change
        labels: [response.data[0].Bucket, response.data[1].Bucket, response.data[2].Bucket,
        response.data[3].Bucket, response.data[4].Bucket, response.data[5].Bucket, response.data[6].Bucket,
        response.data[7].Bucket, response.data[8].Bucket, response.data[9].Bucket],
        datasets: [{
            label: "Scores",
            data: histogramCounts,
            backgroundColor: ucfBars,
            hoverBackgroundColor: ucfHover
        }]
      }, 
      options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Score Distribution in %'
      }, 
      scales: {
        xAxes: [{
          // categoryPercentage is deprecated as of June 2020
          // but replacement syntax nonfunctional
          // 1 category percentage means no spaces between bars
          categoryPercentage: 0.97,
          barPercentage: 1.0,
          gridLines: {
              drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            // instead of starting at lowest value
            beginAtZero: true,
            // verifying that a value is a number and not undefined
            callback: function (value) { if (Number.isInteger(value)) { return value; } }
          }
        }]
        },
        plugins: {
          // no need for labels, tooltips works
          labels: false
        }
      }
    });
  });
}            

// Displays pass / fail rates grouped by Exam Groupings
function byExamGroup() {
  highlightCurrent('#byExamGroup');
  document.getElementById("passFailChart").style.display = "none";
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/passFailByExamGroup.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showColumns: true,
    showExport: true,
    columns: [{
      field: 'examGroup',
      title: 'Exam Group',
      sortable: 'true'
    }, {
      field: 'Total',
      title: 'Total',
      sortable: 'true'
    }, {
      field: 'PassCount',
      title: 'Pass Count',
      sortable: 'true'
    }, {
      field: 'FailCount',
      title: 'Fail Count',
      sortable: 'true'
    }, {
      field: 'PassPct',
      title: 'Pass Percent',
      sortable: 'true'
    }, {
        field: 'FailPct',
        title: 'Fail Percent',
        sortable: 'true'
    }]
  });
}

// Displays pass / fail rates grouped by Exam
function byExam() {
  highlightCurrent('#byExam');
  document.getElementById("passFailChart").style.display = "none";
  $('#mytable').bootstrapTable('destroy');
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/passFailByExam.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showColumns: true,
    showExport: true,
    columns: [{
      field: 'examID',
      title: 'Exam ID',
      sortable: 'true'
    }, {
      field: 'examName',
      title: 'Exam Name',
      sortable: 'true'
    }, {
        field: 'Total',
        title: 'Total',
        sortable: 'true'
    }, {
        field: 'PassCount',
        title: 'Pass Count',
        sortable: 'true'
    }, {
        field: 'FailCount',
        title: 'Fail Count',
        sortable: 'true'
    }, {
        field: 'PassPct',
        title: 'Pass Percent',
        sortable: 'true'
    }, {
          field: 'FailPct',
          title: 'Fail Percent',
          sortable: 'true'
    }]
  });
}

// Displays pass / fail rates grouped by Category
function byCategory() {
  highlightCurrent('#byCategory');
  document.getElementById("passFailChart").style.display = "none";
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/passFailByCategory.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showColumns: true,
    showExport: true,
    columns: [{
      field: 'category',
      title: 'Category',
      sortable: 'true'
    }, {
        field: 'Total',
        title: 'Total',
        sortable: 'true'
    }, {
        field: 'PassCount',
        title: 'Pass Count',
        sortable: 'true'
    }, {
        field: 'FailCount',
        title: 'Fail Count',
        sortable: 'true'
    }, {
        field: 'PassPct',
        title: 'Pass Percent',
        sortable: 'true'
    }, {
          field: 'FailPct',
          title: 'Fail Percent',
          sortable: 'true'
    }]
  });
}

// Displays pass / fail rates grouped by Individual Question
function byQuestion() {
  highlightCurrent('#byQuestion');
  document.getElementById("passFailChart").style.display = "none";
  $('#mytable').bootstrapTable('destroy'); 
  $('#mytable').bootstrapTable({
    url: baseURL + 'api/stats/passFailByQuestion.php',
    buttonsClass: "ucf",
    showButtonText: true,
    showColumns: true,
    showExport: true,
    pagination: true,
    columns: [{
      field: 'questionID',
      title: 'Question ID',
      sortable: 'true'
    }, {
        field: 'Total',
        title: 'Total',
        sortable: 'true'
    }, {
        field: 'PassCount',
        title: 'Pass Count',
        sortable: 'true'
    }, {
        field: 'FailCount',
        title: 'Fail Count',
        sortable: 'true'
    }, {
        field: 'PassPct',
        title: 'Pass Percent',
        sortable: 'true'
    }, {
          field: 'FailPct',
          title: 'Fail Percent',
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
studentHistogram();

