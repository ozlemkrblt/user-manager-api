import { getCookie } from '../authentication/getCookie.js';
import { hideOtherPets } from '../pet/hideOtherPets.js';

var tableUser = document.getElementById("tableUser");
var tablePet = document.getElementById("tablePet");

function renderList(item) {

    const checkLogin = getCookie("token"); //check if user has a token
    resetList(item);

    if (checkLogin != null) { //if user has a token,
        /*set 'table' cookie according to the table name user wants
        to do operation in order to manage operations on PHP side. */
        document.cookie = "table=" + item + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";

        const ajax = new XMLHttpRequest(); //database transaction request
        const method = "GET";
        const url = "config/get-data.php"; //PHP file
        const asynchronous = true;
        ajax.open(method, url, asynchronous);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText); //results are turned into JSON

                data.forEach(function (i) {
                    let a = 0;
                    const tr = document.createElement("tr");
                    if (item == "users") { //if user wants to do operation on users table,
                        //save user info according to this table schema for users table
                        tr.innerHTML = `
                            <td class="uName">` + i.uName + `</td>
                            <td>` + i.fName + `</td>
                            <td>` + i.lName + `</td>
                            <td>
                                <button style="border:none;"><i class="fas fa-trash" data-uname="` + i.uName + `"></i></button>
                                <a href="#nav" style="border:none;background-color:rgb(239, 239, 239);color: #212529;font-size: 16px;padding: 7px 5px;"><i class="fas fa-pen" data-uname="` + i.uName + `" id="` + i.uName + `_edit"></i></a>
                            </td>
                            `;
                        tableUser.append(tr); //add <tr> element to users table
                    }else if (item == "pets") { //if user wants to do operation on pets table,
                        //save pet info according to this table schema for pets table
                        tr.classList.add("petItem");
                        tr.innerHTML = `
                            <td class="uName">` + i.uName + `</td>
                            <td>` + i.pName + `</td>
                            <td>` + i.pType + `</td>
                            <td>
                                <button style="border:none;"><i class="fas fa-trash" data-uname="` + i.uName + `" data-pname="` + i.pName + `" data-pkey="` + i.pkey + `"></i></button>
                                <a href="#nav" style="border:none;background-color:rgb(239, 239, 239);color: #212529;font-size: 16px;padding: 7px 5px;"><i class="fas fa-pen" data-uname="` + i.uName + `" data-pname="` + i.pName + `" id="` + i.uName + `_pet_` + i.pName + `_edit" ></i></a>
                            </td>
                            `;
                        tablePet.append(tr); //add <tr> element to pets table
                    }
                    a = a++;
                });

                if (item == "pets") {
                    //identify the user who wants to do operation in the pets table
                    const user = document.getElementById("navbarUname").dataset.uname;
                    var checkAuth = getCookie("auth");
                    hideOtherPets(user, checkAuth); //hide other users' pets from the user doing the operation
                }

            } else if (this.status == 401) { //If user tries to refresh the user table altough he/she is not an admin,
                var tr = document.createElement("tr");
                tr.innerHTML = `
                <td class="text-danger text-center" colspan="4">Not authorized for that action! Please log in.</td>
                `;
                tableUser.append(tr);
            }
        };
    } else { //if user tries to do this operation without registering,
        //Give error message:
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="text-danger text-center" colspan="4">Not authorized for that action! Please log in.</td>
            `;
        if (item == "users") {
            tableUser.append(tr);
        }
        else if (item == "pets") {
            tablePet.append(tr);
        }
    }
}



function resetList(item) {
    if (item == "users") {
        tableUser.innerHTML = ""; //delete everything in users table
    }
    else if (item == "pets") {
        tablePet.innerHTML = ""; //delete everything in pets table
    }
}
export { renderList };