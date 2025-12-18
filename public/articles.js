// Articles Page JavaScript

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter articles
        articleCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Load More functionality (placeholder - can be extended to load from API)
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // This is a placeholder - you can extend this to load more articles from an API
        loadMoreBtn.textContent = 'No More Articles';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.6';
        
        // Show notification
        showNotification('All articles loaded!', 'success');
    });
}

// Notification function (reuse from main script if available)
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll for article links (if they point to anchors)
document.querySelectorAll('.article-title a, .article-read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            // In a real implementation, you would navigate to the full article page
            // For now, we'll just show a message
            showNotification('Article detail page coming soon!', 'success');
        }
    });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const articleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all article cards
articleCards.forEach(card => {
    articleObserver.observe(card);
});

