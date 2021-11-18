var itemId;
function openUserDropDown(item) {
    itemId = item.id; //get the id of the HTML element sent to this function
    var allLists = document.querySelectorAll("ul"); //choose all 'ul' elements
    allLists.forEach(controlDropDown); //send them all to the function named "controlDropDown"
}
function controlDropDown(item) {
    if (item.dataset.target == itemId) { //if the data-target value of the HTML element sent is equal to the itemId we defined earlier
        if (item.selected == true) { //if this element is already selected,
            item.classList.remove("show"); //remove show class from elemt's class list.
            item.selected = false; //set element as not selected.
            document.querySelector("#User_toggle").style.backgroundColor = "transparent";
            //set the data-expanded value of the previously defined element to false:
            document.getElementById(itemId).dataset.expanded = "false";
        }
        else if (item.selected == false) { //and if this element isn'T selected,
            item.classList.add("show"); //add show class to elemt's class list.
            item.selected = true; //set element as selected.
            document.querySelector("#User_toggle").style.backgroundColor = "#c6c9d81a";
            //set the data-expanded value of the previously defined element to true:
            document.getElementById(itemId).dataset.expanded = "true";
        }
        else { //if this is the first time this method is executed and it is not yet known whether the element has been selected (if the selected value is null)
            item.classList.add("show"); //add show class to element's class list.
            item.selected = true; //set element as selected.
            document.querySelector("#User_toggle").style.backgroundColor = "#c6c9d81a";
        }
    }
}
