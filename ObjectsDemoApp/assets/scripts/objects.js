const addMovieButton = document.getElementById("add-movie-btn");
const searchMovieButton = document.getElementById("search-btn");
const movieList = [];

const showMovies = (filterText = "") => {
  const movieListElement = document.getElementById("movie-list");
  if (movieList.length === 0) {
    movieListElement.classList.remove("visible");
  } else {
    movieListElement.classList.add("visible");
  }
  movieListElement.innerHTML = "";
console.log(filterText);
  const filteredMovies =
    filterText === ""
      ? movieList
      : movieList.filter((movie) => movie.info.title.includes(filterText));
  console.log(filteredMovies);
  filteredMovies.forEach((movie) => {
    const newEl = document.createElement("li");
    let text = movie.info.title;
    for (const key in movie.info) {
      if (key === "title") continue;
      text += ` ${key}: ${movie.info[key]} `;
    }
    newEl.textContent = text;
    movieListElement.appendChild(newEl);
  });
};

const searchMovieHandler = () => {
  const filterText = document.getElementById("filter-title").value;
  showMovies(filterText.trim());
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;
  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }
  const newMovie = {
    info: { title, [extraName]: extraValue },
    id: Math.random(),
  };
  console.log(newMovie);
  movieList.push(newMovie);
  showMovies();
};

addMovieButton.addEventListener("click", addMovieHandler);
searchMovieButton.addEventListener("click", searchMovieHandler);
