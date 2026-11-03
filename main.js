document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.piece').forEach(p => {
            p.style.display = (f === 'all' || p.dataset.cat === f) ? '' : 'none';
        });
    });
});

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
    imageViewerImage.src = image.currentSrc || image.src;
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
        const title = button.closest('.video-card')?.querySelector('.video-meta h4')?.textContent.trim();
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
