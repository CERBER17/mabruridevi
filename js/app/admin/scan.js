
export const scan = (() => {

    const x = async () => {
        const scanner = await new Promise((res, rej) => {
            const sc = document.createElement('script');
            sc.onload = () => res(window.scanner);
            sc.onerror = rej;

            sc.src = './dist/scanner.js';
            document.head.appendChild(sc);
        });

        scanner.init('scanner');
        scanner.start((decodedText, decodedResult) => {
            alert(decodedResult, ',,,', decodedText);
        });

        document.getElementById('button-scanner-stop').addEventListener('click', () => {
            scanner.stop();
        });
    };

    return {
        init: () => document.getElementById('button-scanner').addEventListener('click', x),
        // start,
        // pause,
    };
})();