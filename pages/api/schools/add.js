import { createRouter } from "next-connect";
import multer from "multer";
import path from "path";
import { getPool } from "../../../lib/db";
import { ensureSchoolImagesDir } from "../../../lib/fs-utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = ensureSchoolImagesDir();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${base}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const apiRoute = createRouter();

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const imageFile = req.file?.filename || null;

  //  Validations
  if (!name || !address || !city || !state || !contact || !email_id) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid email format" });
  }

  try {
    const pool = getPool();
    const imagePath = imageFile ? `/schoolImages/${imageFile}` : null;
    const sql =
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      name,
      address,
      city,
      state,
      contact,
      imagePath,
      email_id,
    ]);
    res
      .status(201)
      .json({ success: true, id: result.insertId, image: imagePath });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: "Database insert failed" });
  }
});

// Proper export
export default apiRoute.handler({
  onError: (err, req, res) => {
    console.error("Upload error:", err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Server error" });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({
      success: false,
      error: `Method '${req.method}' Not Allowed`,
    });
  },
});
