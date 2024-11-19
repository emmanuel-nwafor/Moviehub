
const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');


searchButton.addEventListener('click', () =>{
  const closeLanding = document.getElementById('closeLanding')
  closeLanding.style.display = 'none';
})



searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});

async function fetchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayResults(movies) {
  results.innerHTML = ''; 
  if (movies.length === 0) {
    results.innerHTML = '<p>Sorry no results found.</p>';
    results.style.color = 'red'
    results.style.fontSize = '25px'
    results.style.textAlign = 'center'
    results.style.margin = '60px'
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/500x750'}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.overview || 'No description available.'}</p>
      
      <button class="download-btn" onclick="downloadDetails('${movie.title}', '${movie.overview}')">Download Details</button>
    `;

    results.appendChild(card);
  });
}

function downloadDetails(title, overview) {
  const element = document.createElement('a');
  const fileContent = `Title: ${title}\n\nDescription:\n${overview}`;
  const blob = new Blob([fileContent], { type: 'text/plain' });
  element.href = URL.createObjectURL(blob);
  element.download = `${title}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
