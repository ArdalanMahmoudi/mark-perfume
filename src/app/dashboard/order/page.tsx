import { getOrdersPerUser } from "@/src/lib/queries/order.queries";
import { getCurrentUser } from "@/src/lib/queries/user.queries";
import OrderDashboardTemplate from "@/src/templates/dashboard/order/OrderDashboardTemplate";
import { redirect } from "next/navigation";

async function OrderPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const orders = await getOrdersPerUser(user.id);

  
  return <OrderDashboardTemplate orders={orders} />;
}

export default OrderPage;
