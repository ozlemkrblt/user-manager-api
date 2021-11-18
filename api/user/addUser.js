import { renderList } from "../config/renderList.js";

function addUser(event) {
  event.preventDefault();
  const form = event.target;
  //definitons
  const fName = document.getElementById("firstname").value;
  const lName = document.getElementById("lastname").value;
  const uName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (uName === " " || uName === "") {
    //if user name field is empty,
    form.reset(); //reset form
    document.getElementById("registerError").style.display = "block"; //show error message
    document.getElementById("registerError").innerHTML =
      "An error occurred while creating the account! Please check your information and try again.";
  } else {
    //database transaction request
    $.ajax({
      url: "user/add-user.php",
      type: "POST",
      data: {
        fName: fName,
        lName: lName,
        uName: uName,
        pw: password,
      },
      cache: false,
      statusCode: {
        409: function (dataResult, _textStatus = "error") {
          document.getElementById("registerSuccess").style.display = "none"; // success message is hidden
          document.getElementById("registerError").style.display = "block"; //error message is shown,
          document.getElementById("registerError").innerHTML =
            "An error occurred while creating the account! There might be a different user with the same name. Please check your information and try again.";
        },
        200: function (dataResult, _textStatus = "success") {
          form.reset(); //reset saved info
          renderList("users"); //table is rendered again
          document.getElementById("registerError").style.display = "none"; //error message is hidden,
          document.getElementById("registerSuccess").style.display = "block"; // success message is shown
        },
      }
    });
  }
}
export { addUser };
