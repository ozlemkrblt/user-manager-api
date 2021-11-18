function stopEditPet() {
    petEdit.reset(); //Pet edit form is resetted
    petEdit.dataset.uname = "";
    editPetModal.style.display = "none"; //Pet edit part is hidden
}
export {stopEditPet};