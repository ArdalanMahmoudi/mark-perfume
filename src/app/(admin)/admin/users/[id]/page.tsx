import { prisma } from "@/src/lib/prisma";
import { UserDetailBody } from "@/src/templates/admin/_components/user/UserDetailsBody";
import { UserSummaryHeader } from "@/src/templates/admin/_components/user/UserSummaryHeader";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          createdAt: true,
          product: {
            select: { name: true },
          },
        },
      },
      orders: {
        select: {
          id: true,
          totalPrice: true,
          status: true,
          createdAt:true
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }
  return (
    <>
      <div className="flex flex-col gap-4 py-2 md:gap-6">
        <h2 className="text-xl">جزئیات کاربر</h2>
        <div className="container mx-auto py-4">
          <UserSummaryHeader user={user} />
          <UserDetailBody orders={user.orders} comments={user.comments} />
        </div>
      </div>
    </>
  );
};

export default Page;
