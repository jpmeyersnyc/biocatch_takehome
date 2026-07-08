/* dd: 2026-06-24__12-02-06 */
!(function (e) {
    'use strict';

    const getMetatagContent = (name) => {
        const elem = document.querySelector(`meta[name="${name}"]`);
        return elem ? elem.getAttribute('content') : '';
    };

    const isHybrid = getMetatagContent('isHybrid');

    if (isHybrid === 'false' || isHybrid === '') {
        self.cdApi = {
            configurationKeys: {
                wupServerURL: 'wupServerURL',
                logServerURL: 'logServerURL',
                enableCustomElementsProcessing: 'enableCustomElementsProcessing',
                collectionSettings: 'collectionSettings',
                // trustedOrigins: 'trustedOrigins',
            },

            getConfigurations: function (callback) {
                const configurations = {};
                configurations[cdApi.configurationKeys.wupServerURL] =
                    'https://wup-4ff4f23f.eu.v2.we-stats.com/client/v3.1/web/wup?v=1&cid=dummy';
                configurations[cdApi.configurationKeys.logServerURL] =
                    'https://logs-4ff4f23f.eu.v2.we-stats.com/api/v1/sendLogs';
                configurations[cdApi.configurationKeys.enableCustomElementsProcessing] = true;
                configurations[cdApi.configurationKeys.collectionSettings] = {
                    elementSettings: { customElementAttribute: 'data-bb' },
                };
                // configurations[cdApi.configurationKeys.trustedOrigins] = ['biocatch.com']; // new configuration added at 2.57.1, [WF project]
                callback(configurations);
            },

            changeContext: function (contextName) {
                window.postMessage({ type: 'ContextChange', context: contextName }, window.location.href);
            },

            setCustomerSessionId: function (csid) {
                window.postMessage({ type: 'cdSetCsid', csid: csid }, window.location.href);
            },

            setCustomerBrand: function (brand) {
                window.postMessage({ type: 'cdSetCustomerBrand', brand: brand }, window.location.href);
            },
        };
    } else {
        const bcGetMetatagContent = (name) => {
            const elem = document.querySelector(`meta[name="${name}"]`);
            return elem ? elem.getAttribute('content') : '';
        };

        const bcGetCookiesContent = (key) => {
            let result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie);
            return result ? decodeURIComponent(result[1]) : '';
        };

        const bcClientConfiguration = {};
        
        window.bcClientConfiguration = bcClientConfiguration;
        window.bcGetMetatagContent = bcGetMetatagContent;
        window.bcGetCookiesContent = bcGetCookiesContent;
    }
})();