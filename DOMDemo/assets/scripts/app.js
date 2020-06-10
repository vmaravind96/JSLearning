const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const addModalCancelButton = addMovieModal.querySelector(".btn--passive");
const addModalAddButton = addModalCancelButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteModal = document.getElementById("delete-modal");

let movieList = [];

const toggleBackdrop = () => {
  backDrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
  toggleBackdrop();
};

const openMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const closeDeleteMovieModal = () => {
  deleteModal.classList.remove("visible");
  toggleBackdrop();
};

const backDropClickhandler = () => {
  clearInputs(userInputs);
  closeMovieModal();
  toggleBackdrop();
  closeDeleteMovieModal();
};

const cancelMovieHandler = () => {
  clearInputs(userInputs);
  closeMovieModal();
};

const clearInputs = (inputArray) => {
  for (const inputField of inputArray) {
    inputField.value = "";
  }
};

const changeUI = () => {
  if (movieList.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movieObj of movieList) {
    if (movieObj.id == movieId) break;
    movieIndex++;
  }

  movieList.splice(movieIndex, 1);
  listRoot.removeChild(listRoot.children[movieIndex]);
  closeDeleteMovieModal();
  changeUI();
};

const deleteMovieHandler = (movieId) => {
  deleteModal.classList.add("visible");
  toggleBackdrop();
  const deleteModalNoButton = deleteModal.querySelector(".btn--passive");
  let deleteModalYesButton = deleteModal.querySelector(".btn--danger");

  // We clear the previous event listeners.
  deleteModalYesButton.replaceWith(deleteModalYesButton.cloneNode(true));
  deleteModalYesButton = deleteModal.querySelector(".btn--danger");
  deleteModalNoButton.removeEventListener("click", closeDeleteMovieModal);
  // Add the new listeners.
  deleteModalNoButton.addEventListener("click", closeDeleteMovieModal);
  deleteModalYesButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

const addNewMovie = (movieObj) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src=${movieObj.image} alt=${movieObj.title}></img>
  </div>
  <div class="movie-element__info">
  <h2>${movieObj.title}</h2>
  <p>Rating : ${movieObj.rating}/5 </p>
  </div>
  `;
  newMovieElement.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieObj.id)
  );
  listRoot.appendChild(newMovieElement);
};

const addMovieButtonHandler = () => {
  const title = userInputs[0].value;
  const imageURL = userInputs[1].value;
  const rating = userInputs[2].value;

  // Validate the inputs.
  if (
    title.trim() === "" ||
    imageURL.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Enter Valid Inputs. (Note: Rating between 1 and 5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: title,
    image: imageURL,
    rating: +rating,
  };
  movieList.push(newMovie);
  clearInputs(userInputs);
  closeMovieModal();
  addNewMovie(newMovie);
  changeUI();
};

startAddMovieButton.addEventListener("click", openMovieModal);
backDrop.addEventListener("click", backDropClickhandler);
addModalCancelButton.addEventListener("click", cancelMovieHandler);
addModalAddButton.addEventListener("click", addMovieButtonHandler);
