document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#destinationForm")
    .addEventListener("submit", submittedForm);

  function submittedForm(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the values off the webpage
    var destination = event.target.elements["destinationName"].value;
    var location = event.target.elements["location"].value;
    var photo = event.target.elements["photo"].value;
    var description = event.target.elements["description"].value;

    console.log("Form submitted with values: ", {
      destination,
      location,
      photo,
      description,
    });

    resetFormValues(event.target);

    var newDestinationCard = createDestinationCard(
      destination,
      location,
      photo,
      description
    );

    var wishListContainer = document.querySelector("#destinations_container");

    // Change wishlist title if the wishlist was empty
    if (wishListContainer.children.length === 0) {
      document.querySelector("#title").innerHTML = "My WishList";
    }

    // Append the destinationCard in the #destinations_container div
    wishListContainer.appendChild(newDestinationCard);
  }

  function resetFormValues(form) {
    // Go through all the form values and reset their values
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].value = "";
    }
  }

  function createDestinationCard(name, location, photoUrl, description) {
    console.log("Creating destination card with values: ", {
      name,
      location,
      photoUrl,
      description,
    });

    // Use the passed arguments to create a bootstrap card with destination details
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.width = "15rem";
    card.style.height = "fit-content";
    card.style.margin = "20px";

    // Create the destination photo element and append it to the card
    var img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", name);

    // Check to make sure that the photo url was entered since it's optional
    // if the user didn't enter a photo url, show a constant photo
    var constantPhotoUrl =
      "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
    img.setAttribute(
      "src",
      photoUrl.length === 0 ? constantPhotoUrl : photoUrl
    );

    card.appendChild(img);

    // Create the card body with the destination name, location, and description and append it to the card
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = name;
    cardBody.appendChild(cardTitle);

    var cardSubtitle = document.createElement("h6");
    cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
    cardSubtitle.innerText = location;
    cardBody.appendChild(cardSubtitle);

    // Only add description text if the user entered some
    if (description.length !== 0) {
      var cardText = document.createElement("p");
      cardText.setAttribute("class", "card-text");
      cardText.innerText = description;
      cardBody.appendChild(cardText);
    }

    var buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "buttons_container");

    var cardEditBtn = document.createElement("button");
    cardEditBtn.setAttribute("class", "btn btn-warning");
    cardEditBtn.innerText = "Edit";
    cardEditBtn.addEventListener("click", editDestination);

    var cardDeleteBtn = document.createElement("button");
    cardDeleteBtn.setAttribute("class", "btn btn-danger");
    cardDeleteBtn.innerText = "Remove";
    cardDeleteBtn.addEventListener("click", removeDestination);

    buttonsContainer.appendChild(cardEditBtn);
    buttonsContainer.appendChild(cardDeleteBtn);

    cardBody.appendChild(buttonsContainer);

    card.appendChild(cardBody);

    return card;
  }

  function editDestination(event) {
    var cardBody = event.target.parentElement.parentElement;
    var card = cardBody.parentElement;

    var name = cardBody.querySelector(".card-title").innerText;
    var location = cardBody.querySelector(".card-subtitle").innerText;
    var description = cardBody.querySelector(".card-text")
      ? cardBody.querySelector(".card-text").innerText
      : "";
    var photoUrl = card.querySelector(".card-img-top").getAttribute("src");

    // Log the values to ensure they are correct
    console.log("Editing Destination:", {
      name,
      location,
      description,
      photoUrl,
    });

    // Get form elements
    var destinationNameInput = document.querySelector(
      'input[name="destinationName"]'
    );
    var locationInput = document.querySelector('input[name="location"]');
    var photoInput = document.querySelector('input[name="photo"]');
    var descriptionInput = document.querySelector(
      'textarea[name="description"]'
    );

    // Check if form elements exist
    if (
      destinationNameInput &&
      locationInput &&
      photoInput &&
      descriptionInput
    ) {
      // Set form values to current card values
      destinationNameInput.value = name;
      locationInput.value = location;
      photoInput.value = photoUrl;
      descriptionInput.value = description;

      // Remove the current card
      card.remove();
    } else {
      console.error("Form elements not found.");
    }
  }

  function removeDestination(event) {
    var card = event.target.parentElement.parentElement.parentElement;
    card.remove();

    var wishListContainer = document.querySelector("#destinations_container");

    // Change wishlist title if the wishlist is empty
    if (wishListContainer.children.length === 0) {
      document.querySelector("#title").innerHTML = "WishList is empty";
    }
  }
});
