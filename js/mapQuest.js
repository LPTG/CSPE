var $table = $('#table')
var $done = $('#done')
var count = 0
var questions = [];

//Getting the exam id to map to from the url
var link = window.location.href;
link = link.split('?').pop();
// link = link.replace("https://fullernetwork.com/mark/mapQuest.php?","");
var examID = Number(link);

$(function() {

    $table.on('check.bs.table', function (row, $element) {
        var questionID = $element.questionID;

        count = questions.push(questionID);
        // console.log('+ questions: ', questions);
        // console.log('+ count: ', count);

        if (questions.length >= 1){
            $done.prop('disabled', false);
            // alert('Perfect number of questions, complete this exam now!');
        }else
            $done.prop('disabled', true);
    });


    $table.on('uncheck.bs.table', function (row, $element) {
        var id = $element.questionID;
        count--;
        
        for (var i = 0; i < questions.length; i++){ 
            if ( questions[i] === id) { 
                questions.splice(i, 1); 
            }
        }
        // console.log('- questions: ', questions);
        // console.log('- count: ', count);

        if (questions.length >= 1){
            $done.prop('disabled', false);
            // alert('Perfect number of questions, complete this exam now!');
        }else
            $done.prop('disabled', true);

    });

});


function addQuestions() {
    const question = {examID, questions};
    console.log('sending: ', question);

    axios.post(baseURL + 'api/examContent/insertBulk.php', question)
    .then(response => {
      const questionAdded = response.data;
      console.log('POST: ', questionAdded);
      location.replace(baseURL + "examsView.php");
    })
    .catch(error => console.log(error));
}


