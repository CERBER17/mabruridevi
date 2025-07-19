import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

window.scanner = (() => {
    const config = {
        fps: 10,
        aspectRatio: 1,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
    };

    /**
     * @type {Html5Qrcode|null}
     */
    let html5QrCode = null;

    return {
        /**
         * @param {function} res 
         * @param {function|null} [rej=null] 
         * @returns {Promise<void>}
         */
        start: (res, rej = null) => html5QrCode.start({ facingMode: 'environment' }, config, res, rej),
        /**
         * @returns {Promise<void>}
         */
        stop: () => html5QrCode.stop(),
        /**
         * @param {string} elId
         * @returns {void} 
         */
        init: (elId) => {
            html5QrCode = new Html5Qrcode(elId);
        },
    };
})();