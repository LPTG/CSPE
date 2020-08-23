var getCategoriesURL = baseURL + 'api/categories/read.php';
var setQuestionURL = baseURL + 'api/questions/insert.php';
var updateQuestionURL = baseURL + 'api/questions/update.php';
var updateVersionedURL = baseURL + 'api/questions/updateVersioned.php';

// What should parentQuestion be set to as a base question? Default to questionID?
// Need to set "versioned" field of parent question to 1 when we add a version to a question
// Need to only let users update questions that have not been inserted into the results table
// Should only let users version questions that are base questions?

// Initialize tinymce editors
tinymce.init({
    selector: '.stem',
    branding: false,
    plugins: 'code lists advlist link autolink charmap nonbreaking paste preview',
    toolbar: 'undo redo | styleselect | forecolor backcolor bold italic' +
        ' | outdent indent | numlist bullist | charmap nonbreaking | paste pastetext | code'
});

tinymce.init({
    selector: '.choice',
    branding: false,
    plugins: 'code lists advlist link autolink charmap nonbreaking paste preview',
    toolbar: 'undo redo | styleselect | forecolor backcolor bold italic' +
        ' | outdent indent | numlist bullist | charmap nonbreaking | paste pastetext | code'
});

// Add category list to "Category" dropdown select
axios.get(getCategoriesURL).then(response => {
    let categorySelect = document.getElementById("category");

    for (let i in response.data) {
        let option = document.createElement("option");
        option.text = response.data[i].name;
        option.value = response.data[i].name;
        categorySelect.appendChild(option);
    }
});

document.getElementById("updateQuestionBtn").classList.add("d-none");
document.getElementById("addVersionBtn").classList.add("d-none");

// Set the fields of the form
// question: [questionID, parentQuestion, stem, figure, choiceA, choiceB, choiceC, choiceD, choiceE, answer, category, versioned]
function setFields(question, edit) {
    // Set all fields once the page is finished loading
    window.onload = function () {
        tinyMCE.get('stem').setContent(question[2]);
        tinyMCE.get('choiceA').setContent(question[4]);
        tinyMCE.get('choiceB').setContent(question[5]);
        tinyMCE.get('choiceC').setContent(question[6]);
        tinyMCE.get('choiceD').setContent(question[7]);
        tinyMCE.get('choiceE').setContent(question[8]);

        document.getElementById("questionID").value = question[0];
        document.getElementById("parentQuestion").value = question[1];
        document.getElementById("versioned").value = question[11];

        $("#answer").val(question[9]);
        $("#category").val(question[10]);
    }

    if (edit) {
        document.getElementById("updateQuestionBtn").classList.remove("d-none");
        document.getElementById("addQuestionBtn").classList.add("d-none");
        document.getElementById("addVersionBtn").classList.add("d-none");
    } else {
        document.getElementById("addVersionBtn").classList.remove("d-none");
        document.getElementById("addQuestionBtn").classList.add("d-none");
        document.getElementById("updateQuestionBtn").classList.add("d-none");
    }
}

// Clear fields and scroll to the top
function resetPage() {
    tinyMCE.get('stem').setContent('');
    tinyMCE.get('choiceA').setContent('');
    tinyMCE.get('choiceB').setContent('');
    tinyMCE.get('choiceC').setContent('');
    tinyMCE.get('choiceD').setContent('');
    tinyMCE.get('choiceE').setContent('');

    document.getElementById("questionID").value = '';
    document.getElementById("parentQuestion").value = '';
    document.getElementById("versioned").value = '';

    $("select").prop("selectedIndex", 0);

    $('html, body').animate({
        scrollTop: $("#top").offset().top
    }, 250);
}

function addQuestion() {
    if (checkInputs()) {
        submitForm(false, false);
    }
}

function updateQuestion() {
    if (checkInputs()) {
        submitForm(false, true);
    }
}

function versionQuestion() {
    if (checkInputs()) {
        var parentQuestion = document.getElementById("parentQuestion").value;

        // Update parent question's "versioned" field
        axios.put(updateVersionedURL, { "questionID": parentQuestion }).then((res) => {
            submitForm(true, false);
        })
    }
}

function submitForm(isVersioned, isUpdated) {
    var questionID = (document.getElementById("questionID").value ? document.getElementById("questionID").value : null);
    var parentQuestion = (document.getElementById("parentQuestion").value ? document.getElementById("parentQuestion").value : null);
    var versioned = document.getElementById("versioned").value;

    if (versioned || versioned == 0) {
        versioned = 0;
    } else {
        versioned = 1;
    }

    if (isVersioned) {
        versioned = 1;
    }

    let postData =
    {
        "questionID": questionID,
        "parentQuestion": parentQuestion,
        "stem": tinyMCE.get('stem').getContent().trim(),
        "figure": null,
        "choiceA": tinyMCE.get('choiceA').getContent().trim(),
        "choiceB": tinyMCE.get('choiceB').getContent().trim(),
        "choiceC": tinyMCE.get('choiceC').getContent().trim(),
        "choiceD": tinyMCE.get('choiceD').getContent().trim(),
        "choiceE": tinyMCE.get('choiceE').getContent().trim(),
        "answer": document.getElementById("answer").value.trim(),
        "category": document.getElementById("category").value,
        "versioned": versioned
    };

    if (isUpdated) {
        axios.post(updateQuestionURL, postData).then(response => {
            document.getElementById("questionAddForm").submit();
            resetPage();
        });
    } else {
        axios.post(setQuestionURL, postData).then(response => {
            document.getElementById("questionAddForm").submit();
            resetPage();
        }).catch(function (error) {
            if (error.response) {
                // Deal with errors
            }
        });
    }
}

function checkInputs() {
    // Get required fields
    let stem = tinyMCE.get('stem').getContent().trim();
    let choiceA = tinyMCE.get('choiceA').getContent().trim();
    let choiceB = tinyMCE.get('choiceB').getContent().trim();
    let answer = document.getElementById("answer").value;
    let finish = true;

    // Get required field warnings
    let stemReq = document.getElementById("stemReq");
    let aReq = document.getElementById("aReq");
    let bReq = document.getElementById("bReq");
    let validAnswer = document.getElementById("validAns");

    // Reset required field warnings
    stemReq.classList.remove("text-danger");
    stemReq.classList.remove("font-weight-bold");
    stemReq.classList.add("text-muted");
    aReq.classList.remove("text-danger");
    aReq.classList.remove("font-weight-bold");
    aReq.classList.add("text-muted");
    bReq.classList.remove("text-danger");
    bReq.classList.remove("font-weight-bold");
    bReq.classList.add("text-muted");
    validAnswer.classList.add("d-none");

    // Check if stem is empty
    if (stem == "") {
        stemReq.classList.remove("text-muted");
        stemReq.classList.add("text-danger");
        stemReq.classList.add("font-weight-bold");
        finish = false;
    }

    // Check if choiceA is empty
    if (choiceA == "") {
        aReq.classList.remove("text-muted");
        aReq.classList.add("text-danger");
        aReq.classList.add("font-weight-bold");
        finish = false;
    }

    // Check if choiceB is empty
    if (choiceB == "") {
        bReq.classList.remove("text-muted");
        bReq.classList.add("text-danger");
        bReq.classList.add("font-weight-bold");
        finish = false;
    }

    // Scroll to required sections of question
    if (stem == "") {
        $('html, body').animate({
            scrollTop: $("#stemReq").offset().top
        }, 500);
    } else if (choiceA == "") {
        $('html, body').animate({
            scrollTop: $("#aReq").offset().top
        }, 500);
    } else if (choiceB == "") {
        $('html, body').animate({
            scrollTop: $("#bReq").offset().top
        }, 500);
    }

    // Check if answer value is a choice that is not empty
    let choice = "choice" + answer.toUpperCase();
    if (tinyMCE.get(choice).getContent().trim() == "") {
        validAnswer.classList.remove("d-none");
        finish = false;
    }

    return finish;
}