import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SOURCE_DIR = path.join(ROOT, "source-media/user-provided/logo");
const PUBLIC_DIR = path.join(ROOT, "public/media/logo");
const PUBLIC_ROOT = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "app");

type LogoJob = {
  source: string;
  dest: string;
  keepPngFallback?: boolean;
  maxWidth: number;
};

const jobs: LogoJob[] = [
  {
    source: "metis-logo-header-tranparent.png",
    dest: "header-transparent",
    keepPngFallback: true,
    maxWidth: 720,
  },
  {
    source: "metis-logo-header-whitebackground.png",
    dest: "header-white",
    maxWidth: 720,
  },
  {
    source: "metis-logo-footer.png",
    dest: "footer",
    maxWidth: 640,
  },
];

const DARK = { r: 12, g: 10, b: 8, alpha: 1 };

async function ensureSource(filename: string) {
  const fromPublic = path.join(PUBLIC_DIR, filename);
  const toSource = path.join(SOURCE_DIR, filename);
  await fs.mkdir(SOURCE_DIR, { recursive: true });
  try {
    await fs.access(toSource);
  } catch {
    try {
      await fs.copyFile(fromPublic, toSource);
    } catch {
      throw new Error(`Missing logo source: ${filename}`);
    }
  }
  return toSource;
}

async function processWordmark(job: LogoJob) {
  const abs = await ensureSource(job.source);
  const meta = await sharp(abs).metadata();
  const hasAlpha = Boolean(meta.hasAlpha);
  const pipeline = sharp(abs).resize({
    width: job.maxWidth,
    withoutEnlargement: true,
  });

  const webpPath = path.join(PUBLIC_DIR, `${job.dest}.webp`);
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const info = await pipeline
    .clone()
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(webpPath);

  if (job.keepPngFallback && hasAlpha) {
    await pipeline
      .clone()
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLIC_DIR, `${job.dest}.png`));
  }

  console.log(
    `${job.dest}.webp  ${info.width}×${info.height}  alpha=${hasAlpha}  ${Math.round(info.size / 1024)}KB`,
  );
}

async function squareMark(source: string) {
  const meta = await sharp(source).metadata();
  if (!meta.width || !meta.height) throw new Error("Icon has no dimensions");

  const inset = Math.round(Math.min(meta.width, meta.height) * 0.08);
  const cropped = await sharp(source)
    .extract({
      left: inset,
      top: inset,
      width: meta.width - inset * 2,
      height: meta.height - inset * 2,
    })
    .toBuffer();

  const croppedMeta = await sharp(cropped).metadata();
  const width = croppedMeta.width ?? 1;
  const height = croppedMeta.height ?? 1;
  const canvas = Math.max(width, height);

  return sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: DARK,
    },
  })
    .composite([
      {
        input: cropped,
        left: Math.round((canvas - width) / 2),
        top: Math.round((canvas - height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

function pngToIco(images: { width: number; png: Buffer }[]) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries: Buffer[] = [];
  const payloads: Buffer[] = [];
  let offset = 6 + 16 * count;

  for (const image of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(image.width >= 256 ? 0 : image.width, 0);
    entry.writeUInt8(image.width >= 256 ? 0 : image.width, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(image.png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(image.png);
    offset += image.png.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

async function raster(square: Buffer, size: number) {
  return sharp(square)
    .resize(size, size, { fit: "contain", background: DARK })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function processIcon() {
  const abs = await ensureSource("metis-site-ikon.png");
  const square = await squareMark(abs);

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_ROOT, { recursive: true });
  await fs.mkdir(APP_DIR, { recursive: true });

  const png512 = await raster(square, 512);
  const png192 = await raster(square, 192);
  const png180 = await raster(square, 180);
  const png48 = await raster(square, 48);
  const png32 = await raster(square, 32);

  await sharp(png512)
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(PUBLIC_DIR, "icon.webp"));
  await fs.writeFile(path.join(PUBLIC_DIR, "icon.png"), png512);
  await fs.writeFile(path.join(APP_DIR, "icon.png"), png192);
  await fs.writeFile(path.join(APP_DIR, "apple-icon.png"), png180);
  await fs.writeFile(path.join(PUBLIC_ROOT, "apple-touch-icon.png"), png180);

  const ico = pngToIco([
    { width: 32, png: png32 },
    { width: 48, png: png48 },
  ]);
  await fs.writeFile(path.join(APP_DIR, "favicon.ico"), ico);
  await fs.writeFile(path.join(PUBLIC_ROOT, "favicon.ico"), ico);

  console.log(
    `icon.webp  512×512  full mark on square canvas; favicon.ico 32+48`,
  );
}

async function removePublicPngSources() {
  const leftovers = [
    "metis-logo-header-tranparent.png",
    "metis-logo-header-whitebackground.png",
    "metis-logo-footer.png",
    "metis-site-ikon.png",
  ];
  for (const file of leftovers) {
    await fs.rm(path.join(PUBLIC_DIR, file), { force: true });
  }
}

async function main() {
  for (const job of jobs) {
    await processWordmark(job);
  }
  await processIcon();
  await removePublicPngSources();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
