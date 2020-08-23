// https://emn178.github.io/chartjs-plugin-labels/samples/demo/
// https://github.com/emn178/chartjs-plugin-labels

function showPassFailChart() {
    // gets passing and failing grades to set up a ratio
    axios.get(baseURL + 'api/stats/totalPassed.php').then((response) => {
        let passed = response.data[0].total;
        axios.get(baseURL + 'api/stats/totalFailed.php').then((response1) => {
            let failed = response1.data[0].total;
            // new chart is in passFailChart div id
            var ctxP = document.getElementById("passFailChart").getContext('2d');
            // chart with chart js
            var myPieChart = new Chart(ctxP, {
                type: 'pie',
                data: {
                    labels: ["Failed", "Passed"],
                    datasets: [{
                        data: [failed, passed],
                        backgroundColor: ["black", "#ffc904"],
                        hoverBackgroundColor: ["black", "#ffc904"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        // adds labels with percentages
                        labels: {
                            render: 'percentage',
                            precision: 2,
                            fontColor: ['white', 'black'],
                            fontSize: 16,
                            fontStyle: 'bold'
                        }
                    },
                    // tooltips removed because they obscured percentages
                    // and because the stats table underneath has summary statistics
                    tooltips: {
                        enabled: false
                    }
                }
            });
        });
    });
}

// shows a histogram of passed/failed students
// failed scores are in black, passing in gold
// assumes the same cutoff point that the pie chart does
function showHistogram() {
    axios.get(baseURL + 'api/stats/getScoreHistogram.php').then((response) => {
        let histogramResponse = response.data;
        let histogramCounts = []
        // console.log(histogram)
        for (bucket of histogramResponse) {
            histogramCounts.push(bucket.GradeCount)
            // console.log(bucket.GradeCount)
        }
        var chartDiv = document.getElementById("histogram").getContext('2d');
        // ucf colors for bars with hovers
        var ucfBars = ["black", "black", "black", "black", "black", "black", "black", "#ffc904", "#ffc904", "#ffc904"]
        var ucfHover = ["#404025", "#404025", "#404025", "#404025", "#404025", "#404025", "#404025", "goldenrod", "goldenrod", "goldenrod"]
        var histogramChart = new Chart(chartDiv, {
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
            }, options: {
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

// show summary stats page underneath pie chart
function showSummaryStats() {
    // Populate Passed, Failed, and PassRate
    axios.get(baseURL + 'api/stats/totalPassed.php').then((response) => {
        let passed = response.data[0].total;
        axios.get(baseURL + 'api/stats/totalFailed.php').then((response1) => {
            let failed = response1.data[0].total;
            axios.get(baseURL + 'api/users/readTakenExam.php').then((response2) => {
                var average = 0;
                // calculate average time duration
                for (user of response2.data) {
                    if (user.examScore > 0.7) {
                        average += user.examScore
                    }
                }
                // calculate pass rate and format it
                var passRatio = (passed / (passed + failed) * 100);
                var passRatioString = passRatio.toFixed(2).toString() + " %";
                // grab divs
                var passNum = document.getElementById("passNum");
                var failNum = document.getElementById("failNum");
                var passRate = document.getElementById("passRate");
                var passingAverage = document.getElementById("passingAverage");
                var averageString = ((average /= passed).toFixed(2) * 100) + "%";
                // if pass rate is very low or very large, warn user with red text
                // if (passRatio < 50 || passRatio > 90) {
                //     passRate.setAttribute('style', 'color: red !important');
                // }
                if (passRatio < 50) {
                    passRate.setAttribute('style', 'color: red !important');
		            passRatioString = passRatioString + " (Too Low)"; 
                } else if(passRatio > 90) {
		            passRate.setAttribute('style', 'color: red !important'); 
		            passRatioString = passRatioString + " (Too High)"; 
		        }
                // fill divs
                passNum.innerHTML = passed;
                failNum.innerHTML = failed;
                passRate.innerHTML = passRatioString;
                passingAverage.innerHTML = averageString;
            });
        });
    });

    // populate completion times
    var sum = 0;
    axios.get(baseURL + 'api/stats/examDurationByUser.php').then((response) => {
        response.data.forEach(getAverage);
        function getAverage(item) {
            sum += item.ExamDuration;
            // insert calculated and formatted average into the appropriate div
            document.getElementById("averageTime").innerHTML = (sum / response.data.length).toFixed(2) + " minutes";
        }
    });
}

// show stats table on the bottom right
function showTop5Bad() {
    $('#badQuestTable').bootstrapTable('destroy');
    $('#badQuestTable').bootstrapTable({
        url: baseURL + 'api/stats/topFiveIncorrect.php',
        buttonsClass: "ucf",
        showButtonText: true,
        columns: [{
            field: 'questionID',
            title: 'Question ID',
        }, {
            field: 'FailPct',
            title: 'Failure Percentage',
        }, {
            field: 'Total',
            title: 'Total Answers',
        }, {
            field: 'FailCount',
            title: 'Incorrect Responses',
        },
        {
            field: 'actionA',
            title: 'Details',
            formatter: viewQuestionFormatter,
            align: 'center'
        }]
    });

    // when the button is clicked, a new div shows up with the question details
    function viewQuestionFormatter(value, row, index) {
        return [
            '<a href="javascript:void(0)" onclick="showQuestionTable(\'' + row.questionID + '\');" title="Question Details">',
            '<i class="fa fa-check-square ucf-colors-selected"></i>',
            '</a>  '
        ].join('')
    }
}

// hides buttons when the details aren't showing
function hideClrButton() {
    $('#detailtable').bootstrapTable('destroy');
    $('#clrButton').css('display', 'none');
}

// show the question table that populates underneath
function showQuestionTable(questionID) {
    var questionIdNum = parseInt(questionID, 10)
    // console.log(questionIdNum)
    $('#clrButton').css('display', 'block');
    $('#detailtable').bootstrapTable('destroy');
    $('#detailtable').bootstrapTable({
        url: baseURL + 'api/questions/readByKey2.php?key=' + questionIdNum,
        columns: [{
            field: 'questionID',
            title: 'Question ID'
        },
        {
            field: 'stem',
            title: 'Stem',
        }, {
            field: 'category',
            title: 'Category'
        }]
    });
}

showTop5Bad();
showHistogram();
showPassFailChart();
showSummaryStats();