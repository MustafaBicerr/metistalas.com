import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SOURCE_DIR = path.join(ROOT, "source-media/user-provided/logo");
const PUBLIC_DIR = path.join(ROOT, "public/media/logo");
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

async function processIcon() {
  const abs = await ensureSource("metis-site-ikon.png");
  const meta = await sharp(abs).metadata();
  if (!meta.width || !meta.height) throw new Error("Icon has no dimensions");

  const inset = Math.round(Math.min(meta.width, meta.height) * 0.08);
  const cropped = sharp(abs).extract({
    left: inset,
    top: inset,
    width: meta.width - inset * 2,
    height: meta.height - inset * 2,
  });

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const webpInfo = await cropped
    .clone()
    .resize({ width: 512, height: 512, fit: "cover" })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(PUBLIC_DIR, "icon.webp"));

  await cropped
    .clone()
    .resize({ width: 512, height: 512, fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, "icon.png"));

  await cropped
    .clone()
    .resize({ width: 32, height: 32, fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP_DIR, "icon.png"));

  await cropped
    .clone()
    .resize({ width: 180, height: 180, fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP_DIR, "apple-icon.png"));

  console.log(
    `icon.webp  ${webpInfo.width}×${webpInfo.height}  ${Math.round(webpInfo.size / 1024)}KB (fringe cropped)`,
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
