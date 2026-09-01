import CommentItem from "../_components/CommentItem";
import Image from "next/image";
import { Prisma } from "@/src/generated/prisma/client";

type CommentItemPropsType = {
  comments: Prisma.CommentGetPayload<{
    select: {
      id:true
      body: true;
      score: true;
      status: true;
      product: {
        select: {
          thumbnail: true;
          name: true;
          slug: true;
        };
      };
    };
  }>[];
};

const DashboardCommentTemplate = ({ comments }:CommentItemPropsType) => {
  return (
    <div className="bg-secondary-layout h-fit!">
      <p className="text-primary">کامنت های من</p>
      {comments.length > 0 ? (
        <div className="flex flex-col gap-5">
          {comments.map((c) => (
            <CommentItem key={c.id} data={c}/>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center flex-col gap-2">

        <Image className="w-50" src={"/images/order-empty.svg"} width={180} height={135} alt="empty-comment-panel img"/>
        <p>هنوز هیچ کامنتی ندارید.</p>
        </div>
        
      )}
    </div>
  );
};

export default DashboardCommentTemplate;
