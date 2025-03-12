document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('no-scroll');
      
        const isOpen = mobileMenu.classList.contains('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', toggleMobileMenu);
    }

    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', false);
            }
        }
    });

    const modalBackdrop = document.getElementById('modal-backdrop');
    const heroButton = document.querySelector('.hero-button');
    const modalCloseBtn = document.getElementById('modal-close');
    
    function openModal() {
        modalBackdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        
        document.addEventListener('keydown', closeModalOnEscape);
    }
    
    function closeModal() {
        modalBackdrop.classList.remove('is-open');
        document.body.style.overflow = '';
        
        document.removeEventListener('keydown', closeModalOnEscape);
    }

    function closeModalOnEscape(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
    
    function closeModalOnBackdropClick(event) {
        if (event.target === modalBackdrop) {
            closeModal();
        }
  }
  
    if (heroButton) {
        heroButton.addEventListener('click', openModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModalOnBackdropClick);
    }
    
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    if (modalBackdrop) {
        const modal = modalBackdrop.querySelector('.modal');
        if (modal) {
            trapFocus(modal);
        }
    }
    
    const modalForm = document.querySelector('.modal-form');
    const footerForm = document.querySelector('.footer-form');
    
    if (modalForm) {
        modalForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            console.log('Modal form submitted');
            
            modalForm.reset();
            
            closeModal();
        });
    }
    
    if (footerForm) {
        footerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            console.log('Footer subscription form submitted');
            
            footerForm.reset();
        });
    }
});