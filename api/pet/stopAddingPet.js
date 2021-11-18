function stopAddingPet() {
  petForm.reset(); //Pet add form is resetted
  petForm.dataset.uname = "";
  petModal.style.display = "none"; //Pet add part is hidden
}
export { stopAddingPet };
