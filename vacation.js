//doocument what is being selected
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#destinationName")
    .addEventListener("submit", submittedForm);

  function submittedForm(event) {}
  //this fucntion focuses on the destination form
  event.preventDefault(); //no refresh

  //get the values off the webpage

  var destination = event.target.elements["destination"].value;
  var location = event.target.elements["location"].value;
  var photo = event.target.elements["photo"].value;
  var description = event.target.elements["description"].value;

  resetFormValues(event.target);

  var newDestinationCard = createDestinationCard(
    destination,
    location,
    photo,
    description
  );

  var wishListContainer = document.querySelector("#destinationName");

  //   // Add an event listener to the button
  //   submitButton.addEventListener("click", function (event) {
  //     // Prevent the default form submission behavior
  //     event.preventDefault(); //prevents the default behavior of button once it is clicked

  //     // Call the function to handle the button click
  //     handleButtonClick();
  //   });

  //   // Define the function to handle the button click
  //   function handleButtonClick() {
  //     console.log("Button was clicked!");
  //     // Your logic for handling the button click goes here
  //   }
});
