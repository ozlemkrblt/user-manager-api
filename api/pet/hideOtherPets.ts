function hideOtherPets(username, auth) {
  //all pets in the pets table are selected
  const petItems = document.querySelectorAll(".petItem");
  if (auth == true) {
    //if user is admin,all pets are shown
    petItems.forEach(function (item) {
      (item as HTMLElement).style.display = "table-row";
    });
  } else {
    petItems.forEach(function (item) {
      //if username exists in the 1. row of listed elements, and matches with the user name in the parameter
      if (item.getElementsByTagName("td")[0].innerHTML.includes(username)) {
        (item as HTMLElement).style.display = "table-row"; //elements are shown
      } else {
        // if username doesn't match with the searched user name
        (item as HTMLElement).style.display = "none";
      }
    });
  }
}

export { hideOtherPets };
