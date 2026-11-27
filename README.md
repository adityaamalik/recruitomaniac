# Recruitomaniac

An AI-assisted recruitment platform: AI handles the repetitive work, and people make the hiring decisions.

> **Work in progress.** This is a portfolio project, so please don't upload real candidate data.

## How it will work

1. A company shares a role.
2. AI reads the CVs and builds candidate profiles.
3. A person reviews and approves who moves forward.
4. Interviews are scheduled with the hiring team.
5. The team makes the final decision.

## Status

| Feature                                                  | Status                              |
| -------------------------------------------------------- | ----------------------------------- |
| Public pages (home, about, pricing, how it works, contact) | Built                             |
| Login and registration screens                           | Built, not yet connected to the API |
| API server                                               | Starter only                        |
| Authentication and database                              | Planned                             |
| Job postings, CV parsing and candidate profiling         | Planned                             |
| Human review, interview scheduling and dashboard         | Planned                             |

## Tech stack

- **Web app:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **API:** Python 3.13, FastAPI, uv
- **Database (planned):** PostgreSQL

## Project structure

```
recruitomaniac-ui/    Web app
recruitomaniac-api/   API
```

## Getting started

You need [Node.js](https://nodejs.org/) 20.9 or newer and [uv](https://docs.astral.sh/uv/).

```bash
git clone https://github.com/adityaamalik/recruitomaniac.git
cd recruitomaniac
```

**API**, at http://127.0.0.1:8000 (docs at `/docs`):

```bash
cd recruitomaniac-api
cp .env.example .env
uv sync
uv run fastapi dev main.py
```

**Web app**, at http://localhost:3000 (in a second terminal, from the project folder):

```bash
cd recruitomaniac-ui
cp .env.example .env
npm install
npm run dev
```

The values in `.env` are placeholders for upcoming features. The current code runs without changing them.

## Roadmap

Planned work is tracked in [GitHub Issues](https://github.com/adityaamalik/recruitomaniac/issues).
