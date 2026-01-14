// Page switching function
function showPage(pageId) {
    // Get all page sections
    const pages = document.querySelectorAll('.page-section');
    
    // Hide all pages with fade-out animation
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                page.classList.remove('active');
                page.style.animation = '';
            }, 300);
        }
    });
    
    // Show selected page with fade-in animation
    setTimeout(() => {
        const selectedPage = document.getElementById(pageId);
        selectedPage.classList.add('active');
        selectedPage.style.animation = 'fadeIn 0.5s ease-out forwards';
        
        // Update tab active state
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Find the corresponding tab
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            if (tab.getAttribute('onclick') === `showPage('${pageId}')`) {
                tab.classList.add('active');
            }
        });
        
        // Scroll to top
        document.querySelector('.content').scrollTop = 0;
    }, 300);
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Update button active states
    const btns = document.querySelectorAll('.inner-nav-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function copyEmail() {
    const email = 'komal1080atif@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const originalText = event.currentTarget.querySelector('p').textContent;
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        const originalIcon = icon.className;
        
        // Show success feedback
        event.currentTarget.querySelector('p').textContent = '✅ Copied to clipboard!';
        icon.className = 'fas fa-check';
        
        setTimeout(() => {
            event.currentTarget.querySelector('p').textContent = originalText;
            icon.className = originalIcon;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        alert('Failed to copy email. Please copy it manually: ' + email);
    });
}

// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to skill boxes
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(3deg)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Handle project card clicks without href
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (!card.href) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.querySelector('h3').textContent;
                
                // Create a modal-like notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 25px 35px;
                    border-radius: 15px;
                    border: 3px solid #ffb3d9;
                    z-index: 1000;
                    text-align: center;
                    animation: fadeIn 0.3s ease-out;
                `;
                notification.innerHTML = `
                    <h3 style="color: #ffb3d9; margin-bottom: 10px;">🚧 Project Under Development</h3>
                    <p style="margin-bottom: 15px;">"${title}" is currently in progress.</p>
                    <p style="font-size: 0.9rem; color: #ccc;">Check back soon for updates!</p>
                `;
                
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            });
        }
    });

    // Smooth scroll for buttons
    const pageButtons = document.querySelectorAll('button[onclick^="showPage"]');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 350);
        });
    });

    // Add click effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!this.href) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });

    // Initialize animations on load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === '1' || e.key === 'Home') {
            showPage('home');
        } else if (e.key === '2' || e.key === 'a') {
            showPage('about');
        } else if (e.key === '3' || e.key === 'p') {
            showPage('projects');
        }
    });

    // Log page views (optional)
    console.log('Komal Atif Portfolio loaded successfully!');
    console.log('Navigation shortcuts: 1/Home, 2/a, 3/p');
});

// Make functions globally available
window.showPage = showPage;
window.scrollToSection = scrollToSection;
window.copyEmail = copyEmail;