const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url'); // perhaps i should change the variable name
const qrCodeObj = new QRCode(document.querySelector('#qrcode'), {
    text: url,
    width: 200,
    height: 200,
});

const downloadLink = document.querySelector('#download-link');
const qrCodeCanvas = document.querySelector('#qrcode canvas');
const qrCodeImage = document.querySelector('#qrcode img');

let blob = null;

// Create Download Link if QR Code generated
( async () => {
    if(qrCodeCanvas) {
        blob = await new Promise(resolve => qrCodeCanvas.toBlob(resolve));
    } else if (qrCodeImage) {
        const image = await fetch(qrCodeImage.src);
        blob = image.blob();
    } else {
        alert('QR Code not generated');
    }

    if (blob) {
        downloadLink.href = URL.createObjectURL(blob);
    }
})();

async function copyQRCodeToClipboard() {
    if(!blob) return;
    
    try {
        await navigator.clipboard.write([
            new ClipboardItem({[blob.type]: blob})
        ]);
    } catch (err) {
        console.log('Failed to copy image: ', err);
        alert('Failed to copy image');
    }
}

const shareButton = document.querySelector('#share-button');
shareButton.addEventListener('click', function () {
    copyQRCodeToClipboard();
});
