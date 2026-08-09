import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import { CommentType } from "@/src/lib/types/comment.type";
import { OrderType } from "@/src/lib/types/orders.type";

interface UserDetailBodyProps {
  orders: OrderType[];
  comments: CommentType[];
}

export function UserDetailBody({ orders, comments }: UserDetailBodyProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* سفارش‌ها */}
      <section className="rounded-lg border bg-white p-6">
        <h3 className="font-bold mb-4">سفارش‌ها ({orders.length})</h3>

        {orders.length === 0 ? (
          <p className="text-muted-foreground text-sm">سفارشی ثبت نشده است</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order, index) => (
              <div key={order.id}>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">سفارش #{order.id.slice(0, 8)}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span>{order.totalPrice.toLocaleString("fa-IR")} تومان</span>
                    <Badge variant="outline" className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
                {index < orders.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* کامنت‌ها */}
      <section className="rounded-lg border bg-white p-6">
        <h3 className="font-bold mb-4">کامنت‌ها ({comments.length})</h3>

        {comments.length === 0 ? (
          <p className="text-muted-foreground text-sm">کامنتی ثبت نشده است</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <div className="flex flex-col gap-1 text-sm">
                  {comment.product.name && (
                    <span className="text-muted-foreground text-xs">
                      روی محصول: {comment.product.name}
                    </span>
                  )}
                  <p>{comment.body}</p>
                  <span className="text-muted-foreground text-xs">
                    {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                {index < comments.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}