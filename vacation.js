//doocument what is being selected
document.addEventListener("DOMContentLoaded", function () {
  // Select the button using its ID
  const submitButton = document.querySelector("#submitButton");
  const destinationName = document.querySelector("#destinationName");
  const location = document.querySelector("#location");
  const photo = document.querySelector("#photo");

  // Add an event listener to the button
  submitButton.addEventListener("click", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault(); //prevents the default behavior of button once it is clicked

    // Call the function to handle the button click
    handleButtonClick();
  });

  // Define the function to handle the button click
  function handleButtonClick() {
    console.log("Button was clicked!");
    // Your logic for handling the button click goes here
  }
});
