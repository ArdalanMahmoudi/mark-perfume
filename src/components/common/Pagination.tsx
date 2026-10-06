import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination"
import { usePagination } from "@/src/hooks/usePagination"
import { ProductWithScoreType } from "@/src/lib/types/product.type"

export function PaginationDemo({products}:{products:ProductWithScoreType[]}) {
  const {nextPage, prevPage} = usePagination({products})
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} href="#" text="قبلی"/>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext onClick={nextPage} href="#" text="بعدی"/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
