import QRCode from 'qrcode';

self.onmessage = ({ data }) => QRCode.toCanvas(data.offscreen, data.text, data.options, (err) => {
    data.offscreen.convertToBlob(data.options).then((b) => self.postMessage({ err, b }));
});
