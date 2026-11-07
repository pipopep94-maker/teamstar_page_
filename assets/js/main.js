/* ==========================================
   LÓGICA PRINCIPAL - TEAM STARPARK SPA
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del DOM
    const btnOpenMenu = document.getElementById('btn-open-menu');
    const btnCloseMenu = document.getElementById('btn-close-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.app-section');

    // Configuración & Modal
    const btnConfig = document.getElementById('btn-config');
    const modalConfig = document.getElementById('modal-config');
    const btnCloseConfig = document.getElementById('btn-close-config');
    const toggleRunic = document.getElementById('toggle-runic');

    // Zona Admin
    const btnLoginAdmin = document.getElementById('btn-login-admin');
    const adminPassInput = document.getElementById('admin-pass');
    const adminAuth = document.getElementById('admin-auth');
    const adminPanel = document.getElementById('admin-panel');
    const authError = document.getElementById('auth-error');
    const btnLogoutAdmin = document.getElementById('btn-logout-admin');

    // --- FUNCIONES DE NAVEGACIÓN (SPA) ---
    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }

    btnOpenMenu.addEventListener('click', openMenu);
    btnCloseMenu.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Cambiar de Pestaña al hacer clic en el menú
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');

            // Actualizar clases activas en los enlaces
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            // Mostrar la sección correspondiente y ocultar las demás
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Cerrar menú en dispositivos móviles automáticamente
            closeMenu();
            window.scrollTo(0, 0);
        });
    });

    // --- MODAL DE CONFIGURACIÓN ---
    btnConfig.addEventListener('click', () => {
        modalConfig.classList.add('show');
    });

    btnCloseConfig.addEventListener('click', () => {
        modalConfig.classList.remove('show');
    });

    modalConfig.addEventListener('click', (e) => {
        if (e.target === modalConfig) {
            modalConfig.classList.remove('show');
        }
    });

    // --- MODO SÍMBOLOS RÚNICOS / RAROS ---
    const textElements = {
        title: document.getElementById('txt-title'),
        heroTitle: document.getElementById('txt-hero-title'),
        rosterTitle: document.getElementById('txt-roster-title'),
        cmdTitle: document.getElementById('txt-cmd-title'),
        rulesTitle: document.getElementById('txt-rules-title'),
        adminTitle: document.getElementById('txt-admin-title')
    };

    const originalTexts = {
        title: textElements.title ? textElements.title.textContent : '',
        heroTitle: textElements.heroTitle ? textElements.heroTitle.textContent : '',
        rosterTitle: textElements.rosterTitle ? textElements.rosterTitle.textContent : '',
        cmdTitle: textElements.cmdTitle ? textElements.cmdTitle.textContent : '',
        rulesTitle: textElements.rulesTitle ? textElements.rulesTitle.textContent : '',
        adminTitle: textElements.adminTitle ? textElements.adminTitle.textContent : ''
    };

    toggleRunic.addEventListener('change', (e) => {
        if (e.target.checked) {
            if (textElements.title) textElements.title.textContent = "𝕾𝕿𝕬𝕽𝕻𝕬𝕽𝕼";
            if (textElements.heroTitle) textElements.heroTitle.textContent = "¡𝕭𝕴𝕰𝕹𝖁𝕰𝕹𝕴𝕯𝕺 𝕬𝕃 𝕻𝕬𝕽𝕼𝖀𝕰!";
            if (textElements.rosterTitle) textElements.rosterTitle.textContent = "𝕽𝕺𝕾𝕿𝕰𝕽 𝕯𝕰 𝕭𝕽𝕬𝖂𝕷𝕰𝕽𝕾";
            if (textElements.cmdTitle) textElements.cmdTitle.textContent = "𝕮𝕺𝕸𝕬𝕹𝕯𝕺𝕾 𝕯𝕰𝕃 𝕭𝕺𝕿";
            if (textElements.rulesTitle) textElements.rulesTitle.textContent = "𝕽𝕰𝕲𝕃𝕬𝕸𝕰𝕹𝕿𝕺 𝕺𝕱𝕴𝕮𝕴𝕬𝕃";
            if (textElements.adminTitle) textElements.adminTitle.textContent = "𝕮𝖀𝕬𝕽𝕿𝕰𝕽 𝕬𝕯𝕸𝕴𝕲";
        } else {
            if (textElements.title) textElements.title.textContent = originalTexts.title;
            if (textElements.heroTitle) textElements.heroTitle.textContent = originalTexts.heroTitle;
            if (textElements.rosterTitle) textElements.rosterTitle.textContent = originalTexts.rosterTitle;
            if (textElements.cmdTitle) textElements.cmdTitle.textContent = originalTexts.cmdTitle;
            if (textElements.rulesTitle) textElements.rulesTitle.textContent = originalTexts.rulesTitle;
            if (textElements.adminTitle) textElements.adminTitle.textContent = originalTexts.adminTitle;
        }
    });

    // --- AUTENTICACIÓN DE ADMINISTRADORES ---
    const ADMIN_PASSWORD = "thebestfamily"; // Contraseña actualizada

    btnLoginAdmin.addEventListener('click', () => {
        const enteredPass = adminPassInput.value.trim();
        if (enteredPass === ADMIN_PASSWORD) {
            authError.textContent = "";
            adminAuth.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            adminPassInput.value = "";
        } else {
            authError.textContent = "Contraseña incorrecta. Intenta de nuevo.";
            adminPassInput.value = "";
        }
    });

    adminPassInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnLoginAdmin.click();
        }
    });

    btnLogoutAdmin.addEventListener('click', () => {
        adminPanel.classList.add('hidden');
        adminAuth.classList.remove('hidden');
    });
});

/* --- FUNCIÓN GLOBAL DE COPIADO RÁPIDO --- */
function copyCommand(text) {
    navigator.clipboard.writeText(text).then(() => {
        const alertBox = document.createElement('div');
        alertBox.textContent = `¡Comando copiado: ${text}!`;
        alertBox.style.position = 'fixed';
        alertBox.style.bottom = '20px';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translateX(-50%)';
        alertBox.style.backgroundColor = '#f472b6';
        alertBox.style.color = '#000';
        alertBox.style.padding = '8px 16px';
        alertBox.style.borderRadius = '20px';
        alertBox.style.fontWeight = 'bold';
        alertBox.style.zIndex = '1000';
        alertBox.style.fontSize = '0.85rem';
        alertBox.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.remove();
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}