// Get references to the HTML elements
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const movieResults = document.getElementById('movie-results');
const movieDetailsContainer = document.getElementById('movie-details-container');

// Movie API URL (you can replace this with your actual API endpoint)
const apiKey = 'cc83e729'; // Replace with your actual API key
const apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&s='; // Example: OMDB API endpoint

// Function to fetch movie data
const fetchMovies = async (query) => {
    if (!query) {
        movieResults.innerHTML = "<p>Please enter a movie name to search.</p>";
        // movieResults.querySelector("p").style.color="#fff";
        // movieResults.querySelector("p").style.fontFamily="Poppins",sans-serif ;
        movieResults.querySelector("p").style.fontSize = "18px";
        movieResults.querySelector("p").style.color = "white";
        movieResults.querySelector("p").style.textAlign = "center";
        movieResults.querySelector("p").style.padding = "10px";
        movieResults.querySelector("p").style.backgroundColor = "none";
        movieResults.querySelector("p").style.borderRadius = "5px";
        return;
    }

    try {
        const response = await fetch(apiUrl + query);
        const data = await response.json();

        // If no results are found
        if (data.Response === 'False') {
            movieResults.innerHTML = "<p>No movies found. Please try again.</p>";
            movieResults.querySelector("p").style.fontSize = "18px";
            movieResults.querySelector("p").style.color = "white";
            movieResults.querySelector("p").style.textAlign = "center";
            movieResults.querySelector("p").style.padding = "10px";
            movieResults.querySelector("p").style.backgroundColor = "none";
            movieResults.querySelector("p").style.borderRadius = "5px";
            return;
        }

        displayMovies(data.Search);
    } catch (error) {
        movieResults.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        console.error('Error:', error);
    }
};

// Function to display the movie results
const displayMovies = (movies) => {
    movieResults.innerHTML = ''; // Clear any previous results

    // Loop through the movie results and create HTML for each movie
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');

        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <p class="movie-overview">Year: ${movie.Year}</p>

                <button class="view-details-btn" data-id="${movie.imdbID}">View Details</button>
            
            </div>
        `;
        
// let imgElement = movieElement.querySelector("img");
// let titleElement = movieElement.querySelector(".movie-title");
// let overviewElement = movieElement.querySelector(".movie-overview");
// let buttonElement = movieElement.querySelector(".view-details-btn");

// // Apply inline styles to each element
// imgElement.style.width = "200px";
// imgElement.style.borderRadius = "8px";

// titleElement.style.fontSize = "20px";
// titleElement.style.color = "#333";

// overviewElement.style.fontSize = "16px";
// overviewElement.style.color = "#666";

// buttonElement.style.padding = "10px";
// buttonElement.style.backgroundColor = "#007BFF";
// buttonElement.style.color = "white";
// buttonElement.style.border = "none";
// buttonElement.style.borderRadius = "5px";
// buttonElement.style.cursor = "pointer";

        movieResults.appendChild(movieElement);

        // Add event listener for the "View Details" button
        const viewDetailsBtn = movieElement.querySelector('.view-details-btn');

        viewDetailsBtn.addEventListener('click', () => {
            fetchMovieDetails(viewDetailsBtn.dataset.id);
            return;
        });
    });
};

// Function to fetch and display detailed movie information
const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
        const data = await response.json();

        if (data.Response === 'False') {
            movieDetailsContainer.innerHTML = "<p>No details available for this movie.</p>";
            return;
        }

        displayMovieDetails(data);
    } catch (error) {
        movieDetailsContainer.innerHTML = "<p>Error fetching movie details. Please try again later.</p>";
        console.error('Error:', error);
    }
};

// Function to display movie details
const displayMovieDetails = (movie) => {
    movieDetailsContainer.style.display = 'block'; // Show the details container

    movieDetailsContainer.innerHTML = `
        <div class="movie-details">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-overview"><strong>Year:</strong> ${movie.Year}</p>
            <p class="movie-overview"><strong>Genre:</strong> ${movie.Genre}</p>
            <p class="movie-overview"><strong>Plot:</strong> ${movie.Plot}</p>
            <p class="movie-overview"><strong>Director:</strong> ${movie.Director}</p>
            <p class="movie-overview"><strong>Actors:</strong> ${movie.Actors}</p>

        </div>
       
    `;

    let button=document.createElement("button");
    button.textContent="Back";
    button.classList.add("back_button");
    button.addEventListener("click",

        ()=>
        {
            window.location.href="./index.html";
            alert("Thank you for using us!");
        }

    );
    movieDetailsContainer.appendChild(button);
  
    movieDetailsContainer.style.color = 'black';
};

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchMovies(query);
});

// Optional: Add event listener for Enter key (to trigger search)
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        fetchMovies(query);
    }
});
