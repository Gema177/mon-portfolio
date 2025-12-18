// Système de like persistant avec localStorage
class LikeSystem {
    constructor() {
        this.likes = this.loadLikes();
        this.init();
    }

    // Charger les likes depuis localStorage
    loadLikes() {
        const saved = localStorage.getItem('blogLikes');
        return saved ? JSON.parse(saved) : {};
    }

    // Sauvegarder les likes dans localStorage
    saveLikes() {
        localStorage.setItem('blogLikes', JSON.stringify(this.likes));
    }

    // Initialiser le système
    init() {
        this.createLikeButtons();
        this.updateAllLikeCounts();
        this.attachEventListeners();
    }

    // Créer les boutons de like pour chaque article
    createLikeButtons() {
        const articles = document.querySelectorAll('.blog-card, .article-complet-section');
        
        articles.forEach(article => {
            const articleId = this.getArticleId(article);
            if (!articleId) return;

            // Vérifier si le bouton existe déjà
            if (article.querySelector('.like-button')) return;

            const likeButton = document.createElement('div');
            likeButton.className = 'like-button';
            likeButton.innerHTML = `
                <button class="like-btn" data-article-id="${articleId}">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="like-count">0</span>
                </button>
                <span class="like-text">J'aime</span>
            `;

            // Ajouter le bouton après le contenu de l'article
            const content = article.querySelector('.blog-content, .article-content');
            if (content) {
                content.appendChild(likeButton);
            }
        });
    }

    // Obtenir l'ID de l'article
    getArticleId(article) {
        // Priorité aux IDs explicites
        if (article.id) return article.id;
        
        // Extraire depuis les liens
        const link = article.querySelector('a[href*="#"]');
        if (link) {
            const href = link.getAttribute('href');
            return href.replace('#', '');
        }
        
        // Générer un ID basé sur le titre
        const title = article.querySelector('h3, h1');
        if (title) {
            return title.textContent.toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .trim('-');
        }
        
        return null;
    }

    // Mettre à jour tous les compteurs de like
    updateAllLikeCounts() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            const articleId = btn.getAttribute('data-article-id');
            const count = this.likes[articleId] || 0;
            const countSpan = btn.querySelector('.like-count');
            if (countSpan) {
                countSpan.textContent = count;
            }
            
            // Mettre à jour l'état visuel
            if (this.isUserLiked(articleId)) {
                btn.classList.add('liked');
            }
        });
    }

    // Attacher les écouteurs d'événements
    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) {
                const btn = e.target.closest('.like-btn');
                const articleId = btn.getAttribute('data-article-id');
                this.toggleLike(articleId, btn);
            }
        });
    }

    // Basculer le like
    toggleLike(articleId, button) {
        if (!this.likes[articleId]) {
            this.likes[articleId] = 0;
        }

        const isLiked = this.isUserLiked(articleId);
        const countSpan = button.querySelector('.like-count');
        
        if (isLiked) {
            // Unlike
            this.likes[articleId]--;
            button.classList.remove('liked');
        } else {
            // Like
            this.likes[articleId]++;
            button.classList.add('liked');
            this.animateLike(button);
        }

        countSpan.textContent = this.likes[articleId];
        this.saveLikes();
    }

    // Vérifier si l'utilisateur a liké
    isUserLiked(articleId) {
        const userLikes = localStorage.getItem('userLikes') || '{}';
        const likes = JSON.parse(userLikes);
        return likes[articleId] === true;
    }

    // Animer le like
    animateLike(button) {
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}

// Ajouter les styles CSS pour les likes
function addLikeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .like-button {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .like-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #f0f2f5;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            color: #65676b;
            transition: all 0.2s ease;
            font-weight: 500;
        }

        .like-btn:hover {
            background: #e4e6eb;
            transform: translateY(-1px);
        }

        .like-btn.liked {
            background: #1877f2;
            color: white;
        }

        .like-btn.liked:hover {
            background: #166fe5;
        }

        .like-btn i {
            font-size: 1rem;
        }

        .like-count {
            font-weight: 600;
            min-width: 20px;
            text-align: center;
        }

        .like-text {
            color: #65676b;
            font-size: 0.9rem;
        }

        @keyframes likeAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }

        .like-btn.animating {
            animation: likeAnimation 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialiser le système quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    addLikeStyles();
    new LikeSystem();
});

// Exporter pour utilisation dans d'autres pages
window.LikeSystem = LikeSystem;


document.addEventListener("DOMContentLoaded", function () {

    const readLink = document.querySelector(".featured-link");
    const article = document.getElementById("article-complet");

    if (!readLink || !article) return;

    // Sécurité : cacher au chargement
    article.classList.remove("show");

    readLink.addEventListener("click", function (e) {
        e.preventDefault(); // empêche le saut direct

        // Affiche l'article
        article.classList.add("show");

        // Scroll doux vers l'article
        article.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Optionnel : cacher le lien après clic
        readLink.style.display = "none";
    });

});