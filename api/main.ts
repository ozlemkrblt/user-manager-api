//**************Import other ts files*****************************//
import { login} from './authentication/login';
import "./authentication/logout.js";
import "./authentication/getCookie.js";
import "./config/renderList.js";
import { startEdit } from './user/startEdit';
import { stopEdit } from './user/stopEdit';
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

//*******************Define variables******************************************//

let editModal: HTMLElement;
let editPetModal: HTMLElement;
let petModal: HTMLElement;
let formEdit: HTMLFormElement;
let petEdit: HTMLFormElement;
let tableUser: HTMLElement;
let tablePet: HTMLElement;
let formLogin: HTMLFormElement;
let addPetBtn: HTMLElement;
let petForm: HTMLFormElement;
let token: string;
let auth: boolean;


document.addEventListener("DOMContentLoaded", ()=>{
    //Connect the database
    var ajax = new XMLHttpRequest();
    var method = "GET"; //define the request
    var url = "config/db.php";     //In this file, connection with the database is done
    var asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.send();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
        }
    }
    
    //When document is first opened,reset the cookies
    document.cookie = "token=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "auth=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "table=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "fw=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";
    document.cookie = "username=; expires=Thu, 15 Jun 1938 12:00:00 UTC; path=/";

    //definitions of HTML elements
    const formInput: HTMLFormElement = document.getElementById("formInput") as HTMLFormElement;
    const editClose: HTMLElement = document.getElementById("editClose");
    const petClose: HTMLElement = document.getElementById("petClose");
    const petEditClose: HTMLElement = document.getElementById("petEditClose");

    tableUser = document.getElementById("tableUser");
    tablePet = document.getElementById("tablePet");
    formEdit = document.getElementById("formEdit") as HTMLFormElement;
    petEdit = document.getElementById("petEdit") as HTMLFormElement;
    petForm = document.getElementById("petForm") as HTMLFormElement;
    editModal = document.getElementById("editModal");
    editPetModal = document.getElementById("editPetModal");
    petModal = document.getElementById("petModal");
    formLogin = document.getElementById("formLogin") as HTMLFormElement;
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
    document.querySelectorAll("input").forEach(function(i){
        i.addEventListener("keyup", controlSpecialCharacters);
    });
    tableUser.addEventListener("click", (event: Event)=>{
        const target: HTMLElement = event.target as HTMLElement;
        if (target.matches(".fa-trash")) {
            deleteUser(target);
        } else if (target.matches(".fa-pen")) {
            startEdit(target);
        }
    });
    tablePet.addEventListener("click", (event: Event)=>{
        const target: HTMLElement = event.target as HTMLElement;
        if (target.matches(".fa-trash")) {
            let isUserDeleted=false;
            deletePet(target , false );
        }
        else if (target.matches(".fa-pen")) {
            startEditPet(target);
        }
    });
});





/*This method prevents input entries with special characters such as #, ', /, *, =, "  
and vulnerabilities related to SQL.*/
function controlSpecialCharacters(): void {
    const f: string = this.value; //parameter for executing this method
    let newText: string;
    const char: any = f.split(''); //characters in 'f' variable is separated and defined as 'char'
    
    char.forEach(function(i){ //for each character in f,
        if(i == '#' || i == '/' ||
           i == `'` || i == `"` ||
           i == '=' || i == '*'){
               /*special character is replaced with blank character 
               and defined as "newText" */
               newText = f.replace(i,'');
           }
    });
    if(newText != null){ //if newText is not empty,
        
        this.value = newText; //new parameter is newText.
    }
}


export{auth};