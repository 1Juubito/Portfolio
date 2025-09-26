'use strict';
document.addEventListener('DOMContentLoaded', function () {

    const blogContainer = document.getElementById('blog-container');

    async function getDevToNews() {
        const endpoint = 'https://dev.to/api/articles?per_page=6&top=1';
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`A requisição falhou com status: ${response.status}`);
            }
            const articles = await response.json();
            displayNews(articles);
        } catch (error) {
            console.error("Erro ao buscar notícias do DEV.to:", error);
            blogContainer.innerHTML = "<p>Oops! Não foi possível carregar as notícias. Tente novamente mais tarde.</p>";
        }
    }

function displayNews(articles) {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';
    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>Nenhum artigo encontrado.</p>";
        return;
    }

    articles.forEach(article => {
        const postItem = document.createElement('li');
        postItem.classList.add('blog-post-item');

        const postDate = new Date(article.published_at).toLocaleDateString('pt-BR', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        const bannerHtml = article.cover_image
            ? `
            <figure class="blog-banner-box">
                <img src="${article.cover_image}" alt="${article.title}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('img-error');">
            </figure>`
            : '';

        postItem.innerHTML = `
            <a href="${article.url}" target="_blank">
                ${bannerHtml}
                <div class="blog-content">
                    <div class="blog-meta">
                        <p class="blog-category">${article.tags.split(',')[0]}</p>
                        <span class="dot"></span>
                        <time datetime="${article.published_at}">${postDate}</time>
                    </div>
                    <h3 class="h3 blog-item-title">${article.title}</h3>
                    <p class="blog-text">${article.description}</p>
                </div>
            </a>
        `;
        
        blogContainer.appendChild(postItem);
    });
}
    getDevToNews();
});