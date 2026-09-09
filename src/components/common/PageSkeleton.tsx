import { Skeleton } from "@/src/components/ui/skeleton";

type PageSkeletonProps = {
  rows?: number;
  cards?: number;
};

export function PageSkeleton({ rows = 5, cards = 0 }: PageSkeletonProps) {
  return (
    <div className="flex flex-col gap-6 py-2" aria-busy="true" aria-label="در حال بارگذاری">
      <Skeleton className="h-7 w-32" />

      {cards > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-lg border bg-white p-4">
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-5 flex gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: rows }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
