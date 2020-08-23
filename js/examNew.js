
const form = document.querySelector('form');

const formEvent = form.addEventListener('submit', event => {
    event.preventDefault();

    const examName = document.querySelector('#examName').value;
    const examGroup = document.querySelector('#examGroup').value;
    var passFailPct = document.querySelector('#rate').value;
    if (passFailPct > 1) {
      passFailPct = passFailPct / 100;
    }
    const author = userID;

    const exam = { examName, examGroup, passFailPct, author};
    createExam(exam);
});


const createExam = (exam) => {
  axios.post(baseURL + 'api/exams/insert.php', exam).then(response => {
    const examCreated = response.data;
    console.log('POST: exam was created', examCreated);
    //window.location = baseURL + "mapQuest.php";
    location.replace(baseURL + "mapQuest.php?" + examCreated.examId + "");
  })
  .catch(error => console.log(error));
}


