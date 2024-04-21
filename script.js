// Fetch data from the API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.data; // Assuming the API returns an object with a 'data' property containing the array of artworks
}

// Render the artworks to the page
function renderArtworks(artworks) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  artworks.forEach((artwork) => {
    const artworkElement = document.createElement('div');
    artworkElement.innerHTML = `
      <h3>${artwork.title}</h3>
      ${artwork.artist_title ? `<p>${artwork.artist_title}</p>` : ''}
      <img src="${artwork.image_id ? `https://www.artic.edu/iiif/3/${artwork.image_id}/full/843,/0/default.jpg` : ''}" alt="${artwork.title}" />
    `;
    resultsContainer.appendChild(artworkElement);
  });
}

// Filter artworks based on user input
function filterArtworks(artworks, searchQuery) {
  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (artwork.artist_title && artwork.artist_title.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return filteredArtworks;
}

// Main function
async function main() {
  const artworks = await fetchData('https://api.artic.edu/api/v1/artworks?limit=100');

  // Render all artworks initially
  //renderArtworks(artworks);
  //   searchInput.value = ''; // Clear the search input field after initial render

  // Add event listener to the search form
  const searchForm = document.querySelector('.mainform');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const searchInput = document.getElementById('searchbox');
    const searchQuery = searchInput.value.trim();
    const filteredArtworks = filterArtworks(artworks, searchQuery);
    renderArtworks(filteredArtworks);
    // searchInput.value = ''; // Clear the search input field after performing a search
  });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', main);