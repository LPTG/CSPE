// PHP Calling script added userID variable
// API URLs needed
const getUserURL = baseURL + 'api/users/readByKey.php?key=' + userID;

// Grab score
axios.get(getUserURL).then(response => {
    // console.log(response);
    
    let grade = (response.data.examScore * 100).toFixed(2).toString() + " %";
    document.getElementById('grade').innerHTML = grade;
});



