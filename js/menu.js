document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const hasDropdowns = document.querySelectorAll('.has-dropdown');

    // Menu Hambúrguer (Mobile) - Foco e Acessibilidade
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            document.body.classList.toggle('menu-open');
        });
    }

    // Dropdown Menu (Teclado/Mobile)
    hasDropdowns.forEach(item => {
        const dropdownLink = item.querySelector('a');
        const dropdownMenu = item.querySelector('ul'); // Deve ser 'ul', não '.dropdown-menu'

        // 1. Alternar estado com clique ou Enter/Espaço no link
        item.addEventListener('click', (e) => {
            // Se estiver em mobile/tablet e for um dropdown (ou se a navegação for acionada)
            if (e.target.closest('.has-dropdown')) {
                // Se for mobile, previne o link para abrir o menu
                if (mainNav.classList.contains('is-open') || window.innerWidth < 992) {
                    e.preventDefault(); 
                    const isExpanded = item.getAttribute('aria-expanded') === 'true';
                    item.setAttribute('aria-expanded', !isExpanded);
                    if (dropdownMenu) {
                        dropdownMenu.classList.toggle('is-open');
                    }
                }
            }
        });

        // 2. Fechar dropdown ao sair (WCAG: Teclado)
        item.addEventListener('focusout', (e) => {
            // Verifica se o foco saiu completamente do item pai
            if (!item.contains(e.relatedTarget)) {
                item.setAttribute('aria-expanded', 'false');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('is-open');
                }
            }
        });
    });
});