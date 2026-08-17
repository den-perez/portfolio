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

function openOverlayWF() {
    const overlay = document.getElementById('pageOverlayWF');
    const iframe = document.getElementById('overlayFrameWF');

    // Set the path to your second HTML file here
    iframe.src = "https://www.wellsfargo.com/cib";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlayWF() {
    const overlay = document.getElementById('pageOverlayWF');
    const iframe = document.getElementById('overlayFrameWF');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}

function openOverlayCLB() {
    const overlay = document.getElementById('pageOverlayCLB');
    const iframe = document.getElementById('overlayFrameCLB');

    // Set the path to your second HTML file here
    iframe.src = "https://www.corelab.com/";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlayCLB() {
    const overlay = document.getElementById('pageOverlayCLB');
    const iframe = document.getElementById('overlayFrameCLB');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}

function openOverlayRiot() {
    const overlay = document.getElementById('pageOverlayRiot');
    const iframe = document.getElementById('overlayFrameRiot');

    // Set the path to your second HTML file here
    iframe.src = "https://www.riotcolor.com/";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlayRiot() {
    const overlay = document.getElementById('pageOverlayRiot');
    const iframe = document.getElementById('overlayFrameRiot');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}

function openOverlayFedEx() {
    const overlay = document.getElementById('pageOverlayFedEx');
    const iframe = document.getElementById('overlayFrameFedEx');

    // Set the path to your second HTML file here
    iframe.src = "https://www.office.fedex.com/";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlayFedEx() {
    const overlay = document.getElementById('pageOverlayFedEx');
    const iframe = document.getElementById('overlayFrameFedEx');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}

function openOverlayCVS() {
    const overlay = document.getElementById('pageOverlayCVS');
    const iframe = document.getElementById('overlayFrameCVS');

    // Set the path to your second HTML file here
    iframe.src = "https://www.cvs.com/";

    // Display the overlay
    overlay.style.display = "block";
}

function closeOverlayCVS() {
    const overlay = document.getElementById('pageOverlayCVS');
    const iframe = document.getElementById('overlayFrameCVS');

    // Hide the overlay
    overlay.style.display = "none";

    // Clear the iframe source to stop background processes or audio
    iframe.src = "about:blank";
}
