// PHP Calling script added userID, examID, firstName, and lastName variables

// Show full name in header
let displayName = firstName + " " + lastName;
document.getElementById('username').innerHTML = displayName;

// API URLs needed
const getScoreURL =  baseURL + 'api/results/getscore.php';
const setScoreURL =  baseURL + 'api/users/setScore.php';
const getPassPctURL = baseURL + 'api/exams/readByKey.php?key=' + examID;
const setSecondsURL =  baseURL + 'api/results/setSeconds.php';

// Get Grade
let postData = { "id" : userID, "examID" : examID };

axios.post(getScoreURL,postData).then(response => {
    // console.log(response);

    // Get Score
    let grade = response.data[0].score;
    let gradeString = (grade * 100).toFixed(2).toString() + " %";
    document.getElementById('grade').innerHTML = gradeString;

    // Update Users with Score
    let payload = { "id" : userID, "examScore" : grade.toString() };
    // console.log(payload);
    axios.post(setScoreURL,payload).then(response2 => {
        // console.log(response2);
    });

    // Update seconds per question in results table
    let payload2 = { "id" : userID };
    axios.post(setSecondsURL,payload2).then(response3 => {
        console.log(response3);
    });
});

// Get Pass-Fail Percentage
axios.get(getPassPctURL).then(response => {
    let passPct = (response.data.passFailPct * 100).toFixed(2).toString() + " %";
    document.getElementById('passgrade').innerHTML = passPct;
});



