// e2e/utils/config.js
import fs from 'fs';
import path from 'path';

const raw = fs.readFileSync(
    path.resolve(process.cwd(), 'config', 'appsettings.json'),
    'utf8'
);
export const config = JSON.parse(raw);
