import { renderList } from "../config/renderList";

function addUser(event: Event): void {
  event.preventDefault();
  const form: HTMLFormElement = event.target as HTMLFormElement;
  //definitons
  const fName: string = (
    document.getElementById("firstname") as HTMLFormElement
  ).value;
  const lName: string = (document.getElementById("lastname") as HTMLFormElement)
    .value;
  const uName: string = (document.getElementById("username") as HTMLFormElement)
    .value;
  const password: string = (
    document.getElementById("password") as HTMLFormElement
  ).value;

  if (uName === " " || uName === "") {
    //if user name field is empty,
    form.reset(); //reset form
    document.getElementById("registerError").style.display = "block"; //show error message
    document.getElementById("registerError").innerHTML =
      "An error occurred while creating the account! Please check your information and try again.";
  } else {
    //database transaction request
    $.ajax({
      url: "user/add-user.php", //name of the php file
      type: "POST",
      data: {
        fName: fName, //send data
        lName: lName, //to the
        uName: uName, //PHP
        pw: password, //file
      },
      cache: false,
      statusCode: {
        409: function (dataResult, _textStatus = "error") {
          // if it is not successful,
          document.getElementById("registerSuccess").style.display = "none"; // success message is hidden
          document.getElementById("registerError").style.display = "block"; //error message is shown,
          document.getElementById("registerError").innerHTML =
            "An error occurred while creating the account! There might be a different user with the same name. Please check your information and try again.";
        },
        200: function (dataResult, _textStatus = "success") {
          //in this function, results are turned into JSON
          dataResult = JSON.parse(dataResult);
          // if it is successful,
          form.reset(); //reset saved info
          renderList("users"); //table is rendered again
          document.getElementById("registerError").style.display = "none"; //error message is hidden,
          document.getElementById("registerSuccess").style.display = "block"; // success message is shown
        },
      },
    });
  }
}
export { addUser };
