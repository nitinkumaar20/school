import fs from "fs";
import path from "path";

export function ensureSchoolImagesDir() {
  const dir = path.join(process.cwd(), "public", "schoolImages");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}
