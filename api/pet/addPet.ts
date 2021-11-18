import { renderList } from "../config/renderList";

let petModal : HTMLElement = document.getElementById("petModal");

function addPet(event : Event) {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    //definitions for pet:

    try {
        const pType: string = (document.getElementById('petType') as HTMLFormElement).value;
        if ((pType) == 'Not Known') { throw new SyntaxError("You should choose a pet type."); }
    
    const pName: string = (document.getElementById('petName') as HTMLFormElement).value;
    const uName: string = (document.getElementById('uNameForPet') as HTMLFormElement).value;
    //a 'pkey' value is defined for each pet. 
    const pkey = uName+"_"+pName;

    $.ajax({     //database transaction request
        url: "pet/add-pet.php",
        type: "POST",
        data: {  
            pName: pName,      //data are
            pType: pType,      //sent to
            uName: uName,      //PHP file
            pkey: pkey
        },
        cache: false,
        statusCode: {
            401: function (dataResult, _textStatus = "error") {
                document.getElementById("addPetError").style.display = "block";
                document.getElementById("addPetError").innerHTML = "Not authorized for that action! Please log in.";
            },
            409: function (dataResult, _textStatus = "error") {
                document.getElementById("addPetError").style.display = "block";
                document.getElementById("addPetError").innerHTML = "An error occurred while adding pet! You can't add a different pet with the same name. Please check your information and try again.";
            },200: function (dataResult :any , _textStatus = "success") {
    
                dataResult = JSON.parse(dataResult); //Results are turned into JSON

                //reset saved info
                form.reset();
                //User name is written on the username input part in 'Add Pet' part
                (document.getElementById("uNameForPet") as HTMLFormElement).value = uName;
                //pets table is rendered again
                renderList("pets");
                //error messages and pet edit part aren't shown anymore
                document.getElementById("addPetError").style.display = "none";
                petModal.style.display = "none";

            }
        }
    });
    }catch(e){
    alert (e.message);
    }
}

export {addPet};