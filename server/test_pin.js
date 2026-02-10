import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PIN_STORE_PATH = path.join(__dirname, 'pin-store.json');

console.log('Test Script Starting...');
console.log('Expected PIN Path:', PIN_STORE_PATH);

try {
    if (!fs.existsSync(PIN_STORE_PATH)) {
        console.error('ERROR: PIN Store file DOES NOT EXIST at:', PIN_STORE_PATH);
        process.exit(1);
    }

    const content = fs.readFileSync(PIN_STORE_PATH, 'utf8');
    console.log(`File Content Length: ${content.length} chars`);

    if (content.length === 0) {
        console.error('ERROR: File is EMPTY!');
        process.exit(1);
    }

    let data;
    try {
        data = JSON.parse(content);
        console.log(`JSON Parsed Successfully. Keys: ${Object.keys(data).length}`);
    } catch (e) {
        console.error('JSON Parse Error:', e.message);
        console.log('Raw Content (First 100 chars):', content.substring(0, 100));
        process.exit(1);
    }

    const testPin = "313926";
    const entry = data[testPin];

    console.log(`Test PIN lookup ('${testPin}'):`, entry ? 'FOUND' : 'NOT FOUND');
    if (entry) {
        console.log('Entry Details:', JSON.stringify(entry, null, 2));

        // Check Validity Logic
        const now = Date.now();
        const expired = now > entry.expiresAt;
        const exhausted = entry.runsUsed >= entry.maxRuns;

        console.log(`Current Time: ${now}`);
        console.log(`Expires At:   ${entry.expiresAt} (${expired ? 'EXPIRED' : 'VALID'})`);
        console.log(`Runs Used:    ${entry.runsUsed}/${entry.maxRuns} (${exhausted ? 'EXHAUSTED' : 'AVAILABLE'})`);
    }

} catch (err) {
    console.error('Unexpected Error:', err);
}
