// Global Variable holds currently selected ExamID
var examID;
let examMapURL = baseURL + 'api/examContent/readByKey.php?key=';
var questions = [];
var $table = $('#table')


// Settings on load of page
examID = document.querySelector('#examID').value;
populateExistingQuestions(examID);

// Settings after change of select list
function selectedExam() {
    examID = document.querySelector('#examID').value;
    // console.log("Selected ExamID: " + examID);
    document.getElementById("alertArea").style.display = "none";
    populateExistingQuestions(examID);
}

function populateExistingQuestions(examNum) {
    // questions = [];
    questions.splice(0, questions.length);
    let examMapURLNew = examMapURL + examNum;
    // console.log("Calling: " + examMapURLNew);
    axios.get(examMapURLNew).then(response => {

        // Filling question array
        var obj;
        var quest;
        var i = 0;
        while(response.data[i]){
            obj = response.data[i];
            quest = obj.questionID;
            questions.push(quest);
            i++;
        }

        // console.log(questions);
        // let iterator = questions.values(); 
        // console.log("RETREIVED QUESTIONS for EXAM:" + examNum);
        // Here all the elements of the array is being printed. 
        // for (let elements of iterator) { 
        //    console.log(elements); 
        // } 

        $table.bootstrapTable('refresh');
    }).catch(error => console.log(error));

    // $table.bootstrapTable('refresh');
}

function stateFormatter(row, $element) {
    if (questions.includes($element.questionID)) {
        return {
            checked: true
        };
    } else {
        return {
            checked: false
        };
    }
  }

$(function() {
    $table.on('check.bs.table', function (row, $element) {
        document.getElementById("alertArea").style.display = "none";
        var questionID = $element.questionID;
        questions.push(questionID);
        // console.log("Added: " + questionID);
        // console.log('+ questions: ', questions);
    });
    $table.on('uncheck.bs.table', function (row, $element) {
        document.getElementById("alertArea").style.display = "none";
        var id = $element.questionID;
        
        for (var i = 0; i < questions.length; i++){ 
            if (questions[i] === id) { 
                questions.splice(i, 1); 
            }
        }
        // console.log("Removed: " + id);
        
        // console.log('- questions: ', questions);
    });
});


function updateQuestions() {
    examID = Number(document.querySelector('#examID').value);
    const question = {examID, questions};
    //console.log('sending: ', question);

    axios.post(baseURL + 'api/examContent/insertBulk.php', question)
    .then(response => {
      // alert("Exam " + examID + " has been updated!")
      let message = "Exam " + examID + " has been updated!";
      document.getElementById("alertArea").innerHTML = message;
      document.getElementById("alertArea").style.display = "block";
      
    //   let iterator = questions.values(); 
    //   console.log("UPDATED QUESTIONS EXAM: " +examID);
    //     // Here all the elements of the array is being printed. 
    //   for (let elements of iterator) { 
    //     console.log(elements); 
    //   } 
    })
    .catch(error => console.log(error));
}