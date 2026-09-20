import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../..");
const MANIFEST = path.join(ROOT, "source-media/metadata/media-manifest.json");

type Manifest = {
  records: Array<{
    id: string;
    filename: string;
    source_path: string;
    processing_status: string;
  }>;
};

async function inspect() {
  const raw = await fs.readFile(MANIFEST, "utf8");
  const manifest = JSON.parse(raw) as Manifest;

  for (const record of manifest.records) {
    const abs = path.join(ROOT, record.source_path);
    try {
      const meta = await sharp(abs).metadata();
      console.log(
        `${record.id.padEnd(28)} ${String(meta.width).padStart(5)}×${String(meta.height).padEnd(5)} ${meta.format}  ${record.processing_status}`,
      );
    } catch (error) {
      console.log(`${record.id.padEnd(28)} MISSING  ${record.source_path}`);
      console.error(error instanceof Error ? error.message : error);
    }
  }
}

inspect().catch((error) => {
  console.error(error);
  process.exit(1);
});
