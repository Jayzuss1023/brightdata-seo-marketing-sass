Full-stack app that turns a business name, product, or site into an SEO report. It scrapes SERP-style results with Bright Data’s Perplexity scraper, then uses GPT to turn that raw data into a structured report.

Built with Next.js, Convex, Clerk, and the Vercel AI SDK.

## What it does

- Sign in with Clerk, then create a report from the dashboard.
- Kick off a Bright Data scrape, store the job in Convex, and wait on a webhook when the snapshot is ready.
- Run GPT-4o against the scrape results with a Zod schema so the report stays structured (scores, keywords, sources, recommendations, etc.).
- Show a live job status, then a summary with charts and cards.
- Chat with an AI agent that’s been given access to the report so you can ask what the numbers actually mean.
- Retry a failed **analysis** without re-scraping when the raw data is already saved.
- Pricing page uses Clerk Billing (`PricingTable`).

Job statuses: `pending` -> `running` -> `analyzing` -> `completed` (or `failed`).

## How a report is generated

1. Dashboard form calls the `startScraping` server action.
2. A `scrapingJobs` document is created and Bright Data is called with a webhook URL that includes the job id.
3. `convex/http.ts` receives the snapshot, saves raw results, and schedules `runAnalysis`.
4. `convex/analysis.ts` builds a prompt, calls `generateObject` with `seoReportSchema`, and stores `seoReport` on the job.
5. The report pages and `AIChat` read that document in real time from Convex.

## Tech stack

| Layer | Tools |
| --- | --- |
| App | Next.js, React 19, TypeScript |
| UI | Tailwind CSS, Radix / shadcn-style components, Recharts, lucide-react |
| Auth & billing | Clerk  |
| Backend / DB | Convex queries, mutations, actions, HTTP webhook |
| Scraping | Bright Data Perplexity scraper |
| AI | Vercel AI SDK, OpenAI (`gpt-4o`), structured output via Zod |
| Chat | `app/api/chat/route.ts` + `streamText` |
