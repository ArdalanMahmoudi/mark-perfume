import { Button } from "@/src/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip"

export function TooltipDemo({btn, textTolltip}:{btn:React.ReactNode, textTolltip:string}) {
  return (
    <Tooltip>
      <TooltipTrigger  >
        {btn}
      </TooltipTrigger>
      <TooltipContent>
        <p>{textTolltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
