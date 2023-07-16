const API_KEY = "342773221ae44bb0a515a8002933ef2f";
const url = "https://newsapi.org/v2/everything?q=";
 
window.addEventListener('load', () => fetchNews("Latest"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    collectData(data.articles);
}

function collectData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const newsCard = newsCardTemplate.content.cloneNode(true); 
        cardData(newsCard, article);
        cardsContainer.appendChild(newsCard);
    });
}

function cardData(newsCard, article) {
    const newsImg = newsCard.querySelector('#news-image');  
    const newsTitle = newsCard.querySelector('#news-title');
    const newsSource = newsCard.querySelector('#news-source');
    const newsDesc = newsCard.querySelector('#news-desc');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    newsCard.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;
});