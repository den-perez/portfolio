const imageViewer = document.querySelector('.image-viewer');
const imageViewerImage = imageViewer?.querySelector('.image-viewer-image');
const imageViewerCaption = imageViewer?.querySelector('.image-viewer-caption');
const imageViewerCount = imageViewer?.querySelector('.image-viewer-count');
const imageViewerPrevious = imageViewer?.querySelector('.image-viewer-prev');
const imageViewerNext = imageViewer?.querySelector('.image-viewer-next');
let currentGallery = [];
let currentGalleryIndex = 0;

function showGalleryImage(index, direction = 0) {
    const button = currentGallery[index];
    const image = button?.querySelector('img');
    if (!image || !imageViewerImage || !imageViewerCaption || !imageViewerCount) return;

    currentGalleryIndex = index;
    imageViewerImage.src = image.dataset.full || image.currentSrc || image.src;
    imageViewerImage.alt = image.alt;
    imageViewerCaption.textContent = image.alt;
    imageViewerCount.textContent = `${index + 1} / ${currentGallery.length}`;

    imageViewerImage.classList.remove(
        'image-viewer-image--enter-from-left',
        'image-viewer-image--enter-from-right'
    );

    if (direction !== 0) {
        void imageViewerImage.offsetWidth;
        imageViewerImage.classList.add(
            direction > 0
                ? 'image-viewer-image--enter-from-right'
                : 'image-viewer-image--enter-from-left'
        );
    }
}

document.querySelectorAll('.gallery-item').forEach(button => {
    const image = button.querySelector('img');
    if (!image) return;

    button.dataset.caption = image.alt;
    button.setAttribute('aria-label', `View full-size image: ${image.alt}`);
    button.addEventListener('click', () => {
        if (!imageViewer) return;

        currentGallery = [...button.closest('.piece').querySelectorAll('.gallery-item')];
        showGalleryImage(currentGallery.indexOf(button));
        imageViewer.showModal();
    });
});

imageViewerPrevious?.addEventListener('click', () => {
    if (!currentGallery.length) return;
    showGalleryImage((currentGalleryIndex - 1 + currentGallery.length) % currentGallery.length, -1);
});

imageViewerNext?.addEventListener('click', () => {
    if (!currentGallery.length) return;
    showGalleryImage((currentGalleryIndex + 1) % currentGallery.length, 1);
});

imageViewer?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        imageViewerPrevious?.click();
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        imageViewerNext?.click();
    }
});

let swipeStart = null;

imageViewerImage?.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return;

    swipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
});

imageViewerImage?.addEventListener('pointerup', event => {
    if (!swipeStart || event.pointerId !== swipeStart.pointerId) return;

    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    swipeStart = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

    if (deltaX < 0) {
        imageViewerNext?.click();
    } else {
        imageViewerPrevious?.click();
    }
});

imageViewerImage?.addEventListener('pointercancel', () => {
    swipeStart = null;
});

imageViewer?.addEventListener('click', event => {
    if (event.target === imageViewer) imageViewer.close();
});

const videoViewer = document.querySelector('.video-viewer');
const videoPlayer = videoViewer?.querySelector('.video-player iframe');
const videoViewerTitle = videoViewer?.querySelector('.video-viewer-title');

document.querySelectorAll('.video-play-button').forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.dataset.videoId;
        const title = button.closest('.video-card')?.querySelector('.video-meta h3')?.textContent.trim();
        if (!videoViewer || !videoPlayer || !videoViewerTitle || !videoId || !title) return;

        videoViewerTitle.textContent = title;
        videoViewer.showModal();
        videoPlayer.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
    });
});

videoViewer?.addEventListener('close', () => {
    if (videoPlayer) videoPlayer.src = 'about:blank';
});

videoViewer?.addEventListener('click', event => {
    if (event.target === videoViewer) videoViewer.close();
});

const resumeViewer = document.querySelector('.resume-viewer');

document.querySelectorAll('[data-open-resume]').forEach(button => {
    button.addEventListener('click', () => resumeViewer?.showModal());
});

resumeViewer?.addEventListener('click', event => {
    if (event.target === resumeViewer) resumeViewer.close();
});

// Work rails: arrow buttons scroll the row of images beside them.
document.querySelectorAll('.piece').forEach(piece => {
    const rail = piece.querySelector('.rail');
    const buttons = [...piece.querySelectorAll('.rail-btn')];
    if (!rail || !buttons.length) return;

    const title = piece.querySelector('h3')?.textContent.trim();
    if (title) rail.setAttribute('aria-label', `Images: ${title}`);

    const update = () => {
        const max = rail.scrollWidth - rail.clientWidth - 2;
        buttons.forEach(button => {
            button.disabled = Number(button.dataset.rail) < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max;
        });
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            rail.scrollBy({ left: Number(button.dataset.rail) * rail.clientWidth * 0.8, behavior: 'smooth' });
        });
    });

    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
});

// Hero headline: the magenta and yellow plates drift slightly out of register with the pointer.
const overprint = document.querySelector('.overprint');
const hero = document.querySelector('.hero');

if (overprint && hero && matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    hero.addEventListener('pointermove', event => {
        const box = hero.getBoundingClientRect();
        overprint.style.setProperty('--px', ((event.clientX - box.left) / box.width * 2 - 1).toFixed(3));
        overprint.style.setProperty('--py', ((event.clientY - box.top) / box.height * 2 - 1).toFixed(3));
    });

    hero.addEventListener('pointerleave', () => {
        overprint.style.setProperty('--px', 0);
        overprint.style.setProperty('--py', 0);
    });
}
