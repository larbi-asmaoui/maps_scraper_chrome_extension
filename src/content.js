// content.js

function injectButton() {
    const button = document.createElement('button');
    button.textContent = 'Start Scraping';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = '#4285f4';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', startScraping);
    document.body.appendChild(button);
}

function injectLoader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.position = 'fixed';
    loader.style.top = '50%';
    loader.style.left = '50%';
    loader.style.transform = 'translate(-50%, -50%)';
    loader.style.zIndex = '9999';
    loader.style.width = '100px';
    loader.style.height = '100px';
    loader.style.borderRadius = '50%';
    loader.style.border = '10px solid #f3f3f3';
    loader.style.borderTop = '10px solid #4285f4';
    loader.style.animation = 'spin 2s linear infinite';
    loader.style.display = 'none';
    document.body.appendChild(loader);
}


function startScraping() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    chrome.runtime.sendMessage({ action: 'extractData' });
}

function extractData() {
    const extractedData = [];

    // Extract data from the Google Maps page
    const placeElements = document.querySelectorAll('.section-result-content');
    placeElements.forEach((placeElement) => {
        const name = placeElement.querySelector('.section-result-title')?.textContent || '';
        const address = placeElement.querySelector('.section-result-location')?.textContent || '';

        if (name && address) {
            extractedData.push({ name, address });
        }
    });

    return extractedData;
}

injectButton();
injectLoader();