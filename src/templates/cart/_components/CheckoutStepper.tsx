import { cn } from "@/src/lib/utils";
import { Check, CreditCard, Icon, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const steps = [
  { label: "سبد خرید", href:"/cart", icon: <ShoppingCart className="size-4 lg:size-5" /> },
  { label: "نحوه ارسال", href:"/send_status", icon: <Truck className="size-4 lg:size-5" /> },
  { label: "پرداخت", href:"/payment", icon: <CreditCard className="size-4 lg:size-5" /> },
];
const CheckoutStepper = ({ currentStep }:{currentStep:number}) => {
  return (
    <div className="flex items-center justify-center my-8 lg:my-12">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = currentStep > index;
        const icon = step.icon;
        return (
          <div key={step.label} className="flex items-center">
            <Link
            href={step.href}
              className={cn(
                "flex items-center cursor-pointer gap-2 rounded-full px-2 lg:px-4 py-2 border border-grey220 transition-colors",
                isActive && "bg-primary text-primary-foreground border-primary",
                isComplete && "bg-primary/10 text-primary border-primary",
                !isActive &&
                  !isComplete &&
                  "bg-secondary text-muted-foreground border-grey220",
              )}
            >
              {isComplete ? <Check size={16} /> : icon}
              <span className="text-xs lg:text-sm whitespace-nowrap">{step.label}</span>
            </Link>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-6 sm:w-12",
                  isComplete ? "bg-primary" : "bg-grey220",
                )}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
