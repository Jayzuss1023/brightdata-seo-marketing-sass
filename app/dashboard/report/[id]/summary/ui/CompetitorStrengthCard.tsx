"use client";

import React from "react";
import { SeoReport } from "@/lib/seo-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award } from "lucide-react";

interface CompetitorStrengthCardProps {
  seoReport: SeoReport;
}

export function CompetitorStrengthCard({
  seoReport,
}: CompetitorStrengthCardProps) {
  const competitorStrength = (seoReport?.competitors || [])
    .filter((c) => c.strength_score && c.name)
    .map((c) => ({
      name: c.name,
      stength: Number(c.strength_score),
    }));
  console.log(competitorStrength);
  return <div>CompetitorStrengthCard</div>;
}
