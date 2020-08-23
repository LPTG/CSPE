var addCategoryURL = baseURL + '/api/categories/insert.php';
var updateCategoryURL = baseURL + '/api/categories/update.php';
var deleteCategoryURL = baseURL + '/api/categories/delete.php';

function viewAllCategories() {
    $('#mytable').bootstrapTable('destroy');
    $('#mytable').bootstrapTable({
        url: baseURL + 'api/categories/read.php',
        pagination: true,
        pageSize: "10",
        search: true,
        showButtonText: true,
        showSearchClearButton: true,
        buttonsClass: "ucf",
        toolbar: "#toolbar",
        columns: [{
            field: 'name',
            title: 'Category Name',
            sortable: true
        }, {
            field: 'usedBefore',
            title: 'Used',
            visible: false
        }, {
            field: 'editOrVersion',
            title: 'Edit/Delete',
            formatter: 'editFormatter',
            align: 'center'
        }]
    });
}

function editFormatter(value, row, index) {
    if (row.usedBefore) {
        return [
            'Cannot Edit'
        ]
    } else {
        return [
            '<a href="javascript:void(0)" onclick="toggleEditForm(\'' + row.name + '\');" title="Edit Category">' +
            '<i class="fa fa-edit fa-2x ucf-colors"></i>' +
            '</a>    ' +
            '<a href="javascript:void(0)" onclick="toggleDeleteForm(\'' + row.name + '\');" title="Delete Category">' +
            '<i class="fa fa-trash fa-2x ucf-colors"></i>' +
            '</a>'
        ]
    }
}

// Add/Edit/Delete form submit handlers
function addCategory() {
    var postData = {
        "name": document.getElementById("addCategoryInput").value
    }

    console.log(postData);

    axios.post(addCategoryURL, postData).then((result) => {
        document.getElementById("addCategoryForm").submit();
        resetPage();
    });
}

function editCategory() {
    var postData = {
        "prevName": document.getElementById("editCategoryField").value,
        "name": document.getElementById("editCategoryInput").value
    }

    axios.post(updateCategoryURL, postData).then((result) => {
        document.getElementById("editCategoryForm").submit();
        resetPage();
    });
}

function deleteCategory() {
    var name = document.getElementById("deleteCategoryField").value;

    var postData = {
        "name": name
    }

    console.log(postData);

    axios.post(deleteCategoryURL, postData).then((result) => {
        document.getElementById("deleteCategoryForm").submit();
        resetPage();
    });
}


// Form show/hide toggle functions
function toggleAddForm() {
    var addCategoryForm = document.getElementById("addCategoryForm");

    // If the add category form is hidden
    if (addCategoryForm.classList.contains("d-none")) {
        hideForms()
        addCategoryForm.classList.remove("d-none");
    }
    else {
        addCategoryForm.classList.add("d-none");
    }
}

function toggleEditForm(name) {
    var editCategoryForm = document.getElementById("editCategoryForm");
    var editCategoryField = document.getElementById("editCategoryField");
    var editCategoryInput = document.getElementById("editCategoryInput");

    // If the edit category form is hidden
    if (editCategoryForm.classList.contains("d-none")) {
        hideForms();
        editCategoryForm.classList.remove("d-none");
        editCategoryField.value = name;
        editCategoryInput.value = name;
    } else {
        if (editCategoryField.value != name) {
            editCategoryField.value = name;
            editCategoryInput.value = name;
        } else {
            editCategoryForm.classList.add("d-none");
            editCategoryField.value = "";
        }
    }
}

function toggleDeleteForm(name) {
    var deleteCategoryForm = document.getElementById("deleteCategoryForm");
    var deleteCategoryField = document.getElementById("deleteCategoryField");
    var deleteWarning = document.getElementById("deleteWarning");

    if (deleteCategoryForm.classList.contains("d-none")) {
        hideForms();
        deleteCategoryForm.classList.remove("d-none");
        deleteCategoryField.value = name;
        deleteWarning.innerHTML = "Are you sure you would like to delete category '" + name + "'? This can not be undone."
    } else {
        if (deleteCategoryField.value != name) {
            deleteCategoryField.value = name;
            deleteWarning.innerHTML = "Are you sure you would like to delete category '" + name + "'? This can not be undone."
        } else {
            deleteCategoryForm.classList.add("d-none");
            deleteCategoryField.value = "";
        }
    }
}

function cancelDelete() {
    document.getElementById("deleteCategoryForm").classList.add("d-none");
    document.getElementById("deleteCategoryField").value = "";
}

function hideForms() {
    document.getElementById("addCategoryForm").classList.add("d-none");
    document.getElementById("editCategoryForm").classList.add("d-none");
    document.getElementById("deleteCategoryForm").classList.add("d-none");
}

function resetPage() {
    hideForms();

    document.getElementById("editCategoryField").value = "";
    document.getElementById("deleteCategoryField").value = "";
}

viewAllCategories();