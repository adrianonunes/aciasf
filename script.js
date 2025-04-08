// Funções para o banner rotativo
let bannerIndex = 0;
const banners = document.getElementsByClassName("banner");
const dots = document.getElementsByClassName("dot");

function showBanners() {
    // Ocultar todos os banners
    for (let i = 0; i < banners.length; i++) {
        banners[i].classList.remove("active-banner");
        dots[i].classList.remove("active-dot");
    }
    
    // Avançar para o próximo banner
    bannerIndex++;
    if (bannerIndex >= banners.length) {
        bannerIndex = 0;
    }
    
    // Mostrar o banner atual
    banners[bannerIndex].classList.add("active-banner");
    dots[bannerIndex].classList.add("active-dot");
    
    // Definir o próximo timeout
    setTimeout(showBanners, 6000); // Muda a cada 6 segundos
}

// Função para selecionar um banner específico
function currentBanner(n) {
    // Parar a rotação automática temporariamente
    clearTimeout(window.bannerTimeout);
    
    // Ocultar todos os banners
    for (let i = 0; i < banners.length; i++) {
        banners[i].classList.remove("active-banner");
        dots[i].classList.remove("active-dot");
    }
    
    // Mostrar o banner solicitado
    bannerIndex = n;
    banners[bannerIndex].classList.add("active-banner");
    dots[bannerIndex].classList.add("active-dot");
    
    // Reiniciar a rotação automática após um tempo
    window.bannerTimeout = setTimeout(showBanners, 6000);
}

// Rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Função para mostrar/ocultar o botão "Voltar ao Topo"
function toggleScrollTopButton() {
    const scrollTopButton = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('active');
    } else {
        scrollTopButton.classList.remove('active');
    }
}

// Função para aplicar efeitos ao cabeçalho durante a rolagem
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

// Função para voltar ao topo da página
document.querySelector('.scroll-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Menu Mobile
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}

// Adicionar animações aos cards de benefícios
function addBenefitCardAnimations() {
    const cards = document.querySelectorAll('.benefit-card');
    
    cards.forEach((card, index) => {
        // Adicionar delay para animação em cascata
        const delay = index * 0.1;
        card.style.transitionDelay = `${delay}s`;
        
        // Animação ao passar o mouse
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
            
            // Animar o ícone
            const icon = this.querySelector('.benefit-icon-container');
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
                icon.style.background = 'var(--gradient-primary)';
                icon.style.color = 'white';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = 'var(--shadow-md)';
            
            // Resetar animação do ícone
            const icon = this.querySelector('.benefit-icon-container');
            if (icon) {
                icon.style.transform = '';
                icon.style.background = 'var(--light-color)';
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
}

// Animação para o botão "Associe-se"
function setupJoinButtonAnimation() {
    const joinButton = document.querySelector('.join-button');
    if (joinButton) {
        joinButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-red)';
        });
        
        joinButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    }
}

// Animar elementos quando entram na viewport
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.benefit-card, .video-container, .section-title, .category-title, .investment-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animate__fadeInDown');
                } else if (entry.target.classList.contains('benefit-card')) {
                    entry.target.classList.add('animate__fadeInUp');
                } else if (entry.target.classList.contains('video-container')) {
                    entry.target.classList.add('animate__zoomIn');
                } else if (entry.target.classList.contains('category-title')) {
                    entry.target.classList.add('animate__fadeIn');
                } else if (entry.target.classList.contains('investment-card')) {
                    entry.target.classList.add('animate__fadeInUp');
                }
                
                // Parar de observar o elemento após animar
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar tudo quando a página carrega
window.addEventListener('load', function() {
    // Iniciar o banner rotativo
    showBanners();
    
    // Configurar animações
    addBenefitCardAnimations();
    setupJoinButtonAnimation();
    setupScrollAnimations();
    
    // Verificar posição inicial de rolagem
    toggleScrollTopButton();
    handleHeaderScroll();
});

// Adicionar listeners para eventos de rolagem
window.addEventListener('scroll', function() {
    toggleScrollTopButton();
    handleHeaderScroll();
});

// Aplicar efeito "ripple" aos botões
function createRippleEffect(event) {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Adicionar efeito de ripple aos botões
const buttons = document.querySelectorAll('.btn, .join-button');
buttons.forEach(button => {
    button.addEventListener('click', createRippleEffect);
});