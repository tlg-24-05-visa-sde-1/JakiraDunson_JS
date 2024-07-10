document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#destinationForm");
  const wishListContainer = document.querySelector("#destinations_container");
  const title = document.querySelector("#title");

  let listArray = JSON.parse(localStorage.getItem("destinations")) || [];

  form.addEventListener("submit", submittedForm);

  loadCardsFromLocalStorage();

  function submittedForm(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const destination = event.target.elements["destinationName"].value;
    const location = event.target.elements["location"].value;
    const photo = event.target.elements["photo"].value;
    const description = event.target.elements["description"].value;

    resetFormValues(event.target);

    const newDestinationCard = createDestinationCard(
      destination,
      location,
      photo,
      description
    );

    if (wishListContainer.children.length === 0) {
      title.innerHTML = "My WishList";
    }

    wishListContainer.appendChild(newDestinationCard);
    saveCardToLocalStorage(destination, location, photo, description);
  }

  function resetFormValues(form) {
    form.reset(); // Reset form values
  }

  function createDestinationCard(name, location, photoUrl, description) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.width = "15rem";
    card.style.height = "fit-content";
    card.style.margin = "20px";

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", name);
    img.setAttribute(
      "src",
      photoUrl ||
        "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg"
    );

    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = name;
    cardBody.appendChild(cardTitle);

    const cardSubtitle = document.createElement("h6");
    cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
    cardSubtitle.innerText = location;
    cardBody.appendChild(cardSubtitle);

    if (description) {
      const cardText = document.createElement("p");
      cardText.setAttribute("class", "card-text");
      cardText.innerText = description;
      cardBody.appendChild(cardText);
    }

    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "buttons_container");

    const cardEditBtn = document.createElement("button");
    cardEditBtn.setAttribute("class", "btn btn-warning");
    cardEditBtn.innerText = "Edit";
    cardEditBtn.addEventListener("click", editDestination);

    const cardDeleteBtn = document.createElement("button");
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
    const cardBody = event.target.parentElement.parentElement;
    const card = cardBody.parentElement;

    const name = cardBody.querySelector(".card-title").innerText;
    const location = cardBody.querySelector(".card-subtitle").innerText;
    const description = cardBody.querySelector(".card-text")
      ? cardBody.querySelector(".card-text").innerText
      : "";
    const photoUrl = card.querySelector(".card-img-top").getAttribute("src");

    const destinationNameInput = document.querySelector(
      'input[name="destinationName"]'
    );
    const locationInput = document.querySelector('input[name="location"]');
    const photoInput = document.querySelector('input[name="photo"]');
    const descriptionInput = document.querySelector(
      'textarea[name="description"]'
    );

    if (
      destinationNameInput &&
      locationInput &&
      photoInput &&
      descriptionInput
    ) {
      destinationNameInput.value = name;
      locationInput.value = location;
      photoInput.value = photoUrl;
      descriptionInput.value = description;

      card.remove();
      removeCardFromLocalStorage(name, location, photoUrl, description);
    } else {
      console.error("Form elements not found.");
    }
  }

  function removeDestination(event) {
    const card = event.target.closest(".card");

    const name = card.querySelector(".card-title").innerText;
    const location = card.querySelector(".card-subtitle").innerText;
    const description = card.querySelector(".card-text")
      ? card.querySelector(".card-text").innerText
      : "";
    const photoUrl = card.querySelector(".card-img-top").getAttribute("src");

    removeCardFromLocalStorage(name, location, photoUrl, description);
    card.remove();

    if (wishListContainer.children.length === 0) {
      title.innerHTML = "WishList is empty";
    }
  }

  function saveCardToLocalStorage(destination, location, photo, description) {
    const newCard = {
      destination: destination,
      location: location,
      photo: photo,
      description: description,
    };

    listArray.push(newCard);
    localStorage.setItem("destinations", JSON.stringify(listArray));
  }

  function removeCardFromLocalStorage(
    destination,
    location,
    photo,
    description
  ) {
    listArray = listArray.filter(function (card) {
      return !(
        card.destination === destination &&
        card.location === location &&
        card.photo === photo &&
        card.description === description
      );
    });

    localStorage.setItem("destinations", JSON.stringify(listArray));
  }

  function loadCardsFromLocalStorage() {
    wishListContainer.innerHTML = "";

    listArray.forEach(function (cardData) {
      const newCard = createDestinationCard(
        cardData.destination,
        cardData.location,
        cardData.photo,
        cardData.description
      );
      wishListContainer.appendChild(newCard);
    });

    if (wishListContainer.children.length === 0) {
      title.innerHTML = "WishList is empty";
    } else {
      title.innerHTML = "My WishList";
    }
  }
});
