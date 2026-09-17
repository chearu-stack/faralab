(() => {
    const portfolioImages = [
        'beam-stg.jpg',
        'gg_1.jpg',
        'gg_3.jpg',
        'gg_5.jpg',
        'toyota-faralab-1.png',
        'toyota-faralab-2.png',
        'workshop-lab.jpg'
    ];

    const createPortfolioItems = (fileNames) => fileNames.map((fileName, index) => ({
        src: `img/gallery/${fileName}`,
        alt: `FARALAB portfolio item ${index + 1}`
    }));

    const interleavePortfolioImages = (fileNames) => {
        const ggImages = fileNames.filter((fileName) => fileName.toLowerCase().startsWith('gg_'));
        const realImages = fileNames.filter((fileName) => !fileName.toLowerCase().startsWith('gg_'));
        const interleavedImages = [];
        const totalImages = Math.max(ggImages.length, realImages.length);

        for (let index = 0; index < totalImages; index += 1) {
            if (ggImages[index]) {
                interleavedImages.push(ggImages[index]);
            }
            if (realImages[index]) {
                interleavedImages.push(realImages[index]);
            }
        }

        return interleavedImages;
    };

    const getPortfolioImages = async () => {
        const fallbackImages = createPortfolioItems(interleavePortfolioImages(portfolioImages));

        try {
            const response = await fetch('img/gallery/');
            if (!response.ok) {
                return fallbackImages;
            }

            const directoryMarkup = await response.text();
            const directoryDocument = new DOMParser().parseFromString(directoryMarkup, 'text/html');
            const discoveredFiles = [...directoryDocument.querySelectorAll('a[href]')]
                .map((link) => {
                    const href = link.getAttribute('href');
                    return href ? decodeURIComponent(href.split(/[?#]/)[0].split('/').pop()) : '';
                })
                .filter((fileName) => /\.(?:jpg|jpeg|png|webp|avif)$/i.test(fileName))
                .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));

            return discoveredFiles.length
                ? createPortfolioItems(interleavePortfolioImages(discoveredFiles))
                : fallbackImages;
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

    const initializeAddressCopy = () => {
        const address = document.querySelector('#lab-address');
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
        address.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                copyAddress();
            }
        });
    };

    document.addEventListener('DOMContentLoaded', async () => {
        const images = await getPortfolioImages();
        renderPortfolioGallery(images);
        initializeSwiper();
        initializeVideoFade();
        initializeAddressCopy();
    });
})();
