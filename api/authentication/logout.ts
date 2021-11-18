import { stopAddingPet } from "../pet/stopAddingPet";
import { stopEditPet } from "../pet/stopEditPet";
import { stopEdit } from "../user/stopEdit";

let token;
let auth;
function logout() {
    //Register form in main page is shown to user again
    document.getElementById("registerForm").style.display = "block";
    //navbar is modified , login form is shown again
    document.getElementById("userinfo").innerHTML = `
            <li class="nav-item dropdown-user" id="userinfo">
                <a type="button" href="#" data-toggle="modal" data-target="#exampleModalCenter" class="nav-link d-flex align-items-center">
                    <div class="d-sm-flex d-none user-nav">
                        <p class="mb-0 ml-1">Login</p>
                    </div>
                </a>
            </li>
            `;
    //pets and users tables are closed
    document.getElementById("yourPets").style.display = "none";
    document.getElementById("secret").style.display = "none";
    //cookie data are resetted
    document.cookie = "token=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "auth=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "table=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "username=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    token = '';
    auth = null;
    //listed elements in users and pets tables are removed
    document.querySelectorAll("td").forEach(function (e) { e.remove(); });
    stopEdit();
    stopEditPet();
    stopAddingPet();
}

export {logout};

