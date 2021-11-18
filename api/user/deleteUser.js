import { getCookie } from "../authentication/getCookie.js";
import { deleteUserPets } from "../pet/deleteUserPets.js";
import { renderList } from "../config/renderList.js";
import { result, getToken, getTokenValue } from "./get-token.js";

function deleteUser(target) {
  try {
    const uName = target.dataset.uname; //Define user name
    
    if (uName == undefined || uName == null || uName.length == 0) {
      throw new Error("User name is not defined");
    }

    const petItems = document.querySelectorAll(".petItem"); //choose all pet items
    const auth = getCookie("auth"); //save if user is authenticated

    if (auth == undefined || auth == null || auth.length == 0) {
      throw new Error("Auth cookie is not defined");
    }

    getToken(uName);
    document.cookie = "fw=false; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
    
    setTimeout(function () {
      var token = result;
      const ajax = new XMLHttpRequest(); //database transaction request
      const method = "DELETE";
      const url ="user/users.php/?token=" + token +"&auth=" + auth +"&fw=false&uName=" +uName; //PHP file
      const asynchronous = true;
      ajax.open(method, url, asynchronous);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //if it is succesfull,
          var list = []; //define an empty list,
          petItems.forEach(function (i) {
            /* if user name value that we retrieved from data,
                        matches with the username value coming from parameter ,
                        add these elements to the empty list. */
            if (i.getElementsByTagName("td")[0].innerHTML.includes(uName)) {
              list.push(i.getElementsByClassName("fa-trash")[0]);
            }
          });
          deleteUserPets(list); //send list to 'deleteUserPets' method
          
          renderList("users"); //render Pets and
          setTimeout(() => renderList("pets"), 100); // user Lists again.
          
          document.getElementById("userError").style.display = "none"; //Hide error messages if user had before
        } else if (this.status == 404) {
          alert("User not found");
        } else if (this.status == 403) {
          alert("You can't delete an admin user");
        }
        //'fw' value is deleted since user will finish user operation in 100 ms:
        setTimeout(
          () =>
            (document.cookie =
              "fw=; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/"),
          100
        );
      };
    }, 100);
  } catch (e) {
    alert(e.message);
  }
}

export { deleteUser };
