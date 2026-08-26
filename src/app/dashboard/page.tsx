import { getOrdersPerUser } from "@/src/lib/queries/order.queries";
import { getCurrentUser } from "@/src/lib/queries/user.queries";
import DashboardIndexTemplate from "@/src/templates/dashboard/index/DashboardIndexTemplate";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser() 
  if (!user) {
    redirect('/login')
  }
  const orders = await getOrdersPerUser(user.id);
  return (
    <DashboardIndexTemplate user={user} orders={orders}/>
  )
}
