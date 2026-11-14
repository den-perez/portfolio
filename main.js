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

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const timecode = frames => {
    const f = Math.max(0, Math.floor(frames));
    const pad = n => String(n).padStart(2, '0');
    return `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
};

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

// Experience: clips on the timeline open the matching role.
const experience = document.querySelector('#experience');
const timeline = experience?.querySelector('.tl');
const clips = [...(timeline?.querySelectorAll('.clip') ?? [])];

function selectClip(clip) {
    clips.forEach(other => {
        const active = other === clip;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-expanded', String(active));
        document.getElementById(other.getAttribute('aria-controls'))?.classList.toggle('is-active', active);
    });
    timeline.classList.add('has-selection');
}

if (experience && timeline && clips.length) {
    experience.classList.add('tl-ready');
    clips.forEach(clip => {
        clip.title = clip.getAttribute('aria-label');
        clip.addEventListener('click', () => selectClip(clip));
    });
    selectClip(clips.find(clip => clip.getAttribute('aria-controls') === 'job-wells-fargo') ?? clips[0]);
    // start scrolled to the present on narrow screens
    timeline.scrollLeft = timeline.scrollWidth;
}

// Transport bar: scrolling scrubs the playhead across the page's sections.
const transportTrack = document.querySelector('.transport-track');
const transportClock = document.querySelector('[data-timecode]');
const segments = [...document.querySelectorAll('.seg')];
const segmentTargets = segments.map(seg => document.querySelector(seg.getAttribute('href')));
const RUNTIME_FRAMES = 24 * 60 * 24; // the page "runs" 24 minutes at 24 fps: one minute per year of work

function scrub() {
    if (!transportTrack || !segments.length) return;

    const tops = segmentTargets.map(target => target.getBoundingClientRect().top + scrollY);
    const end = document.documentElement.scrollHeight;
    const maxScroll = end - innerHeight;
    const probe = scrollY + innerHeight * 0.35;
    let index = 0;
    tops.forEach((top, i) => { if (probe >= top) index = i; });

    const next = tops[index + 1] ?? end;
    let within = Math.min(1, Math.max(0, (probe - tops[index]) / (next - tops[index])));
    if (scrollY <= 0) within = 0;
    if (maxScroll > 0 && scrollY >= maxScroll - 2) { index = segments.length - 1; within = 1; }

    const progress = (index + within) / segments.length;
    const active = segments[index];
    transportTrack.style.setProperty('--x', `${(active.offsetLeft + within * active.offsetWidth).toFixed(1)}px`);
    if (transportClock) transportClock.textContent = timecode(progress * RUNTIME_FRAMES);
    segments.forEach((seg, i) => {
        seg.classList.toggle('is-active', i === index);
        if (i === index) seg.setAttribute('aria-current', 'true'); else seg.removeAttribute('aria-current');
    });
}

let scrubQueued = false;
const queueScrub = () => {
    if (scrubQueued) return;
    scrubQueued = true;
    requestAnimationFrame(() => { scrubQueued = false; scrub(); });
};

addEventListener('scroll', queueScrub, { passive: true });
addEventListener('resize', queueScrub);
addEventListener('load', scrub);
scrub();

// Hero monitor: a running clock and an audio waveform.
const heroClock = document.querySelector('[data-clock]');
const wave = document.querySelector('.wave');

if (wave && !reduceMotion) {
    const bars = Array.from({ length: 44 }, (_, i) => {
        const height = 18 + Math.round(Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)) * 82);
        return `<i style="--h:${height}%;--t:${(0.7 + (i * 37 % 9) / 10).toFixed(1)}s;--d:-${(i * 53 % 17) / 10}s"></i>`;
    });
    wave.innerHTML = bars.join('');
}

if (heroClock && !reduceMotion) {
    const started = performance.now();
    const tick = now => {
        heroClock.textContent = timecode((now - started) / 1000 * 24);
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// Scroll-in animation: headings wipe in, frames and cards arrive in sequence, the career timeline builds.
if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('anim');

    const groups = document.querySelectorAll('.rail, .video-grid, .skills-col, .contact-list');
    groups.forEach(group => [...group.children].forEach((child, i) => child.style.setProperty('--i', i)));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    document.querySelectorAll('.section-head, .footer-top, .rail, .video-grid, .skills-col, .contact-list, .tl')
        .forEach(element => observer.observe(element));
}
