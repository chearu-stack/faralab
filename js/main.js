(() => {
    const portfolioImages = [
        'toyota-faralab-1.png',
        'gg_1.jpg',
        'beam-stg.jpg',
        'gg_3.jpg',
        'gg_5.jpg',
        'toyota-faralab-2.png',
        'workshop-lab.jpg'
    ];

    const renderPortfolioGallery = () => {
        const gallery = document.querySelector('#portfolio-gallery');
        if (!gallery) {
            return;
        }

        portfolioImages.forEach((fileName, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            const image = document.createElement('img');
            image.src = `img/gallery/${fileName}`;
            image.alt = `FARALAB portfolio item ${index + 1}`;
            image.loading = 'eager';

            slide.appendChild(image);
            gallery.appendChild(slide);
        });
    };

    const initializeSwiper = () => {
        if (typeof Swiper === 'undefined') {
            return;
        }

        new Swiper('.faralab-swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            }
        });
    };

    const initializeVideoFade = () => {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) {
            return;
        }

        const revealHeroVideo = () => {
            heroVideo.style.opacity = '1';
        };

        heroVideo.addEventListener('playing', revealHeroVideo, { once: true });
        heroVideo.addEventListener('canplaythrough', revealHeroVideo, { once: true });
    };

    const initializeAddressCopy = () => {
        const address = document.querySelector('.contacts-address-copy');
        if (!address) {
            return;
        }

        const addressText = 'Нижегородская область, г. Богородск, ул. Добролюбова д. 2г';
        const originalText = address.textContent;

        const copyAddress = async () => {
            try {
                await navigator.clipboard.writeText(addressText);
                address.textContent = 'Скопировано!';
                address.classList.add('is-copied');
            } catch (error) {
                address.textContent = 'Не удалось скопировать';
            }

            window.setTimeout(() => {
                address.textContent = originalText;
                address.classList.remove('is-copied');
            }, 1600);
        };

        address.addEventListener('click', copyAddress);
    };

    const initializeMobileMenu = () => {
        const menuToggle = document.querySelector('.hamburger-toggle');
        const navigation = document.querySelector('.mobile-nav-overlay');
        if (!menuToggle || !navigation) {
            return;
        }

        const closeMenu = () => {
            navigation.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = navigation.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        });

        document.querySelectorAll('.desktop-nav a, .mobile-nav-overlay a').forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetSelector = link.getAttribute('href');
                const normalizedSelector = targetSelector && targetSelector.startsWith('#')
                    ? targetSelector
                    : `#${targetSelector}`;
                let targetElement = null;

                try {
                    targetElement = targetSelector && targetSelector !== '/'
                        ? document.querySelector(normalizedSelector)
                        : null;
                } catch (error) {
                    targetElement = null;
                }

                if (!targetElement) {
                    event.preventDefault();
                    closeMenu();
                    return;
                }

                event.preventDefault();
                closeMenu();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        renderPortfolioGallery();
        initializeSwiper();
        initializeVideoFade();
        initializeAddressCopy();
        initializeMobileMenu();
    });
})();
