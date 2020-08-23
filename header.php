<nav class="navbar navbar-expand-sm navbar-ucf">
    <!-- Brand -->
    <a class="navbar-brand" href="admin.php">
        <img src="./images/pegasus.png" alt="Pegasus Logo"></a>
    <a class="navbar-brand" href="admin.php">University of Central Florida</a>

    <!-- Links -->
    <ul class="navbar-nav navbar-ucf">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ucf-colors" href="#" id="navbardrop1" data-toggle="dropdown">Users</a>
            <div class="dropdown-menu">
                <a class="dropdown-item ucf-colors" href="usersView.php">View</a>
                <a class="dropdown-item ucf-colors" href="createUser.php">Manual Add</a>
                <a class="dropdown-item ucf-colors" href="uploadUsers.php">Upload CSV</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ucf-colors" href="#" id="navbardrop2" data-toggle="dropdown">Exams</a>
            <div class="dropdown-menu">
                <a class="dropdown-item ucf-colors" href="examsView.php">View</a>
                <a class="dropdown-item ucf-colors" href="examNew.php">Create New</a>
                <a class="dropdown-item ucf-colors" href="editExam.php">Map Questions</a>
                <a class="dropdown-item ucf-colors" href="assignUsers.php">Assign Users</a>
                <a class="dropdown-item ucf-colors" href="instructions.php">Instructions</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ucf-colors" href="#" id="navbardrop3" data-toggle="dropdown">Questions</a>
            <div class="dropdown-menu">
                <a class="dropdown-item ucf-colors" href="questionsView.php">View Pool</a>
                <a class="dropdown-item ucf-colors" href="baseQuestionAdd.php">Add Base</a>
                <a class="dropdown-item ucf-colors" href="categoriesView.php">View Categories</a>
                <a class="dropdown-item ucf-colors" href="editExam.php">Adjust Exam Map</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ucf-colors" href="#" id="navbardrop4" data-toggle="dropdown">Statistics</a>
            <div class="dropdown-menu">
                <a class="dropdown-item ucf-colors" href="passFail.php">Pass/Fail Rates</a>
                <a class="dropdown-item ucf-colors" href="timings.php">Timings</a>
                <a class="dropdown-item ucf-colors" href="miscCount.php">Misc Counts</a>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link ucf-colors" href="logout.php">Logout</a>
        </li>
    </ul>
</nav>
