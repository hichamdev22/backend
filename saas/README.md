## SaaS Problem Finder

Requirements
- Node 20+
- Python 3.10+

Setup
1. Copy `.env.example` to `.env.local` and fill values.
2. Install packages: `npm install`
3. Run dev server: `npm run dev`

Integrations
- Supabase: auth + data storage
- Stripe: billing
- OpenAI: problem extraction
- Reddit (PRAW): Python service to fetch posts/comments

API
- `POST /api/analyze` with `{ platform, niche, query?, limit? }`

Python service (reddit)
- Use `praw` to fetch subreddit posts/comments; expose HTTP endpoint consumed by `/api/analyze`.