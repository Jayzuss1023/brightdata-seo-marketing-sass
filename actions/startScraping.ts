"use server";

// import {ApiPath} from "@/convex/http"
// import {buildPerplexityPrompt} from "@/prompts/perplexity"
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import { ApiPath } from "@/convex/http";
import retryAnalysisOnly from "./retryAnalysis";

if (!process.env.BRIGHTDATA_API_KEY) {
  throw new Error("BRIGHTDATA_API_KEY is NOT set!");
}

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL NOT SET!");
}

export default async function startScraping({
  prompt,
  existingJobId,
  country = "US",
}: {
  prompt: string;
  existingJobId?: string;
  country: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User ID is required!");
  }

  //   Initialize Convex Client
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  let jobId: string;

  if (existingJobId) {
    const retryInfo = await convex.query(api.scrapingJobs.canUseSmartRetry, {
      jobId: existingJobId as Id<"scrapingJobs">,
      userId: userId,
    });

    if (retryInfo.canRetryAnalysisOnly) {
      console.log("Using smart retry - analysis only for job: ", existingJobId);

      //   Import the retry analysis action

      const result = await retryAnalysisOnly(existingJobId);
      if (result.ok) {
        return {
          ok: true,
          data: { snapshot_id: null },
          jobId: existingJobId,
          smartRetry: true,
        };
      } else {
        return {
          ok: false,
          error: result.error || "Smart retry failed.",
        };
      }
    }
  } else {
    console.log("Full retry required for the job: ", existingJobId);

    jobId = await convex.mutation(api.scrapingJobs.createScrapingJob, {
      originalPrompt: prompt,
      userId: userId,
    });
  }
  // Include the job ID in the webhook URL as a query parameter
  const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}${ApiPath.Webhook}?jobId=${jobId}`;
  const encodedWebhookUrl = encodeURIComponent(WEBHOOK_URL);

  //   Call to Brightdata...
  const dataset_id = process.env.DATA_SET_ID;

  if (!dataset_id) {
    throw new Error("BRIGHT_DATA_SET id is not set");
  }
  const url = `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${dataset_id}&endpoing=${encodedWebhookUrl}{&format=json&uncompressed_webhook=true&include_errors=true`;

  const perplexityPrompt = buildPerplexityPrompt(prompt);
}
