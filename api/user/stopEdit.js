function stopEdit() {
    formEdit.reset(); //User edit form is resetted
    formEdit.dataset.uname = "";
    editModal.style.display = "none"; //User edit part is hidden
}
export {stopEdit};