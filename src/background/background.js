// background.js

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener((msg, _port) => {
        if (msg.action === 'extractData') {
            // Forward the request to the content script
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    } else {
                        // Send the response back to the popup
                        port.postMessage(response);
                    }
                });
            });
        }
    });
});


// background.js v2

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'extractData') {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, (response) => {
//                 if (response.success) {
//                     chrome.tabs.sendMessage(tabs[0].id, { action: 'displayData', data: response.data });
//                 }
//             });
//         });
//     }
// });