// Updated question buttons to only display version button if question is a base question
// Hidden form not using baseURL

var addQuestionURL = baseURL + 'baseQuestionAdd.php';
var getQuestionByKeyURL = baseURL + 'api/questions/readByKey.php';
var getCategoriesURL = baseURL + 'api/categories/read.php';
var deleteQuestionURL = baseURL + 'api/questions/delete.php';
var updateIfNoVersionsURL = baseURL + 'api/questions/updateIfNoVersions.php';

// Add category list to category filter dropdown select
axios.get(getCategoriesURL).then(response => {
    let categoryFilter = document.getElementById("categoryFilter");

    let option = document.createElement("option");
    option.text = "All";
    option.value = "All";
    categoryFilter.appendChild(option);

    for (let i in response.data) {
        let option = document.createElement("option");
        option.text = response.data[i].name;
        option.value = response.data[i].name;
        categoryFilter.appendChild(option);
    }
});

function viewAllQuestions() {
    $('#mytable').bootstrapTable('destroy');
    $('#mytable').bootstrapTable({
        url: baseURL + 'api/questions/read.php',
        pagination: true,
        pageSize: "5",
        search: true,
        showButtonText: true,
        showSearchClearButton: true,
        buttonsClass: "ucf",
        toolbar: "#toolbar",
        columns: [{
            field: 'questionID',
            title: 'ID',
            sortable: true
        }, {
            field: 'category',
            title: 'Category',
            sortable: true
        }, {
            field: 'stem',
            title: 'Stem'
        }, {
            field: 'figure',
            title: 'Figure',
            visible: false // All null for now
        }, {
            field: 'choiceA',
            title: 'Choice A'
        }, {
            field: 'choiceB',
            title: 'Choice B',
        }, {
            field: 'choiceC',
            title: 'Choice C'
        }, {
            field: 'choiceD',
            title: 'Choice D'
        }, {
            field: 'choiceE',
            title: 'Choice E'
        }, {
            field: 'answer',
            title: 'Answer'
        }, {
            field: 'versioned',
            title: 'Versioned',
            visible: false
        }, {
            field: 'parentQuestion',
            title: 'Parent Question',
            visible: false
        }, {
            field: 'usedBefore',
            title: 'Used',
            visible: false
        }, {
            field: 'editOrVersion',
            title: 'Edit/Verison',
            formatter: 'editFormatter',
            align: 'center'
        }]
    });

    // Add on click function to filterBy button
    $('#filterBy').click(function () {

        // Get selected category
        var categoryFilter = $('[name="categoryFilter"]').val();

        // Clear filters if set to 'All'
        if (categoryFilter == 'All') {
            $('#mytable').bootstrapTable('filterBy', {
                category: ['General', 'Conditionals', 'Loops', 'Functions']
            })
        }
        else {
            // Filter by selected category
            $('#mytable').bootstrapTable('filterBy', {
                category: categoryFilter
            })
        }
    })
}

function editFormatter(value, row, index) {
    document.getElementById("alertArea").style.display = "none";

    // If question is a base question and hasn't been used before
    if (row.parentQuestion == row.questionID && !row.usedBefore) {
        // If the question is not versioned then we can delete it
        if (!row.versioned) {
            return [
                '<a href="javascript:void(0)" onclick="edit(' + row.questionID + ');" title="Edit Question">' +
                '<i class="fa fa-edit fa-2x ucf-colors"></i>' +
                '</a>    ' +
                '<a href="javascript:void(0)" onclick="addVersion(' + row.questionID + ');" title="Add Version">' +
                '<i class="fa fa-plus fa-2x ucf-colors"></i>' +
                '</a>    ' +
                '<a href="javascript:void(0)" onclick="deleteQuestion(\'' + row.questionID + '\', \'' + row.parentQuestion + '\');" title="Delete Question">' +
                '<i class="fa fa-trash fa-2x ucf-colors"></i>' +
                '</a>'
            ]
        } else {
            return [
                '<a href="javascript:void(0)" onclick="edit(' + row.questionID + ');" title="Edit Question">' +
                '<i class="fa fa-edit fa-2x ucf-colors"></i>' +
                '</a>    ' +
                '<a href="javascript:void(0)" onclick="addVersion(' + row.questionID + ');" title="Add Version">' +
                '<i class="fa fa-plus fa-2x ucf-colors"></i>' +
                '</a>'
            ]
        }
        // If question is a base question and has been used before
    } else if (row.parentQuestion == row.questionID && row.usedBefore) {
        return [
            '<a href="javascript:void(0)" onclick="addVersion(' + row.questionID + ');" title="Add Version">' +
            '<i class="fa fa-plus fa-2x ucf-colors"></i>' +
            '</a>'
        ]
        // If question is not a base question and hasn't been used before
    } else if (row.parentQuestion != row.questionID && !row.usedBefore) {
        return [
            '<a href="javascript:void(0)" onclick="edit(' + row.questionID + ');" title="Edit Question">' +
            '<i class="fa fa-edit fa-2x ucf-colors"></i>' +
            '</a>    ' +
            '<a href="javascript:void(0)" onclick="deleteQuestion(\'' + row.questionID + '\', \'' + row.parentQuestion + '\');" title="Delete Question">' +
            '<i class="fa fa-trash fa-2x ucf-colors"></i>' +
            '</a>'
        ]
        // If question is not a base question and has been used before
    } else if (row.parentQuestion != row.questionID && row.usedBefore) {
        return [
            'Cannot Edit'
        ]
    }
}

function setHiddenFields(question, edit) {
    // Get question with questionID
    axios.get(getQuestionByKeyURL + "?key=" + question).then(response => {
        // Set hidden form data to question fields
        document.getElementById("questionID").value = response.data.questionID;
        document.getElementById("parentQuestion").value = response.data.parentQuestion;
        document.getElementById("stem").value = response.data.stem;
        document.getElementById("figure").value = response.data.figure;
        document.getElementById("choiceA").value = response.data.choiceA;
        document.getElementById("choiceB").value = response.data.choiceB;
        document.getElementById("choiceC").value = response.data.choiceC;
        document.getElementById("choiceD").value = response.data.choiceD;
        document.getElementById("choiceE").value = response.data.choiceE;
        document.getElementById("answer").value = response.data.answer;
        document.getElementById("category").value = response.data.category;
        document.getElementById("versioned").value = response.data.versioned;
        document.getElementById("edit").value = edit;

        // Submit the form
        document.getElementById("questionAddForm").submit();
    });
}

function edit(questionToEdit) {
    // Set fields and set edit flag to true
    setHiddenFields(questionToEdit, true);
}

function addVersion(questionToVersion) {
    // Set fields and set edit flag to false
    setHiddenFields(questionToVersion, false);
}

function deleteQuestion(questionToDelete, parentQuestion) {
    axios.post(deleteQuestionURL, { "questionID": questionToDelete }).then((response) => {
        // Can not delete questions that are assigned to an exam
        if (response.data.message === "Could not delete question") {
            let message = "Cannot delete a question that is currently assigned to an exam.";
            document.getElementById("alertArea").innerHTML = message;
            document.getElementById("alertArea").style.display = "block";

            $('html, body').animate({
                scrollTop: $("#top").offset().top
            }, 250);

            return;
        }

        // If deleted question was a version, check parent question to see if it has any children
        axios.put(updateIfNoVersionsURL, { "questionID": parentQuestion }).then(() => {
            location.reload(true);
        });
    });
}

document.getElementById("alertArea").style.display = "none";
viewAllQuestions();