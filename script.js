const accessKey = "5yD5kmi5coQhIw2NHxPJcl_5dwnLJ1TffUzBj8UupMY";
const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

const loadImages = async () => {
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.forEach((result) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("search-result");
    imageContainer.classList.add("image-container");

    const img = document.createElement("img");
    img.src = result.urls.small;

    const p = document.createElement("p");
    p.classList.add("image-name");
    p.textContent = result.description || "Image"; // You can use another property for the image name if available.

    imageContainer.appendChild(img);
    // imageContainer.appendChild(p);

    searchResult.appendChild(imageContainer);
  });

  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
};

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  loadImages();
});

showMore.addEventListener("click", (e) => {
  e.preventDefault();
  loadImages();
});
