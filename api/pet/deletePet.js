import {renderList} from '../config/renderList.js';
function deletePet(target, isUserDeleted) {

    if (isUserDeleted === undefined) {
        isUserDeleted=false;
      }

    const pkey = target.dataset.pkey; //Define pet key
    const ajax = new XMLHttpRequest(); //database transaction request
    const method = "DELETE";
    const url = "pet/pets.php/?pkey=" + pkey; //PHP file
    const asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if ( isUserDeleted === false){
                renderList("pets"); //render pets list
            }
        } else if (this.status == 404) {
            document.getElementById("petError").style.display = "block"; //show error message
            document.getElementById("petError").innerHTML = "An error occurred while deleting the pet! Pet not found.";
        }
    };
}
export {deletePet};