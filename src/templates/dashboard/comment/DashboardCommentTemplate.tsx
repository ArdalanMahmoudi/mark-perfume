import { CommentType } from "@/src/lib/types/comment.type";
import React from "react";
import CommentItem from "../_components/CommentItem";
import Image from "next/image";

const DashboardCommentTemplate = ({ comments }) => {
  return (
    <div className="bg-secondary-layout h-fit!">
      <p className="text-primary">کامنت های من</p>
      {comments.length > 0 ? (
        <div className="flex flex-col gap-5">
          {comments.map((c) => (
            <CommentItem key={c.id} productImg={c.product.thumbnail} productName={c.product.name} productSlug={c.product.slug} commentBody={c.body} score={c.score} status={c.status}/>
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
