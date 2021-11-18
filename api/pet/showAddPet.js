function showAddPet() {
  try {
    var uName = document.getElementById("navbarUname");

    if (uName == undefined || uName == null) {
      throw new Error("User name is not defined");
    }

    //User name is written on the username input part in 'Add Pet' part
    document.getElementById("uNameForPet").value = uName.dataset.uname;
    document.getElementById("petModal").style.display = "block";
  } catch (e) {
    alert(e.message);
  }
}

export { showAddPet };
