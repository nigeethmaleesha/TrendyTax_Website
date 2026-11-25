# Trendy Tax Solutions — Gemini development preview

## Setup (Windows / PowerShell)
1. Install Node.js 22 LTS. Open this project root in VS Code.
2. Create a separate free-tier project/key at https://aistudio.google.com/apikey. Check project/model quotas in AI Studio; do not enable billing if you want a free-only test.
3. Run `Copy-Item .env.example .env.local` and edit `.env.local` privately. Set `GEMINI_API_KEY` to the actual key. Leave `GEMINI_MODEL=gemini-3.1-flash-lite` unless your project requires another supported free model.
4. Run `npm run dev`. Open http://localhost:3000. Do not use Live Server for API tests. No npm dependencies are required.
5. Ask the assistant questions about founder, awards, all services, payroll manager, contact details and follow-up questions. Try an unsupported pricing question. Never submit real personal or financial information.
6. Run `npm test` for mocked provider/validation tests. These do not establish real model accuracy or API access.

## Vercel
Push the source to the existing repository (never commit `.env.local`). In Vercel select Framework Preset Other; the supplied config builds static `dist/` and serves `api/chat.mjs` as a Node function. Do not add an SPA catch-all rewrite. Set `GEMINI_API_KEY` and `GEMINI_MODEL` in Settings > Environment Variables for the environment used; redeploy. Restrict the preview to approved reviewers. Confirm the plan permits agency/client commercial use. Do not upload `.git`, private local files or secrets. No deployment has been performed as part of this package.

## Content scope
`lib/knowledge-base.json` is a snapshot of nine public HTML pages, not a database. The server sends the small allowed snapshot (rather than relying on keyword matches), plus at most three previous questions, to Gemini. The Insights article bodies are disabled by default because the website labels them as drafts. Set `CHAT_INCLUDE_DRAFTS=true` only for approved draft review; answers should identify the content as draft. The existing Privacy page is a placeholder; the supplied final policy is not integrated and is not indexed. No private portal files or documents are indexed. Update the snapshot with `npm run knowledge` (Python 3 required) after website content changes, then commit the regenerated JSON and redeploy. Update the explicit page list and build copy list when adding pages. Rebuild/restart local server after editing pages.

## Production checklist
Gemini free-tier content can be used to improve Google products. Use public/synthetic information only. For production, review provider and client data terms, actual privacy notice, regional processing, approved content and response accuracy. The chatbot is informational, not a tax adviser. No chat transcripts are intentionally persisted by this app; questions are held in page memory, and provider/host handling is governed by their terms. Sensitive-pattern blocking is incomplete; never rely on it as a DLP solution. The instance-local rate limit (8 requests/minute/IP) is best-effort, not a shared quota across serverless instances. Configure a distributed limiter or WAF and provider usage limits before public launch. Validate live answers, source accuracy and mobile behavior. To move to OpenAI, replace/add the provider adapter in `lib/chat.mjs` and configure the verified model identifier and secret server-side; no UI or database change is needed, but this adapter is not implemented yet. If final hosting is PHP-only, port the Node endpoint or retain an approved external Node API.
