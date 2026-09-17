(() => {
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
        initializeSwiper();
        initializeVideoFade();
    });
})();
