import Container from "@/src/components/common/Container";
import { MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import CommentForm from "./CommentForm";
import Comment from "@/src/components/common/Comment";
import { CommentType } from "@/src/lib/types/comment.type";
import { ProductType } from "@/src/lib/types/product.type";

const ProductTabs = ({
  description,
  specification,
  comments,
  volume,
  productId,
}: ProductType & CommentType) => {
  const averageScore= () => {
    let avg = 0
    
  }
  const activeTabStyle =
    "data-[state=active]:bg-primary data-[state=active]:text-white ";
  return (
    <section>
      <Container>
        <div className="z-0 border border-grey220 my-8 bg-secondary  p-2 lg:p-5 ">
          <Tabs dir="rtl" defaultValue="description">
            <TabsList
              className="lg:text-lg text-xs! px-2 bg-transparent! lg:px-0 gap-1 border-b! border-b-grey220! min-h-10! w-full"
              dir="rtl"
            >
              <TabsTrigger
                value="description"
                className={`${activeTabStyle} rounded-t-xs!  border-b-0! rounded-b-none! w-fit! lg:text-black bg-white border! border-grey220! py-1! px-2 lg:leading-8 lg:px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                توضیحات
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className={`${activeTabStyle} rounded-t-xs!  border-b-0! rounded-b-none! w-fit! lg:text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                توضیحات تکمیلی
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className={`${activeTabStyle} rounded-t-xs!  border-b-0! rounded-b-none! w-fit! lg:text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                نظرات(
                {(comments.length > 0 ? comments.length : 0).toLocaleString("fa-IR")})
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
                        className={`w-full   ${idx % 2 === 0 ? "bg-white" : "bg-transparent"}`}
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
                  {/* right */}
                  <div className="col-span-2 lg:col-span-1 lg:order-1 order-2">
                    <p className="lg:text-lg text-base font-bold">
                      نقد و بررسی ها
                    </p>
                    <div className="flex items-center">
                      
                    </div>
                    {/* comments */}
                    {comments.length > 0 ? (
                      comments.map((comment) =>
                        comment.status === "ACCEPT" ? (
                          <Comment
                            key={comment.id}
                            score={comment.score}
                            body={comment.body}
                            date={comment.createdAt}
                          />
                        ) : (
                          <div className="flex flex-col gap-2 items-center py-4 text-center">
                            <MessageCircle className="size-12 text-muted-foreground" />
                            <h3 className="font-bold">
                              هنوز دیدگاهی ثبت نشده است
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              اولین نفری باشید که تجربه خود را درباره این مجصول
                              ثبت میکند.
                            </p>
                          </div>
                        ),
                      )
                    ) : (
                      <div className="flex flex-col gap-2 items-center py-4 text-center">
                        <MessageCircle className="size-12 text-muted-foreground" />
                        <h3 className="font-bold">هنوز دیدگاهی ثبت نشده است</h3>
                        <p className="text-sm text-muted-foreground">
                          اولین نفری باشید که تجربه خود را درباره این مجصول ثبت
                          میکند.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* left */}
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

export default ProductTabs;
