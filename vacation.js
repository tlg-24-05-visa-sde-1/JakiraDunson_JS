document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#destinationForm")
    .addEventListener("submit", submittedForm);

  loadDestinationsFromLocalStorage();

  function submittedForm(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the values from the form
    var destination = document.querySelector("#destinationName").value;
    var location = document.querySelector("#location").value;
    var photo = document.querySelector("#photo").value;
    var description = document.querySelector("#description").value;

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

    // Save the destination to localStorage
    saveDestinationToLocalStorage({
      destination,
      location,
      photo,
      description,
    });

    // Reset form values after submission
    resetFormValues(event.target);
  }

  function resetFormValues(form) {
    form.reset();
  }

  function createDestinationCard(name, location, photoUrl, description) {
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.width = "15rem";
    card.style.height = "fit-content";
    card.style.margin = "20px";

    var img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", name);

    // Check if the photo URL is provided, else use a default image
    var defaultPhotoUrl =
      "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
    img.setAttribute("src", photoUrl.length === 0 ? defaultPhotoUrl : photoUrl);

    card.appendChild(img);

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
    var card = event.target.closest(".card");

    var name = card.querySelector(".card-title").innerText;
    var location = card.querySelector(".card-subtitle").innerText;
    var description = card.querySelector(".card-text")
      ? card.querySelector(".card-text").innerText
      : "";
    var img = card.querySelector(".card-img-top").getAttribute("src");

    document.querySelector("#destinationName").value = name;
    document.querySelector("#location").value = location;
    document.querySelector("#photo").value = img;
    document.querySelector("#description").value = description;

    card.remove();

    var wishListContainer = document.querySelector("#destinations_container");
    if (wishListContainer.children.length === 0) {
      document.querySelector("#title").innerHTML = "Enter destination details";
    }

    // Update localStorage after removing the card
    removeDestinationFromLocalStorage(name, location, img, description);
  }

  function removeDestination(event) {
    var card = event.target.closest(".card");
    var name = card.querySelector(".card-title").innerText;
    var location = card.querySelector(".card-subtitle").innerText;
    var img = card.querySelector(".card-img-top").getAttribute("src");
    var description = card.querySelector(".card-text")
      ? card.querySelector(".card-text").innerText
      : "";

    card.remove();

    var wishListContainer = document.querySelector("#destinations_container");
    if (wishListContainer.children.length === 0) {
      document.querySelector("#title").innerHTML = "Enter destination details";
    }

    // Update localStorage after removing the card
    removeDestinationFromLocalStorage(name, location, img, description);
  }

  function saveDestinationToLocalStorage(destination) {
    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
    destinations.push(destination);
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }

  function removeDestinationFromLocalStorage(
    name,
    location,
    photo,
    description
  ) {
    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
    destinations = destinations.filter(
      (destination) =>
        destination.destination !== name ||
        destination.location !== location ||
        destination.photo !== photo ||
        destination.description !== description
    );
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }

  function loadDestinationsFromLocalStorage() {
    let destinations = JSON.parse(localStorage.getItem("destinations")) || [];
    destinations.forEach((destination) => {
      var newDestinationCard = createDestinationCard(
        destination.destination,
        destination.location,
        destination.photo,
        destination.description
      );

      var wishListContainer = document.querySelector("#destinations_container");

      // Change wishlist title if the wishlist was empty
      if (wishListContainer.children.length === 0) {
        document.querySelector("#title").innerHTML = "My WishList";
      }

      // Append the destinationCard in the #destinations_container div
      wishListContainer.appendChild(newDestinationCard);
    });
  }
});
