"use client"

import { Menu } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip"

export function QuickAccessButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="default"
            aria-label="میانبرها"
            className="
              fixed bottom-6 left-6 z-50
              size-12 rounded-full
              shadow-lg
              transition-all duration-200
              hover:scale-105
            "
          >
            <Menu className="size-5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          sideOffset={10}
          className="text-xs font-medium"
        >
          میانبرها
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}