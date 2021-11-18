import {deletePet} from './deletePet.js';

function deleteUserPets(items) {
    var isUserDeleted = true ;
    for (let i = 0; i < items.length; i++) { //This method sends all items coming from parameter 
        deletePet(items[i],isUserDeleted); // to the  ' deletePet' method with a for loop.
    }
}
export{deleteUserPets};