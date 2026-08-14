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

//View Reseume in an overlay
function openOverlay() {
    const overlay = document.getElementById('pageOverlay');
    const iframe = document.getElementById('overlayFrame');

    // Set the path to your second HTML file here
    iframe.src = "Dennis_Perez_Resume.pdf";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlay() {
    const overlay = document.getElementById('pageOverlay');
    const iframe = document.getElementById('overlayFrame');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}

function openOverlay2() {
    const overlay = document.getElementById('pageOverlay2');
    const iframe = document.getElementById('overlayFrame2');

    // Set the path to your second HTML file here
    iframe.src = "Dennis_Perez_Resume.pdf";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlay2() {
    const overlay = document.getElementById('pageOverlay2');
    const iframe = document.getElementById('overlayFrame2');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}
