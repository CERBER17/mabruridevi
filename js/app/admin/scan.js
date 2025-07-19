
export const scan = (() => {

    const x = () => {

        window.scanner.start((decodedText, decodedResult) => {
            alert(decodedResult, ',,,', decodedText);
        });
    };

    return {
        init: async () => {
            if (typeof window.scanner === 'undefined') {
                await new Promise((res, rej) => {
                    const sc = document.createElement('script');
                    sc.onload = res;
                    sc.onerror = rej;

                    sc.src = './dist/scanner.js';
                    document.head.appendChild(sc);
                });
            }

            window.scanner.init('render');

            document.getElementById('button-scanner').addEventListener('click', x);

            document.getElementById('button-scanner-stop').addEventListener('click', () => {
                window.scanner.stop();
            });
        },
        // start,
        // pause,
    };
})();