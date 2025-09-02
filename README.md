# Next.js + MySQL Schools (Assignment)

Two pages:
- `/addSchool` — add a school using **react-hook-form**; image upload saved into `/public/schoolImages`.
- `/showSchools` — list schools like an ecommerce grid (name, address, city, image).

## Tech
- Next.js 14 (Pages Router)
- MySQL (mysql2, connection pool)
- API routes: `pages/api/schools`
- Multipart upload: `next-connect` + `multer`
- TailwindCSS for responsive UI

## Setup

1. **Clone & install**
```bash
npm install
```

2. **MySQL**
- Create DB and table:
```sql
-- or run
source ./sql/schema.sql
```
- Or copy the SQL content into your MySQL client.

3. **Environment**
Create `.env.local` in project root:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=schooldb
DB_PORT=3306
```
> Tip: ensure the MySQL user has rights to `schooldb`.

4. **Run**
```bash
npm run dev
```
Open http://localhost:3000

## Notes
- Images are saved to `/public/schoolImages` and served statically from `/schoolImages/...` URLs.
- Server validates email format and image type/size.
- Client validates all required inputs and patterns (email, contact digits).
- For production deploy (Vercel/Netlify), you may need a writable file system or an object storage (e.g., S3). For this assignment, local folder is acceptable.

## APIs
- `GET /api/schools` → list of schools
- `POST /api/schools/add` (multipart/form-data) → { name, address, city, state, contact, email_id, image }
