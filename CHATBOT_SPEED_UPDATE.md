# Chatbot speed and team update

This patch supersedes TrendyTax_Chatbot_Team_Fix.zip and applies directly to TrendyTax_Website_Gemini_Chatbot.zip. Copy the four changed code files and this note into the existing project root. Keep your local `.env.local` and existing Vercel environment variables; no new packages or database are required.

- Common exact team, contact, service and greeting queries use the existing website snapshot directly, without a Gemini request. Other phrasings still use Gemini.
- Relevant pages are selected using topic hints and term matching; broad or uncertain requests use all approved pages. Complete selected pages are sent (not truncated); draft inclusion settings are unchanged. This is heuristic retrieval, not a guarantee of complete answer coverage.
- Gemini 3.1 Flash-Lite requests specify MINIMAL thinking; other configured models are unchanged. AI answers remain concise unless users ask for more detail.
- Existing 22-second provider and 27-second browser timeouts are retained; the interface shows a progress message after 4 seconds. Provider timeout is distinguished from quota and general provider errors. Logs record status, elapsed time, and context size, not API keys or question text.
- No new shared chat cache or persistent visitor storage. Existing instance-local rate limiter is unchanged; production needs distributed rate limiting and privacy review.

## Test locally
`npm test` then `npm run dev` and visit http://localhost:3000. Try “Tell me about our team?”, “Can you tell me about talk to our team?”, “What services do you offer?”, “Who is Katy Hizon?”, “What qualifications does she have?”, “What awards did Sam receive in 2025?” and a broad overview question. Direct questions should work even if Gemini is unavailable; the last follow-up and awards queries require a working model.

Use browser DevTools > Network > api/chat > Timing and Vercel runtime logs to compare actual response latency. A 429 means rate/quota limits; 504 means the provider timeout; 503 means configuration/provider error. No live Gemini API call was made during patch testing. Real response speed varies with provider availability, quotas, network and cold starts. No changes to the hosting settings, API key or HTML pages are required. Push to a preview branch before merging.
