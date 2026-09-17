(() => {
    const portfolioImages = [
        'gg_1.jpg',
        'gg_3.jpg',
        'gg_5.jpg'
    ];

    const createPortfolioItems = (fileNames) => fileNames.map((fileName, index) => ({
        src: `img/gallery/${fileName}`,
        alt: `FARALAB portfolio item ${index + 1}`
    }));

    const getPortfolioImages = async () => {
        const fallbackImages = createPortfolioItems(portfolioImages);

        try {
            const response = await fetch('img/gallery/');
            if (!response.ok) {
                return fallbackImages;
            }

            const directoryMarkup = await response.text();
            const directoryDocument = new DOMParser().parseFromString(directoryMarkup, 'text/html');
            const discoveredFiles = [...directoryDocument.querySelectorAll('a[href]')]
                .map((link) => link.getAttribute('href').split('/').pop())
                .filter((fileName) => /^gg_.+\.jpg$/i.test(fileName))
                .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));

            return discoveredFiles.length ? createPortfolioItems(discoveredFiles) : fallbackImages;
        } catch (error) {
            return fallbackImages;
        }
    };

    const renderPortfolioGallery = (images) => {
        const gallery = document.querySelector('#portfolio-gallery');
        if (!gallery) {
            return;
        }

        gallery.replaceChildren();

        images.forEach(({ src, alt }) => {
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

    document.addEventListener('DOMContentLoaded', async () => {
        const images = await getPortfolioImages();
        renderPortfolioGallery(images);
        initializeSwiper();
        initializeVideoFade();
    });
})();
