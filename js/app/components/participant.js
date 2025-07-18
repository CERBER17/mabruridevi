import { util } from '../../common/util.js';
import { HTTP_GET, request } from '../../connection/request.js';

export const participant = (() => {

    const renderTracker = (c) => {
        return `
        <div class="mb-1 mt-3">
            <p class="text-theme-auto mb-1 mx-0 mt-0 p-0" style="font-size: 0.7rem;" id="ip-${c.uuid}"><i class="fa-solid fa-location-dot me-1"></i>${util.escapeHtml(c.ip)} <span class="mb-1 placeholder col-2 rounded-3"></span></p>
            <p class="text-theme-auto m-0 p-0" style="font-size: 0.7rem;"><i class="fa-solid fa-mobile-screen-button me-1"></i>${util.parseUserAgent(util.escapeHtml(c.user_agent))}</p>
        </div>`;
    };

    const fetchTracker = (c) => {

        /**
         * @param {string} result 
         * @returns {void}
         */
        const setResult = (result) => {
            const commentIp = document.getElementById(`ip-${util.escapeHtml(c.uuid)}`);
            util.safeInnerHTML(commentIp, `<i class="fa-solid fa-location-dot me-1"></i>${util.escapeHtml(c.ip)} <strong>${util.escapeHtml(result)}</strong>`);
        };

        // Free for commercial and non-commercial use.
        return request(HTTP_GET, `https://apip.cc/api-json/${c.ip}`)
            .withCache()
            .withRetry()
            .default()
            .then((res) => res.json())
            .then((res) => {
                let result = 'localhost';

                if (res.status === 'success') {
                    if (res.City.length !== 0 && res.RegionName.length !== 0) {
                        result = res.City + ' - ' + res.RegionName;
                    } else if (res.Capital.length !== 0 && res.CountryName.length !== 0) {
                        result = res.Capital + ' - ' + res.CountryName;
                    }
                }

                setResult(result);
            })
            .catch((err) => setResult(err.message));
    };

})();