

$(document).ready(function () {
  $('#searchButton').on('click', function () {
    searchData();
  });

  function searchData() {
    const searchQuery = $('#searchQuery').val().trim();

    fetch(`/search?q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        displaySearchResults(data);
      })
      .catch(error => {
        console.error("Error searching data:", error);
      });
  }

  function displaySearchResults(results) {
    const searchResultsList = $('#searchResults');
    searchResultsList.empty();

    results.forEach(result => {
      const card = $('<div>').addClass('card');
      const link = $('<a>').attr('href', `/anime/${result._id}`);
      const img = $('<img>').attr('src', result.image).attr('alt', result.name);
      const title = $('<p>').addClass('title').text(result.name);

      link.append(img, title);
      card.append(link);
      searchResultsList.append(card);
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var popularAnimeSections = document.querySelectorAll(".popular-anime");

  popularAnimeSections.forEach(function(popularAnime) {
    var cardContainer = popularAnime.querySelector(".card-container");
    var cardWidth = cardContainer.querySelector(".card").offsetWidth + 10; // Add margin
    var currentPosition = 0;

    var nextBtn = popularAnime.querySelector(".next");
    var prevBtn = popularAnime.querySelector(".prev");

    popularAnime.addEventListener("click", function(event) {
      if (event.target.closest(".next")) {
        currentPosition = Math.min(currentPosition + cardWidth, cardContainer.scrollWidth - cardContainer.clientWidth);
        cardContainer.scrollTo({ left: currentPosition, behavior: "smooth" });
      } else if (event.target.closest(".prev")) {
        currentPosition = Math.max(currentPosition - cardWidth, 0);
        cardContainer.scrollTo({ left: currentPosition, behavior: "smooth" });
      }
    });

    // Allow manual scrolling
    cardContainer.addEventListener("scroll", function() {
      currentPosition = cardContainer.scrollLeft;
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var cards = document.querySelectorAll(".card");

  // Loop through each card and apply animation with delay
  cards.forEach(function(card, index) {
      card.style.opacity = "0"; // Start with cards hidden
      console.log("script is working")
      card.style.animation = "slideInFromBottom 0.5s ease-out forwards";
      card.style.animationDelay = (index * 0.1) + "s"; // Adjust delay as needed
  });
});

const searchButtons = document.querySelectorAll(".ri-search-2-line");
const searchbox = document.getElementsByClassName("searchbox")[0];

searchButtons.forEach(button => {
  button.addEventListener("click", () => {
    console.log("iihii");
    searchbox.classList.toggle("search-active");
    searchbox.classList.toggle("hidden");
  });
});

