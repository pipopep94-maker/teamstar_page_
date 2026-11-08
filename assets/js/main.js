/* ==========================================
   LÓGICA PRINCIPAL - TEAM STARPARK SPA
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del DOM para Navegación
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

    // Zona Admin y Perfiles
    const btnLoginAdmin = document.getElementById('btn-login-admin');
    const adminPassInput = document.getElementById('admin-pass');
    const adminAuth = document.getElementById('admin-auth');
    const adminSelectProfile = document.getElementById('admin-select-profile');
    const profileBtns = document.querySelectorAll('.profile-btn');
    const adminPanel = document.getElementById('admin-panel');
    const authError = document.getElementById('auth-error');
    const btnLogoutAdmin = document.getElementById('btn-logout-admin');
    const greetingTitle = document.getElementById('txt-greeting-title');
    const greetingMsg = document.getElementById('txt-greeting-msg');

    // --- FUNCIONES DEL MENÚ LATERAL (DRAWER) ---
    function openMenu() {
        if (sidebar && overlay) {
            sidebar.classList.add('open');
            overlay.classList.add('show');
        }
    }

    function closeMenu() {
        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        }
    }

    if (btnOpenMenu) btnOpenMenu.addEventListener('click', openMenu);
    if (btnCloseMenu) btnCloseMenu.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Cambiar de Pestaña (SPA)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');

            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            closeMenu();
            window.scrollTo(0, 0);
        });
    });

    // --- MODAL DE CONFIGURACIÓN ---
    if (btnConfig) {
        btnConfig.addEventListener('click', () => {
            closeMenu();
            if (modalConfig) modalConfig.classList.add('show');
        });
    }

    if (btnCloseConfig) {
        btnCloseConfig.addEventListener('click', () => {
            if (modalConfig) modalConfig.classList.remove('show');
        });
    }

    if (modalConfig) {
        modalConfig.addEventListener('click', (e) => {
            if (e.target === modalConfig) {
                modalConfig.classList.remove('show');
            }
        });
    }

    // --- MODO ESCRITURA RÚNICA ---
    if (toggleRunic) {
        toggleRunic.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('runic-mode');
            } else {
                document.body.classList.remove('runic-mode');
            }
        });
    }

    // --- AUTENTICACIÓN Y SELECCIÓN DE ADMIN ---
    const ADMIN_PASSWORD = "thebestfamily"; 

    if (btnLoginAdmin) {
        btnLoginAdmin.addEventListener('click', () => {
            const enteredPass = adminPassInput.value.trim();
            if (enteredPass === ADMIN_PASSWORD) {
                if (authError) authError.textContent = "";
                if (adminAuth) adminAuth.classList.add('hidden');
                if (adminSelectProfile) adminSelectProfile.classList.remove('hidden');
                adminPassInput.value = "";
            } else {
                if (authError) authError.textContent = "Contraseña incorrecta. Intenta de nuevo.";
                adminPassInput.value = "";
            }
        });
    }

    if (adminPassInput) {
        adminPassInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnLoginAdmin.click();
            }
        });
    }

    // Clic al elegir quién eres
    profileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const adminType = btn.getAttribute('data-admin');

            if (adminType === 'roberto') {
                if (greetingTitle) greetingTitle.textContent = "¡Qué onda, Robert! 👻";
                if (greetingMsg) greetingMsg.textContent = "No te proyectes amigo :(";
            } else if (adminType === 'naara') {
                if (greetingTitle) greetingTitle.textContent = "¡Bienvenida, Naara! 👑";
                if (greetingMsg) greetingMsg.textContent = "¡Sesión iniciada como narita la proyectadita! Cuidado con los main rico y todo esta bien, eso espero muehehehe. ☂️✨";
            }

            if (adminSelectProfile) adminSelectProfile.classList.add('hidden');
            if (adminPanel) adminPanel.classList.remove('hidden');
        });
    });

    // Cerrar Sesión
    if (btnLogoutAdmin) {
        btnLogoutAdmin.addEventListener('click', () => {
            if (adminPanel) adminPanel.classList.add('hidden');
            if (adminSelectProfile) adminSelectProfile.classList.add('hidden');
            if (adminAuth) adminAuth.classList.remove('hidden');
        });
    }
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
        console.error('Error al copiar: ', err);
    });
}