function startEditPet(target) {
    //Definitions
    try {
        const uName = target.dataset.uname;
        if (uName.length == 0 || uName == null || uName == undefined) { throw new SyntaxError("You should choose a user name."); }
        const pName = target.dataset.pname;
        if (pName.length == 0 || pName == null || pName == undefined) { throw new SyntaxError("You should choose a pet name."); }
        const pkey = uName + "_" + pName;
        //User name is written on the username input part in 'Edit Pet' part
        petEdit.elements.namedItem("username").value = uName;
        //Cookies are set:
        document.cookie = "table=pets; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/"; //Table cookie is set as 'pets' for indicating editing process
        document.cookie = "username=" + uName + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
        //database transaction request (without sending data to PHP file)
        const ajax = new XMLHttpRequest();
        const method = "GET";
        const url = "config/get-data.php"; //PHP file 
        const asynchronous = true;
        ajax.open(method, url, asynchronous);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText); //results are turned into JSON
                data.forEach(function (i) {
                    if (i.pkey == pkey) { //if pkey value coming from pet info that we retrieved from data, matches with the pkey value we want to do operation
                        //Information from data is written in the input fields in form:
                        petEdit.dataset.uname = i.uName;
                        petEdit.elements.namedItem("username").value = i.uName;
                        petEdit.elements.namedItem("petname").value = i.pName;
                        petEdit.elements.namedItem("pettype").value = i.pType;
                        document.getElementById("petEditName").dataset.pname = i.pName;
                    }
                });
            }
        };
        editPetModal.style.display = "block"; // Pet edit part is shown to the user

    } catch (e) {
        alert(e.message);
    }

}
export { startEditPet };