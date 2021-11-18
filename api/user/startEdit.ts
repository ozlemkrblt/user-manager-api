let formEdit: HTMLFormElement= document.getElementById("formEdit") as HTMLFormElement;
let editModal : HTMLElement = document.getElementById("editModal");

function startEdit(target: HTMLElement) {
    
    const uName: string = target.dataset.uname; //username is defined
    //cookies are set
    document.cookie = "table=users; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/"; //table cookie is set as 'users' for indicating editing process
    document.cookie = "username=" + uName + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
    //database transaction request (without sending data to PHP file)
    const ajax: XMLHttpRequest = new XMLHttpRequest();
    const method: string = "GET";
    const url: string = "config/get-data.php"; //PHP file
    const asynchronous: boolean = true;
    ajax.open(method, url, asynchronous);
    ajax.send();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const data: any = JSON.parse(this.responseText); //results are turned into JSON
            data.forEach(function(i: any){
                //if'uName' value coming from users info that we retrieved from data, matches with the uName value we want to do operation
                if(i.uName == uName){
                    //Information from data is written in the input fields in form:
                    formEdit.dataset.uname = i.uName;
                    (formEdit.elements.namedItem("username") as HTMLFormElement).value = i.uName;
                    (formEdit.elements.namedItem("firstname") as HTMLFormElement).value = i.fName;
                    (formEdit.elements.namedItem("lastname") as HTMLFormElement).value = i.lName;
                }
            });
        }
    }
    
    editModal.style.display = "block"; //User edit part is shown to the user
}
export {startEdit};
