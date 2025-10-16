"use client";

import { Badge } from "lucide-react";
import { getStatusConfig } from "@/lib/status-utils";

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
}

export default function StatusBadge({
  status,
  showIcon = false,
}: StatusBadgeProps) {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;
  const configLabel = config.label.toString();
  console.log(config.label);

  return (
    <div className="flex gap-2">
      <Badge className={config.className}>
        {showIcon && <IconComponent className="w-3 h-3 mr-1" />}
      </Badge>
      {configLabel}
    </div>
  );
}
