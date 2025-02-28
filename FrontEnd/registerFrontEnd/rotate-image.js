import sharp from "sharp";

sharp("src/assets/Ben-artist.webp")
  .rotate(-90) // Rotates the image 90 degrees left
  .toFile("src/assets/Ben-artist-fixed.webp", (err, info) => {
    if (err) console.error("Error rotating image:", err);
    else console.log("✅ Image rotated successfully!", info);
  });
