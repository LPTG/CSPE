function showSummaryStats() {
    // Populate Passed, Failed, and PassRate
    axios.get(baseURL + 'api/stats/totalPassed.php').then((response) => {
        let passed = response.data[0].total;
        axios.get(baseURL + 'api/stats/countStudents.php').then((response) => {
            let students = response.data[0].total;
            axios.get(baseURL + 'api/stats/countStudentsInProgress.php').then((response) => {
                let studentsinProgress = response.data[0].total;
                axios.get(baseURL + 'api/stats/totalFailed.php').then((response1) => {
                    let failed = response1.data[0].total;
                    var passRatio = (passed / (passed + failed) * 100);
                    var passRatioString = passRatio.toFixed(2).toString() + " %";
                    var stuNum = document.getElementById("stuNum");
                    var passNum = document.getElementById("passNum");
                    var failNum = document.getElementById("failNum");
                    var proNum = document.getElementById("proNum");
                    var passRate = document.getElementById("passRate");
                    if (passRatio < 50 || passRatio > 90) {
                        passRate.setAttribute('style', 'color: red !important');
                    }
                    stuNum.innerHTML = students;
                    passNum.innerHTML = passed;
                    failNum.innerHTML = failed;
                    proNum.innerHTML = studentsinProgress;
                    passRate.innerHTML = passRatioString;
                });
            });
        });
    });

    // Populate Completion Times
    var sum = 0;
    var min = 9999999;
    var max = -9999999;
    axios.get(baseURL + 'api/stats/examDurationByUser.php').then((response) => {
        response.data.forEach(getAverage);
        function getAverage(item) {
            if (item.ExamDuration < min)
                min = item.ExamDuration;
            if (item.ExamDuration > max)
                max = item.ExamDuration;
            sum += item.ExamDuration;
            document.getElementById("averageTime").innerHTML = "Average: " + (sum / response.data.length).toFixed(2) + " minutes" 
                  + "<br>Min: " + min + " minutes"  + "<br>Max: " + max + " minutes" ;
        }
    });

    // Populate Students in NotTaken
    axios.get(baseURL + 'api/stats/totalScheduled.php').then((response) => {
        let totalScheduled = response.data[0].total;
            var notTaken = document.getElementById("notTaken");
            notTaken.innerHTML =  totalScheduled;
    });
}

function showTotalQuestionsByExamTable() {
    $('#TotalQuestionsbyExam').bootstrapTable('destroy');
    $('#TotalQuestionsbyExam').bootstrapTable({
    url:  baseURL + 'api/stats/countQuestionInExam.php',
    pagination: true,
    columns: [{
        field: 'examID',
        title: 'Exam ID',
    }, {
        field: 'examName',
        title: 'Exam Name'
    }, {
        field: 'examGroup',
        title: 'Exam Group'

    }, {
        field: 'total',
        title: 'Total Question'
    }]
});
}

function showTotalQuestionsByCategoryTable() {
    $('#TotalQuestionsbyCategory').bootstrapTable('destroy');
    $('#TotalQuestionsbyCategory').bootstrapTable({
    url:  baseURL + 'api/stats/totalQuestionsByCategory.php',
    pagenation: true,
    columns: [{
        field: 'category',
        title: 'Category',
    }, {
        field: 'total',
        title: 'Total Question'
    }]
});
}

showSummaryStats();
showTotalQuestionsByCategoryTable();
showTotalQuestionsByExamTable();