<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
    <!-- Begin SEO tag -->
    <title>Infinite Multiple Level Dropdown Menu base on Bootstrap</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>.dropdown-hover-all .dropdown-menu, .dropdown-hover > .dropdown-menu { margin:0 }</style>
</head>

<body class="">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Demo <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown dropdown-hover">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hover</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <a class="dropdown-item" href="#">Single App</a>
                        <a class="dropdown-item" href="#">Multiple Works</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Disctribution</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Documents</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown02">
                        <a class="dropdown-item" href="#">Introduction</a>
                        <div class="dropdown dropright">
                            <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Layouts</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                                <a class="dropdown-item" href="#">Basic</a>
                                <a class="dropdown-item" href="#">Compact Aside</a>
                                <div class="dropdown-divider"></div>
                                <div class="dropdown dropright">
                                    <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>
                                    <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                                        <a class="dropdown-item" href="#">Fullscreen</a>
                                        <a class="dropdown-item" href="#">Empty</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Magic</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="https://github.com/dallaslu/bootstrap-4-multi-level-dropdown">View on Github</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container" style="padding-top: 3.5rem">
        <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <div class="dropdown dropright">
                    <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Layouts</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                        <a class="dropdown-item" href="#">Basic</a>
                        <a class="dropdown-item" href="#">Compact Aside</a>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown dropright">
                            <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                                <a class="dropdown-item" href="#">Fullscreen</a>
                                <a class="dropdown-item" href="#">Empty</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Magic</a>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
        <div class="row dropdown-hover-all">
          <div class="dropdown mt-3">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown Hover
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <div class="dropdown dropright">
                      <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Layouts</a>
                      <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                          <a class="dropdown-item" href="#">Basic</a>
                          <a class="dropdown-item" href="#">Compact Aside</a>
                          <div class="dropdown-divider"></div>
                          <div class="dropdown dropright">
                              <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>
                              <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                                  <a class="dropdown-item" href="#">Fullscreen</a>
                                  <a class="dropdown-item" href="#">Empty</a>
                                  <div class="dropdown-divider"></div>
                                  <a class="dropdown-item" href="#">Magic</a>
                              </div>
                          </div>
                      </div>
                  </div>
                  <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="./menubar.js"></script>
    <h1>Example by dalluslu</h1>
    <a href="https://stackoverflow.com/questions/44467377/bootstrap-4-multilevel-dropdown-inside-navigation" target="_blank">Stackoverflow Article</a>
</body>

</html>