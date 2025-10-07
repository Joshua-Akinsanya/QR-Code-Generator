const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url');

const downloadLink = document.querySelector('#download-link');

const qrCodeObj = new QRCode(document.querySelector('#qrcode'), {
    text: url,
    width: 200,
    height: 200,
});

async function downloadImage() {
    const qrCodeCanvas = document.querySelector('#qrcode canvas');
    const qrCodeImage = document.querySelector('#qrcode img');

    let blob;
    if(qrCodeCanvas) {
        blob = await new Promise(resolve => qrCodeCanvas.toBlob(resolve));
    } else if(qrCodeImage) {
        const res = await fetch(qrCodeImage.src);
        blob = await res.blob();
    } else {
        alert('QR Code not generated');
        return;
    }
    
    downloadLink.href = URL.createObjectURL(blob);
}

async function copyQRCodeToClipboard() {
    const qrCodeCanvas = document.querySelector('#qrcode canvas');
    const qrCodeImage = document.querySelector('#qrcode img');

    let blob;
    if(qrCodeCanvas) {
        blob = await new Promise(resolve => qrCodeCanvas.toBlob(resolve));
    } else if(qrCodeImage) {
        const res = await fetch(qrCodeImage.src);
        blob = await res.blob();
    } else {
        alert('QR Code not generated');
        return;
    }

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
shareButton.addEventListener('click', () => {
    copyQRCodeToClipboard();
});

downloadImage();