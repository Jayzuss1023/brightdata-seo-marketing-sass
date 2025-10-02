"use client";
import { PricingTable } from "@clerk/clerk-react";

function PricingPage() {
  return (
    <div>
      Pricing Page
      <PricingTable newSubscriptionRedirectUrl="/dashboard" />
    </div>
  );
}

export default PricingPage;
