import { renderList } from "../config/renderList.js";
import { getCookie } from "../authentication/getCookie.js";
import { result, getToken, getTokenValue } from "./get-token.js";

function editUser(event) {
  event.preventDefault();
  try {
    const formData = new FormData(formEdit);
    //Retrieve data from User Edit form
    const fName = formData.get("firstname").toString().trim();
    const lName = formData.get("lastname").toString().trim();
    const uName = document.getElementById("disabledInput").value;

    if (uName == null || uName == undefined || uName.length == 0) {
      throw new SyntaxError("You are not authorized for that action");
    }

    if (fName.length != 0 || lName.length != 0) {
      //If first name and last name fields aren't empty
      getToken(uName);
      setTimeout(function () {
        var userToken = result;
        const ajax = new XMLHttpRequest(); //database transaction request
        const method = "PUT";
        const url =
          "user/users.php/?token=" +
          userToken +
          "&fName=" +
          fName +
          "&lName=" +
          lName; //PHP file
        const asynchronous = true;
        ajax.open(method, url, asynchronous);
        ajax.send();
        ajax.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            formEdit.reset(); //reset User Edit form,
            formEdit.dataset.uname = ""; //Since the admin can edit other users,left the uname part blank here
            editModal.style.display = "none"; //edit user part is hidden
            renderList("users"); //users table is rendered again
          }
        };
      }, 100);
    }
  } catch (e) {
    alert(e.message);
  }
}

export { editUser };
