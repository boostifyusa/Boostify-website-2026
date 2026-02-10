
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';
const FILES_TO_OPTIMIZE = [
    { name: 'Slide-4_3-5.png', width: 1024, format: 'webp' },
    { name: 'Slide-4_3-4.png', width: 1024, format: 'webp' },
    { name: 'pexels-noviana-27910251.jpg', width: 800, format: 'webp' },
    { name: 'hero-bg-pattern.png', width: 1200, format: 'webp' }, // The '279...1-1.png' seemed to be this one or similar, optimizing widely used pattern
    { name: 'pexels-level23media-19097251.jpg', width: 800, format: 'webp' }
];

async function optimize() {
    for (const file of FILES_TO_OPTIMIZE) {
        const inputPath = path.join(PUBLIC_DIR, file.name);
        // Create new filename: name.webp
        const nameWithoutExt = path.parse(file.name).name;
        const outputPath = path.join(PUBLIC_DIR, `${nameWithoutExt}.webp`);

        try {
            if (fs.existsSync(inputPath)) {
                await sharp(inputPath)
                    .resize({ width: file.width, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`✅ Optimized: ${file.name} -> ${path.basename(outputPath)}`);
            } else {
                console.warn(`⚠️ File not found: ${file.name}`);
            }
        } catch (error) {
            console.error(`❌ Error optimizing ${file.name}:`, error);
        }
    }
}

optimize();
