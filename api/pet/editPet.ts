import { renderList } from "../config/renderList";

let petEdit: HTMLFormElement = document.getElementById("petEdit") as HTMLFormElement;
let editPetModal: HTMLElement = document.getElementById("editPetModal");

function editPet(event: Event) {
    event.preventDefault();
    try {
        const formData: FormData = new FormData(petEdit); //Retrieve data from petEdit form
        //Definitions of pet name, new pet name, pet type, pet key, new pet key & username: 
        const pName: string = document.getElementById("petEditName").dataset.pname;
        const pNewName: string = formData.get("petname").toString().trim();
        let pType: any = formData.get("pettype")
        const uName: string = petEdit.dataset.uname;
        const pkey: string = uName + "_" + pName;
        const newPkey: string = uName + "_" + pNewName;

        if (uName == null || uName == undefined || uName.length == 0) { throw new SyntaxError("You are not authorized for that action"); }
        if (pType == null || pType == undefined) { throw new SyntaxError("You should choose a pet type."); }
        pType = pType.toString().trim();
        const ajax: XMLHttpRequest = new XMLHttpRequest(); //database transaction request
        const method: string = "PUT";
        const url: string = "pet/pets.php/?pkey=" + pkey + "&pName=" + pNewName + "&pType=" + pType + "&newPkey=" + newPkey; //PHP file
        const asynchronous = true;
        ajax.open(method, url, asynchronous);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                petEdit.reset(); //reset petEdit form,
                //Important info that retrieved from database is written into input fields in form,
                petEdit.dataset.uname = uName;
                petEdit.dataset.pname = pNewName;
                editPetModal.style.display = "none"; //pet edit part is hidden
                renderList("pets"); //pets table is rendered again

            }
        };
    } catch (e) {
        alert(e.message);
    }
}
export { editPet };



