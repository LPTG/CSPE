const form = document.querySelector('form');

const formEvent = form.addEventListener('submit', event => {
    event.preventDefault();

    const id = document.querySelector('#id').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const examID = document.querySelector('#examID').value;
    const examTimeLimit = document.querySelector('#examTimeLimit').value;
    const isAdmin = document.querySelector('#isAdmin').checked;
    const payload = {id, firstName, lastName, examID, examTimeLimit, isAdmin };
    createUser(payload);
});

const createUser = (payload) => {
    let createUserURL = baseURL + 'api/users/insert.php';
    axios.post(createUserURL, payload).then(response => {
        document.getElementById("alertArea").innerHTML = response.data.message;
        document.getElementById("alertArea").style.display = "block";
        console.log(response.data.message);
        // window.location.replace("usersView.php");
    });
    
}