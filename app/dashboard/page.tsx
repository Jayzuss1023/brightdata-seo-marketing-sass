"use client";

import Layout from "./layout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Plus, BarChart3, FileText, Sparkles, Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [country, setCountry] = useState("US");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Create Report Section */}
          <div>
            <Card>
              <div />
              <div />
              <CardHeader>
                <div>
                  <div>
                    <Sparkles />
                  </div>
                  <CardTitle>Create New Report</CardTitle>
                </div>
                <CardDescription>
                  Enter a business name, product, or website to generate a
                  <span> Comprehensive SEO analysis</span> powered by AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div>
                    <div>
                      <div>
                        <FileText />
                      </div>
                      <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a Name / Business / Product / Website etc."
                      />
                    </div>

                    {/* <CountrySelector
                                    value={country}
                                    onValueChange={setCountry}
                                    disabled={isLoading}
                                /> */}

                    <div>
                      <Button type="submit" size="lg">
                        {isLoading ? (
                          <>
                            <div>
                              <span>Generating Report...</span>
                              <span>Generating...</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <Plus />
                            <span>Generate Report</span>
                            <span>Generate</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
