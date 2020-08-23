function startExam() {
    // API Call URL
    var setStartExamURL =  baseURL + 'api/users/setStartExam.php';
    
    // Build JSON POST Body
    // userID was passed from a PHP session variable
    var postData = { "id" : userID };

    // console.log(postData);

    // Sets ExamID for user to current exam if not already assigned
    // Sets ExamDate to time on server (GMT) 
    // Sets ExamStartTime to time on server (GMT)
    axios.post(setStartExamURL, postData).then(response => {
        window.location.replace("takeExam.php");
    });
};