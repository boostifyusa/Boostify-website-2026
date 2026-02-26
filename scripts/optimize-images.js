import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');

async function optimizeImages() {
    const files = fs.readdirSync(PUBLIC_DIR);
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const filePath = path.join(PUBLIC_DIR, file);
            const stat = fs.statSync(filePath);

            // If image is larger than 200KB, let's compress/convert to WebP
            // Actually let's just create a WebP version for all large images
            if (stat.size > 200 * 1024) {
                const ext = path.extname(file);
                const baseName = path.basename(file, ext);
                const webpPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

                console.log(`Optimizing: ${file} (${(stat.size / 1024).toFixed(2)} KB)`);

                try {
                    // If it's a huge mock image, resize width to max 1920
                    await sharp(filePath)
                        .resize(1920, null, { withoutEnlargement: true })
                        .webp({ quality: 80 })
                        .toFile(webpPath);

                    console.log(`Created WebP variant: ${baseName}.webp`);
                } catch (err) {
                    console.error(`Error optimizing ${file}:`, err);
                }
            }
        }
    }
}

optimizeImages();
