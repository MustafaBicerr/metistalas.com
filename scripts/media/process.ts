import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../..");
const MANIFEST_PATH = path.join(ROOT, "source-media/metadata/media-manifest.json");
const PROCESSED_MANIFEST = path.join(
  ROOT,
  "media/manifest/processed-manifest.json",
);

type Focal = { x: number; y: number };

type RecordItem = {
  id: string;
  filename: string;
  source_path: string;
  processing_status: "approved" | "reference-only" | "pending";
  desktop_aspect: number;
  mobile_aspect: number;
  desktop_focal_point: Focal;
  mobile_focal_point: Focal;
  desktop_max: number;
  mobile_max: number;
};

type Manifest = { records: RecordItem[] };

type ProcessedEntry = {
  id: string;
  viewport: "desktop" | "mobile";
  file: string;
  public_path: string;
  width: number;
  height: number;
  bytes: number;
};

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const idIndex = args.indexOf("--id");
  const onlyId = idIndex >= 0 ? args[idIndex + 1] : undefined;
  return { dryRun, onlyId };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function cropWindow(
  width: number,
  height: number,
  aspect: number,
  focal: Focal,
) {
  const srcAspect = width / height;
  let cropW: number;
  let cropH: number;
  if (srcAspect > aspect) {
    cropH = height;
    cropW = Math.round(height * aspect);
  } else {
    cropW = width;
    cropH = Math.round(width / aspect);
  }
  const left = clamp(
    Math.round(focal.x * width - cropW / 2),
    0,
    width - cropW,
  );
  const top = clamp(
    Math.round(focal.y * height - cropH / 2),
    0,
    height - cropH,
  );
  return { left, top, width: cropW, height: cropH };
}

async function processViewport(
  record: RecordItem,
  viewport: "desktop" | "mobile",
  dryRun: boolean,
): Promise<ProcessedEntry> {
  const abs = path.join(ROOT, record.source_path);
  const meta = await sharp(abs).metadata();
  if (!meta.width || !meta.height) {
    throw new Error(`No dimensions for ${record.id}`);
  }

  const aspect =
    viewport === "desktop" ? record.desktop_aspect : record.mobile_aspect;
  const focal =
    viewport === "desktop"
      ? record.desktop_focal_point
      : record.mobile_focal_point;
  const maxEdge =
    viewport === "desktop" ? record.desktop_max : record.mobile_max;
  const quality = viewport === "desktop" ? 85 : 82;
  const crop = cropWindow(meta.width, meta.height, aspect, focal);

  let pipeline = sharp(abs).extract(crop);
  const longEdge = Math.max(crop.width, crop.height);
  if (longEdge > maxEdge) {
    pipeline =
      crop.width >= crop.height
        ? pipeline.resize({ width: maxEdge, withoutEnlargement: true })
        : pipeline.resize({ height: maxEdge, withoutEnlargement: true });
  }

  const fileName = `${record.id}-${viewport}.webp`;
  const processedPath = path.join(ROOT, "media/processed", viewport, fileName);
  const publicPath = path.join(ROOT, "public/media", viewport, fileName);

  if (dryRun) {
    const info = await pipeline.webp({ quality }).toBuffer({
      resolveWithObject: true,
    });
    console.log(
      `[dry] ${fileName}  ${info.info.width}×${info.info.height}  ${info.info.size}b`,
    );
    return {
      id: record.id,
      viewport,
      file: fileName,
      public_path: `/media/${viewport}/${fileName}`,
      width: info.info.width,
      height: info.info.height,
      bytes: info.info.size,
    };
  }

  await fs.mkdir(path.dirname(processedPath), { recursive: true });
  await fs.mkdir(path.dirname(publicPath), { recursive: true });
  const info = await pipeline.webp({ quality }).toFile(processedPath);
  await fs.copyFile(processedPath, publicPath);
  console.log(
    `${fileName.padEnd(42)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(4)}  ${Math.round(info.size / 1024)}KB`,
  );
  return {
    id: record.id,
    viewport,
    file: fileName,
    public_path: `/media/${viewport}/${fileName}`,
    width: info.width,
    height: info.height,
    bytes: info.size,
  };
}

async function main() {
  const { dryRun, onlyId } = parseArgs();
  const manifest = JSON.parse(
    await fs.readFile(MANIFEST_PATH, "utf8"),
  ) as Manifest;
  const records = manifest.records.filter((record) => {
    if (record.processing_status !== "approved") return false;
    if (onlyId) return record.id === onlyId;
    return true;
  });

  const processed: ProcessedEntry[] = [];
  for (const record of records) {
    processed.push(await processViewport(record, "desktop", dryRun));
    processed.push(await processViewport(record, "mobile", dryRun));
  }

  if (!dryRun) {
    await fs.mkdir(path.dirname(PROCESSED_MANIFEST), { recursive: true });
    await fs.writeFile(
      PROCESSED_MANIFEST,
      JSON.stringify({ generated_at: new Date().toISOString(), processed }, null, 2),
    );

    const ogSource = path.join(
      ROOT,
      "source-media/user-provided/logistics-truck-loaded.jpeg",
    );
    await sharp(ogSource)
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .jpeg({ quality: 84 })
      .toFile(path.join(ROOT, "public/og.jpg"));
    console.log("public/og.jpg  1200×630");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
