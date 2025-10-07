//lib/seo-schema.ts
// Zod schema for SEO report validation - focused on content analysis from scraping data
// Removed SERP and on-page sections that require different data sources

import { z } from "zod";

// Base Schemas
const evidenceSchema = z.object({
  url: z.string(),
  quote: z.string().nullable(),
  relevance_score: z.number().min(0).max(1),
});

const sourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullable(),
});

// Main SEO report Schema
export const seoReportSchema = z.object({
  meta: z.object({
    entity_name: z.string(),
    entity_type: z.enum([
      "person",
      "business",
      "product",
      "course",
      "website",
      "unknown",
    ]),
    analysis_data: z.string(),
    data_sources_count: z.number(),
    confidence_score: z.number().min(0).max(1),
  }),

  inventory: z.object({
    total_sources: z.number(),
    unique_domains: z.array(z.string()),
    source_types: z.object({
      // Existing categories remain supported
      social_media: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      professional: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      educational: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      community: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      news: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      other: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      // New categories referenced in the update prompt
      official: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      media: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),
      review: z
        .array(
          z.object({
            domain: z.string(),
            url: z.string(),
            title: z.string(),
            description: z.string().nullable,
            quality_score: z.number().min(0).max(0).optional(),
          }),
        )
        .optional(),

      date_range: z.object({
        earliest: z.string().nullable(),
        latest: z.string().nullable(),
      }),
    }),
  }),
  content_analysis: z.object({
    content_themes: z.array(
      z.object({
        theme: z.string(),
        frquency: z.number(),
        intent: z
          .enum(["informational", "navigational", "transactional"])
          .optional(),
        subthemes: z.array(z.string()).optional(),
        evidence: z.array(evidenceSchema),
      }),
    ),
    sentiment: z.object({
      overal: z.enum(["positive", "neutral", "negative", "mixed"]),
    }),
  }),

  keywords: z.object({
    content_keywords: z
      .array(
        z.object({
          keyword: z.string(),
          intent: z
            .enum([
              "infornation",
              "navigational",
              "transactional",
              "commercial",
            ])
            .optional(),
        }),
      )
      .max(25),
    keyword_themes: z
      .array(
        z.object({
          theme: z.string(),
          keywords: z.array(z.string()).max(8),
          evidence: z.array(evidenceSchema),
        }),
      )
      .max(8),
  }),

  competitors: z
    .array(
      z.object({
        name: z.string().nullable(),
        domain: z.string(),
        strength_score: z.number().min(0).max(10),
        overlap_keywords: z.array(z.string()),
        unique_advantages: z.array(z.string()),
        relationship: z.enum(["competitor", "employer", "partner", "unkown"]),
        evidence: z.array(evidenceSchema),
      }),
    )
    .min(0)
    .max(15),

  social_presence: z.object({
    platforms: z.array(
      z.object({
        platform: z.string(),
        url: z.string().nullable(), // Social URLs might not be available
        evidence: z.array(evidenceSchema),
      }),
    ),
  }),

  backlink_analysis: z.object({
    total_backlinks: z.number(),
    referring_domains: z.number(),
    backlink_sources: z.array(
      z.object({
        source_type: z.enum([
          "direct_mentions",
          "professional_references",
          "educational_citations",
          "community_mentions",
          "press_coverage",
          "directory_listings",
          "social_shares",
          "other",
        ]),
        domain: z.string(),
        url: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        link_type: z.enum(["dowfollow", "nofollow", "unkown"]).optional(),
        evidence: z.array(evidenceSchema),
      }),
    ),
  }),

  recmmendations: z
    .array(
      z.object({
        category: z.enum([
          "content",
          "social_media",
          "community_building",
          "brand_development",
          "competitor_analysis",
          "educational_content",
        ]),
        priority: z.enum(["high", "medium", "low"]),
        title: z.string(),
        description: z.string(),
        expected_impact: z.enum(["high", "medium", "low"]),
        effort_required: z.enum(["high", "medium", "low"]),
        evidence: z.array(evidenceSchema),
        implementation_steps: z.array(z.string()),
        data_driven_insights: z.array(z.string()).optional(),
        specific_quotes: z.array(z.string()).optional(),
      }),
    )
    .max(25)
    .optional(),

  summary: z
    .object({
      overall_score: z.number().min(0).max(100).optional(),
      key_strengths: z.array(z.string()).optional(),
      critical_issues: z.array(z.string()).optional(),
      quick_wins: z.array(z.string()).optional(),
      long_term_opportunities: z.array(z.string()).optional(),
    })
    .optional(),
});

// Scraping data schemas - Matches the ScrapingDataItem interface from prompts/gpt.ts
export const scrapingDataSchema = z.object({
  url: z.string(),
  prompt: z.string(),
  answer_text: z.string(),
  sources: z.array(sourceSchema),
  timestamp: z.string(),
});

// Type interface from schema - single source of truth
export type SeoReport = z.infer<typeof seoReportSchema>;
export type ScrapingData = z.infer<typeof scrapingDataSchema>;

// Individual interface exports for convenience
export type Meta = SeoReport["meta"];
export type Inventory = SeoReport["inventory"];
export type ContentAnalysis = SeoReport["content_analysis"];
export type Keywords = SeoReport["keywords"];
export type ContentKeyword = NonNullable<
  SeoReport["keywords"]["content_keywords"]
>[0];
export type Competitor = SeoReport["competitors"][0];
export type SocialPresence = SeoReport["social_presence"];
export type BacklinkAnalysis = SeoReport["backlink_analysis"];
export type Reccomendation = NonNullable<SeoReport["recmmendations"]>[0];
export type Summary = SeoReport["summary"];
export type Evidence = NonNullable<
  NonNullable<SeoReport["content_analysis"]["content_themes"]>[0]
>;
export type Source = ScrapingData["sources"][0];

// Enhanced type for the updated prompt requirements
export type SentimentAnalysis = NonNullable<
  SeoReport["content_analysis"]["sentiment"]
>;
export type SourceType = keyof NonNullable<
  SeoReport["inventory"]["source_types"]
>;
export type EntityType = SeoReport["meta"]["entity_type"];
export type ReccomendationCategory = Reccomendation["category"];
export type CompetitorRelationship = Competitor["relationship"];
export type SocialPlatform = NonNullable<
  SeoReport["social_presence"]["platforms"]
>[0];
export type BacklinkSource = NonNullable<
  SeoReport["backlink_analysis"]["backlink_sources"]
>[0];
