// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Highlight active section in navbar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, header');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    searchMovies();
});

async function searchMovies() {
    const input = document.getElementById("searchInput").value;
    const container = document.getElementById("movieContainer");

    if (!input.trim()) {
        container.innerHTML = "<p style='text-align: center; padding: 2rem; font-size: 1.2rem;'>Please enter a movie name.</p>";
        return;
    }

    // Show search title and scroll to search section
    const searchTitle = document.getElementById("searchTitle");
    searchTitle.style.display = "block";
    document.getElementById("search").scrollIntoView({ behavior: 'smooth' });

    container.innerHTML = "<p style='text-align: center; padding: 2rem; font-size: 1.2rem;'>Loading...</p>";

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=564727fa&s=${input}`);
        const data = await res.json();

        container.innerHTML = "";

        if (data.Response === "False") {
            container.innerHTML = "<p style='text-align: center; padding: 2rem; font-size: 1.2rem;'>No results found. Try another search.</p>";
            return;
        }

        data.Search.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title} poster">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <p class="movie-type">${movie.Type}</p>
            `;
            container.appendChild(movieCard);
        });
    } catch (error) {
        container.innerHTML = "<p style='text-align: center; padding: 2rem; font-size: 1.2rem; color: #ff6b6b;'>Error loading movies. Please try again.</p>";
        console.error('Error fetching movies:', error);
    }
}
