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


