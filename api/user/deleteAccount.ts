import { getCookie } from "../authentication/getCookie";
import { getToken, result, getTokenValue } from "./get-token";
import { deletePet } from "../pet/deletePet";
import { renderList } from "../config/renderList";
import { logout } from "../authentication/logout";

function deleteAccount(event: HTMLElement) {
  try {
    const uName: string = event.getAttribute("data-uname"); //username is defined

    if (uName == undefined || uName == null || uName.length == 0) {
      throw new Error("User name is not defined");
    }

    const petItems: any = document.querySelectorAll(".petItem"); //Select all pet items

    const auth: string = getCookie("auth"); //save if user is authenticated

    getToken(uName);
    document.cookie = "fw=true; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";

    if (auth == undefined || auth == null || auth.length == 0) {
      throw new Error("Auth cookie is not defined");
    }

    setTimeout(function () {
      var token = result;
      const ajax = new XMLHttpRequest(); //database transaction request
      const method = "DELETE";
      const url =
        "user/users.php/?token=" + token + "&uName=" + uName + "&auth=" + auth; //PHP file
      const asynchronous = true;
      ajax.open(method, url, asynchronous);
      ajax.send();
      ajax.onreadystatechange = function (dataResult: any) {
        if (this.readyState == 4 && this.status == 200) {
          // if it is successful,

          let list: any; //define an empty list
          petItems.forEach(function (i) {
            /* if user name value coming from pet info that we retrieved from data, 
                    matches with the username value coming from parameter ,
                    add these elements to the empty list. */
            if (i.getElementsByTagName("td")[0].innerHTML.includes(uName)) {
              list.push(i.getElementsByClassName("fa-trash")[0]);
            }
          });

          deleteUserPets(list); //send list to the "deleteUserPets" function
          renderList("pets"); //render pets table again
          setTimeout(() => logout(), 10); // 10 ms later, logout is done.
          document.getElementById("userError").style.display = "none"; //User error messages from before is hidden
        } else if (this.status == 403) {
          alert("you can't delete an admin user");
          document.getElementById("userError").style.display = "block";
          document.getElementById("userError").innerHTML =
            "An error occurred while deleting the account! You can't delete an admin user.";
        } else if (this.status == 400) {
          alert("you're not authorized for do that");
          document.getElementById("userError").style.display = "block";
          document.getElementById("userError").innerHTML =
            "An error occurred while deleting the account! You're not authorized for do that.";
        }
      };
    }, 100);
  } catch (e) {
    alert(e.message);
  }
}

function deleteUserPets(items) {
  var isUserDeleted = true;
  for (let i = 0; i < items.length; i++) {
    //This method sends all items coming from parameter
    deletePet(items[i], isUserDeleted); // to the  ' deletePet' method with a for loop.
  }
}

export { deleteAccount };
