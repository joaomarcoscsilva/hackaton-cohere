// Global constants for the html elements

const chatContainer = document.getElementById("chat-container");
const buttonContainer = document.querySelector('.button-container');
const resultsContainer = document.getElementById("results-container");
const titleContainer = document.getElementById("title-container");
const summaryContainer = document.getElementById("summary-container");
const title = document.getElementById("title");

const booksContainer = document.getElementById("books-container");
const moviesContainer = document.getElementById("movies-container");
const articlesContainer = document.getElementById("articles-container");
const songsContainer = document.getElementById("songs-container");

const songsItemTitle = document.getElementById("songs-title");
const songsItemArtist = document.getElementById("songs-artist");
const songsItemLyrics = document.getElementById("songs-lyrics");

const sendButton = document.getElementById('send-button');
const bookButton = document.getElementById('book-button');
const movieButton = document.getElementById('movie-button');
const songButton = document.getElementById('song-button');
const articleButton = document.getElementById('article-button');

var titleInput = document.getElementById("title-input");
var lyricsInput = document.getElementById("lyrics-input");

// Variable for storing the song summary
var summary;

// Stores which result view is visible
var visible;

function slideUp() {
    // Submit animation and transition
    chatContainer.style.transition = "transform 1s ease";
    chatContainer.style.transform = "translateY(300%)";

    chatContainer.addEventListener('transitionend', function() {
        buttonContainer.classList.add('visible'); 
        resultsContainer.classList.add('visible');
        chatContainer.style.display = "none";
    }, { once: true });

}

function change_visible(to_show) {
    // Change the visible result view

    // Hide the previously visible view
    visible.classList.remove('visible');
    resultsContainer.classList.remove('visible');

    resultsContainer.addEventListener('transitionend', function() {
        // Remove the previous view from the display
        titleContainer.classList.remove('visible');
        titleContainer.style.display = "none";

        // Add the new view to the display
        to_show.classList.add('visible');
        resultsContainer.classList.add('visible');
        visible.style.display = "none";
        to_show.style.display = "block";
        visible = to_show;
    }, { once: true });
}

sendButton.addEventListener('click', function() {
    // Submit the title and lyrics to the server

    titleContainer.innerHTML = titleInput.value;

    // Show the title container
    summaryContainer.classList.add('visible');
    visible = summaryContainer;

    // Show the animation
    slideUp();


    // Fetch the summary
    fetch('/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titleInput.value, lyrics: lyricsInput.value }),
    }).then(response => response.json()).then(data => {
        summary = data.summary;
        summaryContainer.innerHTML = summary;
    })
});


function create_list(container, data) {
    // Create a list of items from the returned data, such as movies and books

    // Remove the previous contents
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create the new components
    for (const title_str in data) {
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("list-item-container");
        container.appendChild(itemDiv);

        var itemTitle = document.createElement("div");
        itemTitle.classList.add("list-item-title");
        itemTitle.innerHTML = title_str;
        itemDiv.appendChild(itemTitle);

        var itemSummary = document.createElement("div");
        itemSummary.classList.add("list-item-desc");
        itemSummary.innerHTML = data[title_str];
        itemDiv.appendChild(itemSummary);
    }
}

bookButton.addEventListener('click', function() {
    // Fetch the books from the server

    change_visible(booksContainer);

    fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: summary}),
    }).then(response => response.json()).then(data => {
        create_list(booksContainer, data.books);
    })
});

movieButton.addEventListener('click', function() {
    // Fetch the movies from the server

    change_visible(moviesContainer);

    fetch('/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: summary}),
    }).then(response => response.json()).then(data => {
        create_list(moviesContainer, data.movies);
    })
});

articleButton.addEventListener('click', function() {
    // Fetch the articles from the server

    change_visible(articlesContainer);

    fetch('/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: summary}),
    }).then(response => response.json()).then(data => {
        create_list(articlesContainer, data.articles);
    })
});

songButton.addEventListener('click', function() {
    // Fetch the song from the server

    change_visible(songsContainer);

    fetch('/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: summary}),
    }).then(response => response.json()).then(data => {
        songsItemTitle.innerHTML = data.song.track_name;
        songsItemArtist.innerHTML = data.song.artist_name;
        songsItemLyrics.innerHTML = data.song.lyrics; 
    })
});
