import { useToast } from "@/src/app/ToastProvider";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import submitCommentAction from "@/src/lib/actions/comment.action";
import { commentSchema } from "@/src/lib/schemas/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Star } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CommentForm = ({ productId }) => {
  const [fill, setFill] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(commentSchema),
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await submitCommentAction(data);
      toast.success("کامنت شما ارسال شد");
      reset();
    } catch {
      toast.error("مشکلی پیش آمد مجدد امتحان کنید")
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="lg:text-lg text-sm">
        <p>دیدگاه خود را بنویسید</p>
        <p>
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند
          <b className="text-error500">*</b>{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" rounded-xl  mb-6">
        <div className="mb-4 text-right flex flex-col gap-6">
          <div>
            {/* score */}
            <div className="flex justify-start gap-1 mb-2 ">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <>
                  <button
                    key={idx}
                    onClick={() => setValue("score", idx + 1)}
                    onMouseEnter={() => setFill(idx + 1)}
                    onMouseLeave={() => setFill(0)}
                    type="button"
                    className="focus:outline-none cursor-pointer "
                  >
                    <Star
                      className={`lucide lucide-star size-6 lg:size-7 stroke-1 stroke-warning400 transition-all   ${idx + 1 <= (fill || watch("score")) ? "fill-yellow-500" : "fill-none"} `}
                    ></Star>
                  </button>
                </>
              ))}
            </div>
            <p className="text-error500 text-sm">{errors.score?.message}</p>
          </div>
          <InputGroupInlineStart
            element="textarea"
            {...register("body")}
            classNameLabel="text-sm lg:text-base"
            className="w-full"
            label="دیدگاه شما"
            type="text"
            caption={errors.body?.message}
          />
          <InputGroupInlineStart
            element="input"
            {...register("productId")}
            value={productId}
            classNameLabel="text-sm lg:text-base"
            className="w-full"
            type="hidden"
            hidden
          />

          <label
            htmlFor="remember-me"
            className="text-sm lg:text-base flex items-start gap-2"
          >
            <input type="checkbox" name="remmber-me" />
            <span>
              {" "}
              ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره
              دیدگاهی می‌نویسم.{" "}
            </span>
          </label>
        </div>
        <div className="flex mt-8 lg:mt-0 justify-center lg:justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-white hover:text-primary transition-all duration-200 border border-primary cursor-pointer px-4 py-2  rounded-sm  text-white  disabled:opacity-50"
          >
            {
              isSubmitting ? <Loader size={16} className="animate-spin"/> :"ثبت نظر"
            }
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
