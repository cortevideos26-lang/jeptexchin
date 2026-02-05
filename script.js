// Menu mobile responsivo
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown Menu - suporta múltiplos dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menuLinks = dropdown.querySelectorAll('.dropdown-menu a');

        if (!toggle) return;

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // fechar ao clicar em link do próprio menu
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                dropdown.classList.remove('active');
            });
        });
    });

    // Fechar qualquer dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Efeito de scroll do header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Verificar se está aberto agora
    verificarStatusAberto();
});

function verificarStatusAberto() {
    const now = new Date();
    const dia = now.getDay(); // 0 = domingo, 6 = sábado
    const hora = now.getHours();
    const minuto = now.getMinutes();

    // Segunda a domingo: 6h - 19h
    const isAberto = (hora >= 6 && hora < 19);

    const statusElement = document.getElementById('horarios');
    if (statusElement) {
        const statusHTML = `
            Segunda a Domingo<br>
            06:00 - 19:00<br>
            <strong style="color: ${isAberto ? '#27ae60' : '#e74c3c'}; margin-top: 10px; display: block;">
                ${isAberto ? '✓ Aberto agora!' : '✗ Fechado no momento'}
            </strong>
        `;
        statusElement.innerHTML = statusHTML;
    }
}

/* Lightbox gallery logic */
document.addEventListener('click', function(e) {
    // open lightbox when clicking a gallery item
    const item = e.target.closest('.gallery-item');
    if (item && item.querySelector('img')) {
        openLightboxFromElement(item);
    }
});

function openLightboxFromElement(item) {
    const galleryGrid = item.closest('.gallery-grid');
    if (!galleryGrid) return;

    // collect images in this gallery
    const imgs = Array.from(galleryGrid.querySelectorAll('img'));
    const currentIndex = imgs.findIndex(i => i === item.querySelector('img'));
    showLightbox(imgs.map(i => i.src), currentIndex);
}

function showLightbox(srcList, startIndex) {
    let index = startIndex || 0;

    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<span class="close">&times;</span><span class="prev">‹</span><img src=""><span class="next">›</span>';
        document.body.appendChild(lightbox);

        lightbox.querySelector('.close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.prev').addEventListener('click', function(e){ e.stopPropagation(); showPrev(); });
        lightbox.querySelector('.next').addEventListener('click', function(e){ e.stopPropagation(); showNext(); });
        lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', function(e){ if (!lightbox.classList.contains('active')) return; if (e.key === 'ArrowLeft') showPrev(); if (e.key === 'ArrowRight') showNext(); if (e.key === 'Escape') closeLightbox(); });
    }

    const imgEl = lightbox.querySelector('img');

    function render() {
        imgEl.src = srcList[index];
    }

    function showPrev(){ index = (index - 1 + srcList.length) % srcList.length; render(); }
    function showNext(){ index = (index + 1) % srcList.length; render(); }
    function closeLightbox(){ lightbox.classList.remove('active'); }

    lightbox.showPrev = showPrev;
    lightbox.showNext = showNext;

    lightbox.classList.add('active');
    render();
}

function showPrev() { const lb = document.querySelector('.lightbox'); if (lb && lb.showPrev) lb.showPrev(); }
function showNext() { const lb = document.querySelector('.lightbox'); if (lb && lb.showNext) lb.showNext(); }
function closeLightbox() { const lb = document.querySelector('.lightbox'); if (lb) lb.classList.remove('active'); }
