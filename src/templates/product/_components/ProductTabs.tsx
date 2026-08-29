"use client";
import { useState } from "react";
import Container from "@/src/components/common/Container";
import { MessageCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import CommentForm from "./CommentForm";
import Comment from "@/src/components/common/Comment";
import { Badge } from "@/src/components/ui/badge";
import { getCommentsMore } from "@/src/lib/queries/comment.queries";
import { Prisma } from "@/src/generated/prisma/client";

type Props = {
  description: string;
  specification: { key: string; value: string }[];
  volume: number;
  productId: string;
  initialComments: Prisma.CommentGetPayload<{
    select: {
      id: true;
      score: true;
      body: true;
      createdAt: true;
      adminReply: true;
      replyedAt: true;
      user: {
        select: {
          username: true;
          image: true;
        };
      };
    };
  }>[];
  initialCursor: string | null;
};

const ProductTabs = ({
  description,
  specification,
  volume,
  productId,
  initialComments,
  initialCursor,
}: Props) => {
  const [comments, setComments] = useState(initialComments);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);

  const activeTabStyle =
    "data-[state=active]:bg-primary data-[state=active]:text-white ";

  async function handleLoadMore() {
    setLoading(true);
    const { comments: newComments, nextCursor } = await getCommentsMore(
      productId,
      cursor ?? undefined,
    );
    setComments((prev) => [...prev, ...newComments]);
    setCursor(nextCursor);
    setLoading(false);
  }

  return (
    <section>
      <Container>
        <div className="z-0 border border-grey220 my-8 bg-secondary p-2 lg:p-5">
          <Tabs dir="rtl" defaultValue="description">
            <TabsList
              className="lg:text-lg text-xs! px-2 bg-transparent! lg:px-0 gap-1 min-h-10! w-full"
              dir="rtl"
            >
              <TabsTrigger
                value="description"
                className={`${activeTabStyle} rounded-t-xs! border-b-0! rounded-b-none! w-fit! lg:text-black bg-white border! border-grey220! py-1! px-2 lg:leading-8 lg:px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                توضیحات
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className={`${activeTabStyle} rounded-t-xs! border-b-0! rounded-b-none! w-fit! lg:text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                توضیحات تکمیلی
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className={`${activeTabStyle} rounded-t-xs! border-b-0! rounded-b-none! w-fit! lg:text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                نظرات({comments.length.toLocaleString("fa-IR")})
              </TabsTrigger>
            </TabsList>

            <div className="mt-5">
              <TabsContent value="description">
                <p className="lg:leading-8 leading-6 text-sm lg:text-base text-center">
                  {description}
                </p>
              </TabsContent>

              <TabsContent value="details">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="bg-transparent">
                      <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-1/3">
                        حجم
                      </td>
                      <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-full">
                        {Number(volume).toLocaleString("fa-IR")} میلی‌لیتر
                      </td>
                    </tr>
                    {specification.map((item, idx) => (
                      <tr
                        key={item.key}
                        className={`w-full ${idx % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                      >
                        <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-1/3">
                          {item.key}
                        </td>
                        <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-full">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="comments">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2 lg:col-span-1 lg:order-1 order-2">
                    <p className="lg:text-lg text-base font-bold">
                      نقد و بررسی ها
                    </p>

                    {comments.length > 0 ? (
                      <>
                        {comments.map((comment) =>
                          comment.status === "ACCEPT" ? (
                            <div key={comment.id}>
                              <Comment
                                score={comment.score}
                                body={comment.body}
                                date={comment.createdAt}
                                username={comment.user.username}
                                userImage={comment.user.image}
                              />
                              {comment.adminReply && (
                                <div className="mt-4 mr-6 pr-4 border-r-2 border-primary bg-muted rounded-md p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      پاسخ فروشگاه
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(
                                        comment.replyedAt,
                                      ).toLocaleDateString("fa-IR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {comment.adminReply}
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : null,
                        )}

                        {cursor && (
                          <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="mt-4 text-sm text-primary cursor-pointer disabled:opacity-50"
                          >
                            {loading
                              ? "در حال بارگذاری..."
                              : "نمایش نظرات بیشتر"}
                          </button>
                        )}
                      </>
                    ) : (
                      <EmptyCommentState />
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1 lg:order-2 order-1">
                    <CommentForm productId={productId} />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

function EmptyCommentState() {
  return (
    <div className="flex flex-col gap-2 items-center py-4 text-center">
      <MessageCircle className="size-12 text-muted-foreground" />
      <h3 className="font-bold">هنوز دیدگاهی ثبت نشده است</h3>
      <p className="text-sm text-muted-foreground">
        اولین نفری باشید که تجربه خود را درباره این محصول ثبت میکند.
      </p>
    </div>
  );
}

export default ProductTabs;
