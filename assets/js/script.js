const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url');

const qrCode = new QRCode(document.querySelector('#qrcode'), {
    text: url,
    width: 200,
    height: 200,
});
