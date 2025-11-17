document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const contrastToggle = document.getElementById('contrast-toggle');
    const contrastLink = document.querySelector('link[href="css/contrast.css"]');

    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

   
    const isHighContrast = localStorage.getItem('high-contrast') === 'true';
    if (isHighContrast && contrastLink) {
        contrastLink.disabled = false;
        document.documentElement.classList.add('high-contrast');
    }

    // Lógica para alternar Modo Escuro/Claro
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', `Alternar para modo ${newTheme === 'dark' ? 'claro' : 'escuro'}`);
        });
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }


    if (contrastToggle && contrastLink) {
        contrastToggle.addEventListener('click', () => {
            const newContrastState = !contrastLink.disabled;
            
            contrastLink.disabled = newContrastState;
            document.documentElement.classList.toggle('high-contrast', !newContrastState);
            localStorage.setItem('high-contrast', !newContrastState);
            
            const label = !newContrastState ? 'Desativar alto contraste' : 'Alternar para alto contraste';
            contrastToggle.setAttribute('aria-label', label);
        });
    }
});