import { renderList } from '../config/renderList.js';
import { userSetting } from '../user/userSetting.js';
import { logout } from '../authentication/logout.js';
import { deleteAccount } from '../user/deleteAccount.js';
import { hideOtherPets } from '../pet/hideOtherPets.js';

var token;
var auth;
function login(event, token) {
    var tryName;
    var tryPassword;
    if (token != null) { //if user has logged in before
        var ajax = new XMLHttpRequest(); //database transaction request ( without sending data)
        var method = "GET";
        var url = "user/get-user-information.php";  //PHP file
        var asynchronous = true;
        ajax.open(method, url, asynchronous);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText); //Results are turned into JSON
                //register form and login modal is closed
                document.getElementById("exampleModalCenter").click();
                document.getElementById("registerForm").style.display = "none";
                //navbar is modified for showing user information and options
                document.getElementById("userinfo").innerHTML = "\n                <li class=\"nav-item dropdown dropdown-user\">\n                    <a role=\"button\" aria-expanded=\"false\" aria-haspopup=\"true\" href=\"#\" target=\"_self\" class=\"nav-link dropdown-toggle d-flex align-items-center dropdown-user-link\" id=\"User_toggle\">\n                        <div class=\"d-sm-flex d-none user-nav\">\n                            <p class=\"mb-0 ml-1\" id=\"navbarUname\" data-uname=\"" + data.uName + "\">" + data.uName + "</p>\n                        </div>\n                    </a>\n                    <ul tabindex=\"-1\" class=\"dropdown-menu dropdown-menu-right\" data-target=\"User_toggle\">\n                        <li role=\"presentation\">\n                            <a href=\"#\" data-uname=\"" + data.uName + "\" class=\"dropdown-item d-flex align-items-center\" id=\"settingsBtn\">\n                                <span>Settings</span>\n                            </a>\n                        </li>\n                        <li role=\"presentation\">\n                            <a href=\"#\" class=\"dropdown-item d-flex align-items-center\" id=\"logoutBtn\">\n                                <span>Logout</span>\n                            </a>\n                        </li>\n                        <li role=\"presentation\">\n                            <a href=\"#\" data-uname=\"" + data.uName + "\" class=\"dropdown-item d-flex align-items-center text-danger\" style=\"color:#dc3545!important;\" id=\"deleteBtn\">\n                                <span>Delete my account</span>\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n                ";
                document.getElementById("User_toggle").addEventListener("click", function () { openUserDropDown(this) });
                document.getElementById("settingsBtn").addEventListener("click", function () { userSetting(this) });
                document.getElementById("logoutBtn").addEventListener("click", function () { logout() });
                document.getElementById("deleteBtn").addEventListener("click", function () { deleteAccount(this) });
                //pets table is visible ve and username is written into user name part in the table
                document.getElementById("uNameForPet").value = data.uName;
                document.getElementById("yourPets").style.display = "block";
                //token and auth is defined in the javascript file
                var auth = true;
                if (data.uName !== "Ozlem") {
                    auth = false;
                }
                var token = data.token;
                
                //token and auth informations are saved as cookies

                document.cookie = "token=" + token + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                document.cookie = "auth=" + auth + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                document.cookie = "fw=; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                document.cookie = "username=" + data.uName + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                if (auth) { // if user is authenticated ( admin) 
                    //users and pets tables are shown without any filter
                    document.getElementById("secret").style.display = "block";
                    renderList("pets");
                    setTimeout(function () { return renderList("users"); }, 10);
                }
                else {
                    //only pets table is shown and filtered
                    renderList("pets");
                    hideOtherPets(data.uName);
                }
                //success and error messages are hidden
                document.getElementById("registerSuccess").style.display = "none";
                document.getElementById("loginErrorArea").style.display = "none";
            }
        };
    } else { // if user hasn't logged in before
        event.preventDefault();
        //values that coming as input from user
        tryName = document.getElementById("loginUname").value;
        tryPassword = document.getElementById("loginPword").value;

        $.ajax({        //database transaction request
            url: "authentication/login.php",             //PHP file
            type: "POST",
            data: {
                uName: tryName,
                pw: tryPassword
            },
            cache: false,
            statusCode: {
                422: function (_textStatus="error") {
                    document.getElementById("loginErrorArea").style.display = "block";
                    document.getElementById("loginErrorArea").innerHTML = "<p class=\"text-danger px-4\">incorrect username or password</p>";
                },
                200: function (dataResult,_textStatus="success") {
                    dataResult = JSON.parse(dataResult);
                    document.getElementById("exampleModalCenter").click();
                    document.getElementById("registerForm").style.display = "none";
                    //navbar is modified for showing user information and options
                    document.getElementById("userinfo").innerHTML = "\n                <li class=\"nav-item dropdown dropdown-user\">\n                    <a role=\"button\" aria-expanded=\"false\" aria-haspopup=\"true\" href=\"#\" target=\"_self\" class=\"nav-link dropdown-toggle d-flex align-items-center dropdown-user-link\" id=\"User_toggle\">\n                        <div class=\"d-sm-flex d-none user-nav\">\n                            <p class=\"mb-0 ml-1\" id=\"navbarUname\" data-uname=\"" + dataResult.username + "\">" + dataResult.username + "</p>\n                        </div>\n                    </a>\n                    <ul tabindex=\"-1\" class=\"dropdown-menu dropdown-menu-right\" data-target=\"User_toggle\">\n                        <li role=\"presentation\">\n                            <a href=\"#\" data-uname=\"" + dataResult.username + "\" class=\"dropdown-item d-flex align-items-center\" id=\"settingsBtn\">\n                                <span>Settings</span>\n                            </a>\n                        </li>\n                        <li role=\"presentation\">\n                            <a href=\"#\" class=\"dropdown-item d-flex align-items-center\" id=\"logoutBtn\">\n                                <span>Logout</span>\n                            </a>\n                        </li>\n                        <li role=\"presentation\">\n                            <a href=\"#\" data-uname=\"" + dataResult.username + "\" class=\"dropdown-item d-flex align-items-center text-danger\" style=\"color:#dc3545!important;\" id=\"deleteBtn\">\n                                <span>Delete my account</span>\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n                ";
                    document.getElementById("User_toggle").addEventListener("click", function () { openUserDropDown(this) });
                    document.getElementById("settingsBtn").addEventListener("click", function () { userSetting(this) });
                    document.getElementById("logoutBtn").addEventListener("click", function () { logout() });
                    document.getElementById("deleteBtn").addEventListener("click", function () { deleteAccount(this) });
                    //pets table is visible ve and username is written into user name part in the table
                    document.getElementById("uNameForPet").value = dataResult.username;
                    document.getElementById("yourPets").style.display = "block";
                    //token and auth is defined in the javascript file
                    var token = dataResult.token;
                    var auth = dataResult.auth;
                    
                    //token and auth informations are saved as cookies
                    
                    document.cookie = "token=" + token + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                    document.cookie = "auth=" + auth + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                    document.cookie = "fw=; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                    document.cookie = "username=" + dataResult.username + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                    if (auth) { // if user is authenticated ( admin) 

                        //users and pets tables are shown without any filter
                        document.getElementById("secret").style.display = "block";
                        renderList("pets");
                        setTimeout(function () { return renderList("users"); }, 10);
                    }
                    else {
                        //only pets table is shown and filtered
                        renderList("pets");
                        hideOtherPets(dataResult.username);
                    }
                    //success and error messages are hidden                    
                    document.getElementById("registerSuccess").style.display = "none";
                    document.getElementById("loginErrorArea").style.display = "none";
                }
            },

        });
    }
    setTimeout(function () { logout() }, 900000);
}

export { login };