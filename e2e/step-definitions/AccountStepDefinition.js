import { Given, Then } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';
import { config } from '../utils/config.js';

let response;

Given('I send a {string} request to {string}', async function (method, pathTemplate) {
    // 1) Pull token + base URL from your JSON config
    const { tebexApiToken: token, apiBaseUrl: baseURL } = config;

    // 2) Replace <your-token> placeholder
    const endpoint = pathTemplate.replace('<your-token>', token);

    // 3) Build the full URL and log it
    const fullUrl = new URL(endpoint, baseURL).toString();
    console.log(`[DEBUG] ${method} ${fullUrl}`);

    // 4) Create Playwright API context with auth header
    const apiContext = await request.newContext({
        extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });

    // 5) Dispatch the request (GET, POST, etc.) directly against the full URL
    response = await apiContext[method.toLowerCase()](fullUrl);

    // 6) Log the actual URL that was called
    console.log('[DEBUG] Response URL:', response.url());
});

Then('the response status should be {int}', async function (expectedStatus) {
    const actual = response.status();
    console.log('[DEBUG] Response status:', actual);
    expect(actual).toBe(expectedStatus);
});

Then('the response should contain the store name {string}', async function (expectedName) {
    const body = await response.json();
    console.log('[DEBUG] Response body.data.name:', body.data.name);
    expect(body.data.name).toBe(expectedName);
});
