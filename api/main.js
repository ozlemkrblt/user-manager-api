//**************Import other ts files*****************************//
import { login } from './authentication/login.js';
import "./authentication/logout.js";
import {getCookie} from './authentication/getCookie.js';
import "./authentication/getCookie.js";
import "./config/renderList.js";
import { startEdit } from './user/startEdit.js';
import { stopEdit } from './user/stopEdit.js';
import { addPet } from "./pet/addPet.js";
import {deletePet} from "./pet/deletePet.js";
import "./pet/deleteUserPets.js";
import { editPet } from "./pet/editPet.js";
import {showAddPet} from "./pet/showAddPet.js";
import {startEditPet} from "./pet/startEditPet.js";
import {stopAddingPet} from "./pet/stopAddingPet.js";
import { stopEditPet } from "./pet/stopEditPet.js";
import { addUser } from "./user/addUser.js";
import "./user/deleteAccount.js";
import {deleteUser} from "./user/deleteUser.js";
import { editUser } from "./user/editUser.js";
import "./user/userSetting.js";

//**************Define the variables***************************//
let editModal;
let editPetModal;
let petModal;
let formEdit;
let petEdit;
let tableUser;
let tablePet;
let formLogin;
let addPetBtn;
let petForm;
let token;
let auth;


document.addEventListener("DOMContentLoaded", () => {
    //Connect the database
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "./config/db.php"; //PHP File
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
        }
    };
    //When the document is first opened,reset the cookies
    var userToken = getCookie("token");
    if(userToken == null){
        document.cookie = "token=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
        document.cookie = "auth=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
        document.cookie = "table=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
        document.cookie = "fw=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
        document.cookie = "username=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    }else{
        login(null, userToken);
    }
    //definitions of HTML elements
    const formInput = document.getElementById("formInput");
    const editClose = document.getElementById("editClose");
    const petClose = document.getElementById("petClose");
    const petEditClose = document.getElementById("petEditClose");
    tableUser = document.getElementById("tableUser");
    tablePet = document.getElementById("tablePet");
    formEdit = document.getElementById("formEdit");
    petEdit = document.getElementById("petEdit");
    petForm = document.getElementById("petForm");
    editModal = document.getElementById("editModal");
    editPetModal = document.getElementById("editPetModal");
    petModal = document.getElementById("petModal");
    formLogin = document.getElementById("formLogin");
    addPetBtn = document.getElementById("addNewPet");
    //EventListeners
    formInput.addEventListener("submit", addUser);
    petForm.addEventListener("submit", addPet);
    formEdit.addEventListener("submit", editUser);
    petEdit.addEventListener("submit", editPet);
    formLogin.addEventListener("submit", login);
    addPetBtn.addEventListener("click", showAddPet);
    editClose.addEventListener("click", stopEdit);
    petClose.addEventListener("click", stopAddingPet);
    petEditClose.addEventListener("click", stopEditPet);
    document.querySelectorAll("input").forEach(function (i) {
        i.addEventListener("keyup", controlSpecialCharacters);
    });
    tableUser.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".fa-trash")) {
            deleteUser(target);
        }
        else if (target.matches(".fa-pen")) {
            startEdit(target);
        }
    });
    tablePet.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".fa-trash")) {
            deletePet(target);
        }
        else if (target.matches(".fa-pen")) {
            startEditPet(target);
        }
    });
});
/*This method prevents input entries with special characters such as #, ', /, *, =, "
and vulnerabilities related to SQL.*/
function controlSpecialCharacters() {
    const f = this.value; //parameter for executing this method
    let newText;
    const char = f.split(''); //characters in 'f' variable is separated and defined as 'char'
    char.forEach(function (i) {
        if (i == '#' || i == '/' ||
            i == `'` || i == `"` ||
            i == '=' || i == '*') {
            /*special character is replaced with blank character
            and defined as "newText" */
            newText = f.replace(i, '');
        }
    });
    if (newText != null) { //if newText is not empty,
        this.value = newText; //new parameter is newText.
    }
}