import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';

const assetsDir = path.resolve('src/assets');
const supportedImageFormats = ['.jpg', '.jpeg', '.png'];
const supportedVideoFormats = ['.mp4', '.mov', '.avi', '.mkv'];

// === HELPER: Recursively get all files ===
async function getAllFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getAllFiles(res) : res;
    })
  );
  return files.flat();
}

// === IMAGE CONVERSION ===
async function convertImagesToWebP() {
  const files = await getAllFiles(assetsDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supportedImageFormats.includes(ext)) continue;

    const outputPath = path.join(
      path.dirname(file),
      `${path.basename(file, ext)}.webp`
    );

    console.log(`🖼️ Converting ${file} → ${outputPath}`);

    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputPath);

      await fs.remove(file); // Remove original file
    } catch (err) {
      console.error(`❌ Error converting ${file}:`, err.message);
    }
  }
}

// === VIDEO CONVERSION ===
async function convertVideosToWebM() {
  const files = await getAllFiles(assetsDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supportedVideoFormats.includes(ext)) continue;

    const outputPath = path.join(
      path.dirname(file),
      `${path.basename(file, ext)}.webm`
    );

    console.log(`🎥 Converting ${file} → ${outputPath}`);

    await new Promise((resolve, reject) => {
      ffmpeg(file)
        .output(outputPath)
        .videoCodec('libvpx-vp9')
        .audioCodec('libopus')
        .outputOptions('-b:v 1M') // Customize bitrate
        .on('end', async () => {
          console.log(`✅ Finished: ${file}`);
          await fs.remove(file); // Remove original
          resolve();
        })
        .on('error', (err) => {
          console.error(`❌ Error converting ${file}:`, err.message);
          reject(err);
        })
        .run();
    });
  }
}

// === MAIN RUNNER ===
async function runConversion() {
  console.log('🔄 Starting asset conversion...');
  await convertImagesToWebP();
  await convertVideosToWebM();
  console.log('✅ All assets converted!');
}

runConversion().catch((err) =>
  console.error('❌ Conversion process failed:', err)
);