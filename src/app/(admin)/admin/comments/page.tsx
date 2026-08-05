import { getComments } from "@/src/lib/queries/comment.queries";
import { commentColumns } from "@/src/templates/admin/_components/comments/commentColumns";
import { DataTable } from "@/src/templates/admin/_components/data-table";

const Page = async () => {
  const data = await getComments();
  return (
    <div className="flex flex-col gap-4 py-2 md:gap-6">
      <h2 className="text-xl">کامنت‌ها</h2>
      <div className="container mx-auto py-10">
        <DataTable columns={commentColumns} data={data} />
      </div>
    </div>
  );
};

export default Page;
