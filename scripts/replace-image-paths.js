import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '../src');

const replacements = [
    ['279000632_61847a32-e2d1-49e5-bbbb-6ea5c145d830-1-1.png', '279000632_61847a32-e2d1-49e5-bbbb-6ea5c145d830-1-1.webp'],
    ['FTS-Mock.jpg', 'FTS-Mock.webp'],
    ['Slide-4_3-1.png', 'Slide-4_3-1.webp'],
    ['Slide-4_3-4.png', 'Slide-4_3-4.webp'],
    ['Slide-4_3-5.png', 'Slide-4_3-5.webp'],
    ['california-coast-hero.jpg', 'california-coast-hero.webp'],
    ['hero-bg-pattern.png', 'hero-bg-pattern.webp'],
    ['pexels-noviana-27910251.jpg', 'pexels-noviana-27910251.webp']
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.match(/\.(tsx|ts|jsx|js)$/)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [oldName, newName] of replacements) {
                if (content.includes(oldName)) {
                    // Replace all occurrences using global regex or split/join
                    content = content.split(oldName).join(newName);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath.replace(SRC_DIR, '')}`);
            }
        }
    }
}

processDirectory(SRC_DIR);
console.log('Image paths updated.');
