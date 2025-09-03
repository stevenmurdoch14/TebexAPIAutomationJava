// e2e/utils/apiClient.js
const { request } = require('@playwright/test');
const { tebexApiToken } = require('../../config/appsettings.json');

async function getRequest(endpointTemplate) {
    const endpoint = endpointTemplate.replace('<your-token>', tebexApiToken);
    const context = await request.newContext({
        baseURL: 'https://headless.tebex.io/api',
        extraHTTPHeaders: { Accept: 'application/json' },
    });
    return context.get(endpoint);
}

module.exports = { getRequest };
