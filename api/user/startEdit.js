function startEdit(target) {
    try {
        const uName = target.dataset.uname; //username is defined
        if (uName.length == 0 || uName == null || uName == undefined) { throw new SyntaxError("Input Error!"); }
        //table cookie is set as 'users' for indicating editing process
        document.cookie = "table=users; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";

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
                    //if'uName' value coming from users info that we retrieved from data, matches with the uName value we want to do operation
                    if (i.uName == uName) {
                        //Information from data is written in the input fields in form:
                        formEdit.dataset.uname = i.uName;
                        formEdit.elements.namedItem("username").value = i.uName;
                        formEdit.elements.namedItem("firstname").value = i.fName;
                        formEdit.elements.namedItem("lastname").value = i.lName;
                    }
                });
            }
        };
        editModal.style.display = "block"; //User edit part is shown to the user

    } catch (e) {
        alert(e.message);
    }

}
export { startEdit };