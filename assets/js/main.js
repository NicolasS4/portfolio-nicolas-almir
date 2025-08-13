// Função para carregar o tema salvo ou detectar preferência do sistema
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Função para alternar entre temas
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Função para aplicar o tema
function setTheme(theme) {
    const themeStyle = document.getElementById('theme-style');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (theme === 'light') {
        themeStyle.href = './assets/css/light-mode.css';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeStyle.href = './assets/css/dark-mode.css';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    localStorage.setItem('theme', theme);
}

// Função para o menu mobile
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileLinks');
    if (!menuToggle || !mobileMenu) {
        console.error('Elementos do menu mobile não encontrados!');
        return;
    }
    const menuIcon = menuToggle.querySelector('i');
    // Estado inicial do menu
    let isMenuOpen = false;
    // Função para abrir o menu
    const openMenu = () => {
        mobileMenu.style.display = 'block';
        if (menuIcon) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        }
        isMenuOpen = true;
    };
    
    // Função para fechar o menu
    const closeMenu = () => {
        mobileMenu.style.display = 'none';
        if (menuIcon) {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
        isMenuOpen = false;
    };
    
    // Função para alternar o menu
    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };
    closeMenu();

    menuToggle.addEventListener('click', toggleMenu);

    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { 
            closeMenu();
        }
    });
}

// Inicializa o menu quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupMobileMenu);
// Chamar a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// Chamar a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// Função para o loader do terminal
function setupTerminalLoader() {
    const terminalLoader = document.getElementById('terminal-loader');
    const typingAnimation = document.getElementById('typing-animation');
    
    if (!terminalLoader || !typingAnimation) return;

    // Limpa o conteúdo inicial
    typingAnimation.innerHTML = '<span class="prompt">$</span> Initializing portfolio system...';
    const messages = [
        { text:"", delay: 2600 },
    ];
    
    let currentMessage = 0;
    
    function showNextMessage() {
        if (currentMessage >= messages.length) {
            // Finaliza a animação quando todas as mensagens foram exibidas
            terminalLoader.style.opacity = '0';
            setTimeout(() => {
                terminalLoader.style.display = 'none';
            }, 500);
            return;
        }

        const message = messages[currentMessage];
        setTimeout(() => {
            typingAnimation.innerHTML += `<br><span class="prompt">$</span> ${message.text}`;
            currentMessage++;
            showNextMessage();
        }, message.delay);
    }
    
    // Inicia a sequência
    showNextMessage();
}

// Chama a função quando a página carrega
window.addEventListener('load', setupTerminalLoader);

// Função para animações de scroll
function setupScrollAnimation() {
    const elements = document.querySelectorAll('[data-anime="scroll"]');
    const windowHeight = window.innerHeight * 0.8;
    
    function animateScroll() {
        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const isElementVisible = elementTop - windowHeight < 0;
            
            if (isElementVisible) {
                element.classList.add('ativo');
            }
        });
    }
    
    if (elements.length) {
        animateScroll();
        window.addEventListener('scroll', animateScroll);
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    setupMobileMenu();
    setupTerminalLoader();
    setupScrollAnimation();
    
    // Configura o botão de alternar tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});