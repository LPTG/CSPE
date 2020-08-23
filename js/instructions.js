var getInstructionsURL = baseURL + 'api/exams/getInstructions.php';
var setInstructionsURL = baseURL + 'api/exams/setInstructions.php';

axios.get(getInstructionsURL).then(response => {
    // console.log(response);
    document.getElementById('instructions').innerHTML = response.data[0].instructions;

    tinymce.init({
        selector:'textarea', 
        setup: function (editor) {
            editor.on('change', function () {
                editor.save();
            });
        },
        branding: false, 
        autoresize_bottom_margin: 0,
        plugins:'code lists advlist link autolink autoresize charmap nonbreaking paste preview', 
        toolbar:'undo redo | styleselect | forecolor backcolor bold italic' +
             ' | outdent indent | numlist bullist | charmap nonbreaking | paste pastetext | code'
    });
});

function cancel() {
    window.location.replace("examsView.php");
}

function save() {
    // TinyMCE uses a hiddent text area. Before the value is retrieved, the actual text area
    //   must be updated from the hidden textarea. This is done with the setup section
    //   of the initialization above which saves the changes as it is being updated. 
    let instructions = document.getElementById('instructions').value;
    let payload = { "instructions" : instructions};
    // console.log(payload);
    axios.post(setInstructionsURL, payload).then(response => {
        window.location.replace("examsView.php");
        // console.log(response);
    });
}