# LexyO

A modern web app to generate SEO-optimized articles using AI, manage them in a database, and view detailed structured data. Built with **Next.js (App Router)**, **TypeScript**, **Prisma**, and integrates an AI API for article generation.

---

## Features

- **AI-powered article generation**: Generate articles based on topic, audience, keywords, and tone.
- **Structured data support**: Automatically generates JSON-LD for SEO.
- **Save and manage articles**: Stores articles in a PostgreSQL (or your choice) database via Prisma.
- **Dynamic routing**: Redirects to a dedicated page for each generated article.
- **Minimal and responsive UI**: Clean form input page with optional tone and questions.
- **Export JSON**: Option to export generated articles as `.json` for reuse.

---

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (or other Prisma-supported DB)
- **AI Integration**: Gemini API (replaceable with any Google-compatible API)
- **Markdown Rendering**: ReactMarkdown
- **Other Tools**: useTransition for smooth async handling

---

## Getting Started

Follow these steps to run the app locally:

### 1. Clone the repository

### 2. Install dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
Gemini_API_KEY="your_Gemini_api_key_here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

- Replace the `DATABASE_URL` with your PostgreSQL connection string.
- Add your **Gemini API key**.
- `NEXT_PUBLIC_SITE_URL` is used for dynamic links in structured data or redirects.

---

### 4. Set up the database with Prisma

1. **Initialize Prisma**:

```bash
npx prisma init
```

2. **Check your `prisma/schema.prisma`** according to the repo.

3. **Run migrations**:

```bash
npx prisma migrate dev --name init
```

This will:

- Create the database tables
- Generate Prisma client

4. **Generate Prisma client** (if needed):

```bash
npx prisma generate
```

---

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

1. Fill out the form:

   - **Topic** (required)
   - **Audience** (required)
   - **Focus Keyword** (optional)
   - **Key Questions** (optional)
   - **Tone** (select from dropdown)

2. Click **Generate Article**. The app will:

   - Send the data to the AI API
   - Receive the generated article
   - Save it in the database
   - Redirect to `/generate/[id]` to view full article with metadata, JSON-LD, and export options.

3. On the article page, you can:

   - View article content (rendered in Markdown)
   - View article metadata and focus keywords
   - Copy JSON-LD for SEO
   - Export the article as a `.json` file

---

---

## Environment Notes

- **Prisma**: Make sure `DATABASE_URL` points to your database.
- **AI API**: `Gemini_API_KEY` must be valid for article generation.
- **Markdown**: Article content supports rich Markdown rendering.

---

## Scripts

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma migrations
npx prisma migrate dev --name migration_name
npx prisma studio
```

---

## License

MIT License – free to use and modify.
