let currentLanguage = 'fa';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'fa' ? 'en' : 'fa';
    applyLanguage();
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('imageSelector');
    const image = document.getElementById('displayedImage');
    let isDragging = false;

    function startDragging() {
        isDragging = true;
    }

    function stopDragging() {
        isDragging = false;
    }

    function handleDrag(clientX) {
        const rect = slider.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const percentage = offsetX / rect.width;
        const value = Math.min(Math.max(percentage, 0), 1) * (slider.max - slider.min) + parseInt(slider.min);

        slider.value = Math.round(value);
        changeImage();
    }

    slider.addEventListener('mousedown', startDragging);
    image.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging);
    image.addEventListener('touchstart', startDragging);

    document.addEventListener('touchmove', (event) => {
        if (isDragging) {
            handleDrag(event.touches[0].clientX);
        }
    });

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    changeImage();
});

function applyLanguage() {
    const footerFa = document.getElementById('footer-fa');
    const footerEn = document.getElementById('footer-en');
    const elements = document.querySelectorAll('[data-lang-en]');
    const langIcon = document.getElementById('lang-icon');
    const langText = document.getElementById('lang-text');
    const fileLabelTitle = document.getElementById('file-label-title');
    const fileLabelSubtitle = document.getElementById('file-label-subtitle');

    elements.forEach(element => {
        if (currentLanguage === 'fa') {
            footerFa.style.display = 'block';
            footerEn.style.display = 'none';
            element.textContent = element.getAttribute('data-lang-fa');
            document.documentElement.setAttribute('lang', 'fa');
            langText.textContent = '🇮🇷 فارسی';
            fileLabelTitle.style.fontSize = '18px';
            fileLabelSubtitle.style.fontSize = '12px';
        } else {
            footerFa.style.display = 'none';
            footerEn.style.display = 'block';
            element.textContent = element.getAttribute('data-lang-en');
            document.documentElement.setAttribute('lang', 'en');
            langText.textContent = 'English 🇬🇧';
            fileLabelTitle.style.fontSize = '24px';
            fileLabelSubtitle.style.fontSize = '16px';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage();
});

let selectedImageSrc = "";

function handleFileSelect() {
    const fileInput = document.getElementById('fileInput');
    const imageContainer = document.getElementById('imageContainer');
    const imageSelector = document.getElementById('imageSelector');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            selectedImageSrc = e.target.result;

            fileInput.parentElement.style.display = 'none';
            imageContainer.style.display = 'block';
            imageSelector.focus();
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.body.focus();

    document.body.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            document.getElementById('fileInput').click();
        }
    });
});

window.onload = function () {
    document.getElementById('fileInput').focus();
};

function changeImage() {
    const selector = document.getElementById('imageSelector');
    const image = document.getElementById('displayedImage');
    const name3 = document.getElementById('name2');
    const heartsContainer = document.getElementById('heartsContainer');

    image.style.opacity = 0;
    name3.style.opacity = 0;

    setTimeout(function () {
        if (selector.value === "1") {
            image.src = "images/heart1.webp";
            image.alt = "Heart very low quality";
            name3.innerHTML = "240p";
            heartsContainer.style.display = 'none';
        } else if (selector.value === "2") {
            image.src = "images/heart2.jpg";
            image.alt = "Heart low quality";
            name3.innerHTML = "360p";
            heartsContainer.style.display = 'none';
        } else if (selector.value === "3") {
            image.src = "images/heart3.webp";
            image.alt = "Heart medium quality";
            name3.innerHTML = "720p";
            heartsContainer.style.display = 'none';
        } else if (selector.value === "4") {
            image.src = "images/heart4.jpg";
            image.alt = "Heart high quality";
            name3.innerHTML = "1080p";
            heartsContainer.style.display = 'none';
        } else if (selector.value === "5" && selectedImageSrc) {
            image.src = selectedImageSrc;
            image.alt = "4K Custom Image";
            name3.innerHTML = "4K";
            heartsContainer.style.display = 'block';

            createHearts();
        }

        image.style.opacity = 1;
        name3.style.opacity = 1;
    }, 500);
}

function createHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';

        const randomLeft = Math.random() * 100;
        const adjustedLeft = randomLeft < 5 ? randomLeft + 5 : randomLeft;

        heart.style.left = `${adjustedLeft}%`;
        heart.style.animationDuration = `${Math.random() * 3 + 5}s`;
        heartsContainer.appendChild(heart);
    }
}
