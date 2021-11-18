function showAddPet(){
   try{
    var uName = document.getElementById("navbarUname") as HTMLElement;

    if (uName == undefined || uName == null) {
      throw new Error("User name is not defined");
    }
      
    
    //User name is written on the username input part in 'Add Pet' part
    (document.getElementById("uNameForPet") as HTMLFormElement).value = document.getElementById("navbarUname").dataset.uname;
    document.getElementById("petModal").style.display = "block";
}catch (e) {
    alert(e.message);
  }
}


export {showAddPet};