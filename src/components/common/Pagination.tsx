import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { usePagination } from "@/src/hooks/usePagination";
import { ProductWithScoreType } from "@/src/lib/types/product.type";

export function PaginationDemo({
  products,
}: {
  products: ProductWithScoreType[];
}) {
  const { nextPage, prevPage, currentPage } = usePagination({ products });
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} text="قبلی" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={nextPage} text="بعدی" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
