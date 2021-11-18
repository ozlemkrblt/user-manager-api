import {getCookie} from '../authentication/getCookie.js';

function userSetting() {
    
    try{
    const uName = getCookie("username"); //Username is defined by using cookies
    if (uName == null || uName == undefined ||uName.length== 0 ) { throw new SyntaxError("You are not authorized for that action"); }
    //Cookies are set:
    //'table' cookie is set as 'users' for indicating editing process
    document.cookie = "table=users; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
    //'fw' cookie is set as true for indicating user is doing an operation about him/herself
    document.cookie = "fw=true; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
    //database transaction request (without sending data to PHP file)
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "config/get-data.php"; // PHP file 
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //results are turned into JSON
            data.forEach(function (i) {
                //if'uName' value coming from users info that we retrieved from data, matches with the uName value we want to do operation
                if (i.uName == uName) {
                    //Information from data is written in the input fields in form:
                    formEdit.dataset.uname = i.uName;
                    formEdit.elements.namedItem("username").value = i.uName;
                    formEdit.elements.namedItem("firstname").value = i.fName;
                    formEdit.elements.namedItem("lastname").value = i.lName;
                }
            });
        }
    };
    editModal.style.display = "block"; //User edit part is shown to the user
    //'fw' value is deleted since user will finish user operation in 100 ms:
    setTimeout(() => document.cookie = "fw=; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/", 100);
    }catch(e){
        console.log(e.message);
    }
    
}
export {userSetting};