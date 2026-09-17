(() => {
    const portfolioImages = [
        { src: 'img/gallery/gg_1.jpg', alt: 'FARALAB — выполненная работа 1' },
        { src: 'img/gallery/gg_3.jpg', alt: 'FARALAB — выполненная работа 2' },
        { src: 'img/gallery/gg_5.jpg', alt: 'FARALAB — выполненная работа 3' }
    ];

    const renderPortfolioGallery = () => {
        const gallery = document.querySelector('#portfolio-gallery');
        if (!gallery) {
            return;
        }

        portfolioImages.forEach(({ src, alt }) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            const image = document.createElement('img');
            image.src = src;
            image.alt = alt;
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

    document.addEventListener('DOMContentLoaded', () => {
        renderPortfolioGallery();
        initializeSwiper();
        initializeVideoFade();
    });
})();
