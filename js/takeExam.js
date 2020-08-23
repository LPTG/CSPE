function displayTimer() {
    axios.get(timerURL).then(response => {

        // Set the data we are counting down to
        let diff = response.data.examTimelimit;
        var countDownDate = new Date( ).getTime() + (diff * 60000);

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("countdown").innerHTML = hours + " hours " + minutes + " min " + seconds + " sec ";

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "EXPIRED";
                timeOut();
            }
        }, 1000);
    });
}

function displayProgress (currentIndex, maxIndex) {
    let label = "Question " + (currentIndex + 1) + " of " + maxIndex;
    document.getElementById('examProgress').innerHTML = label;
}

function displayQuestion(currentQuestion) {
    // Always display stem with answer choice A and B
    document.getElementById('stemHere').innerHTML = currentQuestion.stem;
    document.getElementById('choiceA').innerHTML = currentQuestion.choiceA;
    document.getElementById('choiceB').innerHTML = currentQuestion.choiceB;
    
    // Choose whether to display optional answers C,D,E
    if (currentQuestion.choiceC == null) {
        document.getElementById('optionalChoiceC').style.display = "none";
    } else {
        document.getElementById('choiceC').innerHTML = currentQuestion.choiceC;
        document.getElementById('optionalChoiceC').style.display = "block";
    }

    if (currentQuestion.choiceD == null) {
        document.getElementById('optionalChoiceD').style.display = "none";
    } else {
        document.getElementById('choiceD').innerHTML = currentQuestion.choiceD;
        document.getElementById('optionalChoiceD').style.display = "block";
    }

    if (currentQuestion.choiceE == null) {
        document.getElementById('optionalChoiceE').style.display = "none";
    } else {
        document.getElementById('choiceE').innerHTML = currentQuestion.choiceE;
        document.getElementById('optionalChoiceE').style.display = "block";
    }
    
    // Check the radion button that corresponds to ans
    let postData = { "id" : userID, "examID" : examID, "questionID" : currentQuestion.questionID };
    console.log(postData);
    axios.post(answerURL, postData).then(response => {
        let ans = response.data.answered;
        if (ans == "z") {
            document.querySelector('input[value="a"]').checked = false;
            document.querySelector('input[value="b"]').checked = false;
            document.querySelector('input[value="c"]').checked = false;
            document.querySelector('input[value="d"]').checked = false;
            document.querySelector('input[value="e"]').checked = false;
        } else {
            document.querySelector('input[value="' + ans + '"]').checked = true;
        }
    });
}

function previous() {
    // Save the result of the current question your before changing index
    let currentAnswer = $("input[name='optchoices']:checked").val();
    let currentIndex = index;
    let fixUndefined = (typeof currentAnswer === 'undefined') ? 'z' : currentAnswer;
    let postData = { "id" : userID, "examID" : examID, "questionID" : questionList[currentIndex], "answered" : fixUndefined,
                     "actionWord" : "previous" };
    // console.log(postData);
    axios.post(resultsURL,postData).then(response0 => {
        // console.log(response0);
    });
    
    // Decrement index since previous button was pushed
    index--;

    // Refresh progress message
    displayProgress(index,maxQuestions);

    // Dont allow index to go below lower boundary (0) of array
    if (index <= 0) {
        index = 0;
        
        // If at first question always hide previous and finish buttons
        document.getElementById('previous').style.display = "none";
        document.getElementById('finish').style.display = "none";

        // Display first question in list, used for initial question to start things specifically at index=0
        let questionZero = oneQuestionURL + questionList[index];
        axios.get(questionZero).then(response => {
            displayQuestion(response.data);
        });

    } else {
        // Somewhere in middle of exam question list, not at first question
        // Since in middle, next show show and finish should be hidden
        document.getElementById('next').style.display = "inline";
        document.getElementById('finish').style.display = "none";
        
        // Show previous question now at index - 1
        let priorQuestion = oneQuestionURL + questionList[index];
        axios.get(priorQuestion).then(response2 => {
            displayQuestion(response2.data);
        });
    }
}

function next() {
    // Save the result of the current question your before changing index
    let currentAnswer = $("input[name='optchoices']:checked").val();
    let currentIndex = index;
    let fixUndefined = (typeof currentAnswer === 'undefined') ? 'z' : currentAnswer;
    let postData = { "id" : userID, "examID" : examID, "questionID" : questionList[currentIndex], "answered" : fixUndefined,
                     "actionWord" : "next" };
    axios.post(resultsURL,postData).then(response0 => {
        // console.log(response0);
    });
    
    // Increment index since next button was pushed
    index++;

    // Refresh progress message
    displayProgress(index,maxQuestions);
    
    // dont allow index to go out of upper boundary of array
    if (index >= (maxQuestions - 1)) { 
        index = maxQuestions - 1; //keep index on last question
        
        // At last question, hide next button and show finish button
        document.getElementById('next').style.display = "none";
        document.getElementById('finish').style.display = "inline";

        // Show last question now at (maxQuestions - 1)
        let lastQuestion = oneQuestionURL + questionList[index];
        axios.get(lastQuestion).then(response => {
            displayQuestion(response.data);
        });
    
    } else {
        // Somewhere in middle of exam question list, not at last question
        let nextQuestionByIdURL = oneQuestionURL + questionList[index]; 
        axios.get(nextQuestionByIdURL).then(response2 => {
            displayQuestion(response2.data);

            // If we went to next question, previous button should always show
            document.getElementById('previous').style.display = "inline";
        });
    }   
}

function timeOut() {
        // Save the result of the current question your before changing index
        let currentAnswer = $("input[name='optchoices']:checked").val();
        let currentIndex = index;
        let fixUndefined = (typeof currentAnswer === 'undefined') ? 'z' : currentAnswer;
        let postData = { "id" : userID, "examID" : examID, "questionID" : questionList[currentIndex], "answered" : fixUndefined,
                         "actionWord" : "timeout" };
        axios.post(resultsURL,postData).then(response0 => {
            // console.log(response0);
            document.getElementById("finish").click();
        });
}


function finish() {
    // Save the result of the current question your before changing index
    let currentAnswer = $("input[name='optchoices']:checked").val();
    let currentIndex = index;
    let fixUndefined = (typeof currentAnswer === 'undefined') ? 'z' : currentAnswer;
    let postData = { "id" : userID, "examID" : examID, "questionID" : questionList[currentIndex], "answered" : fixUndefined,
                     "actionWord" : "finish" };
    axios.post(resultsURL,postData).then(response0 => {
        console.log(response0);
        let payload2 = {"id" : userID};
        axios.post(endTimeURL, payload2).then(response1 => {
            console.log(response1);
            window.location.replace("showScore.php");
        });   
    });

    // Grade exam and display result
    // window.location.replace("showScore.php");
}

// Execution starts here after function definitions

// PHP Calling script added userID and examID variables
// API URLs needed
var examQuestionListURL =  baseURL + 'api/users/getCurrentQuestionsByID.php?key=' + userID;
var oneQuestionURL = baseURL + 'api/questions/readByKey.php?key='; // not complete, need key
var resultsURL = baseURL + 'api/results/upsert.php';
var answerURL = baseURL + 'api/results/getAnswer.php';
var endTimeURL = baseURL + 'api/users/setEndTime.php';
var timerURL = baseURL + 'api/users/getTimerByKey.php?key=' + userID;

// Gloabl Variables
var index = 0;
var maxQuestions = 0;
var questionList = [];

axios.get(examQuestionListURL).then(response => {
    // Assign values to Global Variables used in other functions
    questionList = response.data.currentExamQuestions;
    maxQuestions = questionList.length
    // console.log(questionList);
    
    // Show full name in header
    let displayName = firstName + " " + lastName;
    document.getElementById('username').innerHTML = displayName;

    // Update progress
    displayProgress(index,maxQuestions);
    
    // Show initial question 
    let firstQuestion = oneQuestionURL + questionList[index];
    console.log("First Question " + firstQuestion);
    axios.get(firstQuestion).then(response2 => {
        console.log(response2.data);
        displayQuestion(response2.data);
        displayTimer();

        let currentAnswer = $("input[name='optchoices']:checked").val();
        let currentIndex = index;
        let fixUndefined = (typeof currentAnswer === 'undefined') ? 'z' : currentAnswer;
        let postData = { "id" : userID, "examID" : examID, "questionID" : questionList[currentIndex], "answered" : fixUndefined,
                     "actionWord" : "start" };
        axios.post(resultsURL,postData).then(response0 => {
            // console.log(response0);
        });
        
        // First question so hide previous and finish buttons
        document.getElementById('previous').style.display = "none";
        document.getElementById('finish').style.display = "none";
    });

});




