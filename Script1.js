// ========== 1. КРУТЯЩИЙСЯ ЛОГОТИП ==========
const logoElement = document.getElementById('rotatingLogo');
if (logoElement) {
    logoElement.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.remove('rotate-active');
        void this.offsetWidth;
        this.classList.add('rotate-active');
        setTimeout(() => {
            this.classList.remove('rotate-active');
        }, 600);
    });
}

// ========== 2. МОДАЛЬНОЕ ОКНО (работа всех кнопок) ==========
const modal = document.getElementById('callbackModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Функции модалки
function openModal() {
    if (modal) modal.style.display = 'flex';
}
function closeModal() {
    if (modal) modal.style.display = 'none';
}

// Все элементы, которые должны открывать модалку
const modalTriggers = document.querySelectorAll('.modal-trigger, #openModalBtn');
modalTriggers.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
});

// Кнопка "Связаться" в навбаре
const navConnectBtn = document.querySelector('#openModalBtn');
if (navConnectBtn) {
    navConnectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

// Закрытие по крестику
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Закрытие при клике вне модального окна
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ========== 3. ПЛАВНАЯ ПРОКРУТКА ==========
const smoothScrollLinks = document.querySelectorAll('.nav-smooth, .footer-link[href^="#"]');
smoothScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                const navContainer = document.getElementById('navLinks');
                if (window.innerWidth <= 900 && navContainer && navContainer.style.display === 'flex') {
                    navContainer.style.display = 'none';
                }
            }
        }
    });
});

// ========== 4. МОБИЛЬНОЕ МЕНЮ ==========
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.getElementById('navLinks');
if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', () => {
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
        } else {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '80px';
            navLinksContainer.style.left = '20px';
            navLinksContainer.style.right = '20px';
            navLinksContainer.style.backgroundColor = '#0a0a12';
            navLinksContainer.style.padding = '24px';
            navLinksContainer.style.borderRadius = '28px';
            navLinksContainer.style.border = '1px solid #2a2a44';
            navLinksContainer.style.gap = '20px';
            navLinksContainer.style.zIndex = '99';
            navLinksContainer.style.backdropFilter = 'blur(16px)';
        }
    });
}

// Скрыть навлинки при ресайзе
window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinksContainer) {
        navLinksContainer.style.display = '';
        navLinksContainer.style.position = '';
        navLinksContainer.style.top = '';
        navLinksContainer.style.left = '';
        navLinksContainer.style.right = '';
        navLinksContainer.style.backgroundColor = '';
        navLinksContainer.style.padding = '';
        navLinksContainer.style.borderRadius = '';
        navLinksContainer.style.border = '';
        navLinksContainer.style.gap = '';
        navLinksContainer.style.zIndex = '';
        navLinksContainer.style.backdropFilter = '';
    }
});

// ========== 5. ОТПРАВКА ФОРМЫ В GOOGLE SHEETS ==========
const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/AKfycbyRrY_MjBNy4qgeME1aORqyS4MVZkePWH7EwRcnzBM9jLOgiTcO4bW_QmLZzM3GYC0/exec';

const formForSheet = document.getElementById('modalForm');
if (formForSheet) {
    formForSheet.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        const formData = {
            name: document.getElementById('modalName')?.value || '',
            contact: document.getElementById('modalContact')?.value || '',
            task: document.getElementById('modalTask')?.value || '',
            timestamp: new Date().toISOString(),
            page: window.location.href
        };

        try {
            await fetch(GOOGLE_SHEET_API, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            alert('✅ Спасибо! Мы свяжемся с вами в ближайшее время');
            formForSheet.reset();
            closeModal();

        } catch (error) {
            console.error('Ошибка:', error);
            alert('❌ Ошибка отправки. Попробуйте позже или напишите в Telegram: @f5_support');

        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}