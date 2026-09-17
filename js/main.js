(() => {
    const portfolioImages = [
        { src: 'img/gallery/toyota-faralab-1.png', alt: 'Toyota FARALAB — работа 1' },
        { src: 'img/gallery/toyota-faralab-2.png', alt: 'Toyota FARALAB — работа 2' },
        { src: 'img/gallery/workshop-lab.jpg', alt: 'Мастерская FARALAB' },
        { src: 'img/gallery/beam-stg.jpg', alt: 'Светотеневая граница' }
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
            image.loading = 'lazy';

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
