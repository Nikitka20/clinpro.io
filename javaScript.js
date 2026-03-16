
// ============================================
// 1. БУРГЕР-МЕНЮ
// ============================================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('[data-close-menu]').forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ============================================
// 2. ТЕНЬ ШАПКИ ПРИ СКРОЛЛЕ
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// 3. МОДАЛЬНОЕ ОКНО
// ============================================
const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModalBtn');
const openModalBtnMobile = document.getElementById('openModalBtnMobile');
const closeModalBtn = document.getElementById('closeModalBtn');

function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Закрываем мобильное меню, если открыто
    burgerBtn.classList.remove('active');
    mobileMenu.classList.remove('open');
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

openModalBtn.addEventListener('click', openModal);
openModalBtnMobile.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Закрытие по клику на оверлей
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// 4. ОБРАБОТКА ФОРМ
// ============================================
function handleLeadForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.lead-form__btn');
    const originalText = btn.textContent;

    btn.textContent = '✅ Заявка отправлена!';
    btn.style.background = '#27ae60';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
    }, 2500);
}

function handleModalForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.modal__btn');
    const originalText = btn.textContent;

    btn.textContent = '✅ Заявка отправлена!';
    btn.style.background = '#27ae60';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
        closeModal();
    }, 2000);
}

// ============================================
// 5. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Reveal)
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// 6. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
