import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { Star } from "lucide-react";
import React, { useState } from "react";

const CommentForm = () => {
  const [score, setScore] = useState(0);
  const [fill, setFill] = useState(0);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-lg">
        <p>دیدگاه خود را بنویسید</p>
        <p>
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند
          <b className="text-error500">*</b>{" "}
        </p>
      </div>
      <form action={"#"} className="glass rounded-xl  mb-6">
        <div className="mb-4 text-right flex flex-col gap-6">
          <InputGroupInlineStart
            element="input"
            name="courseId"
            label=""
            value={"1"}
            readOnly
            required
            type="text"
            hidden
          />
          <div>
            <InputGroupInlineStart
              element="input"
              name="score"
              label="امتیاز شما:"
              classNameLabel="text-base"
              value={score}
              readOnly
              min={1}
              required
              type="number"
              hidden
            />
            {/* score */}
            <div className="flex  justify-start gap-1 mb-2 ">
              {[1, 2, 3, 4, 5].map((idx) => (
                <>
                  <button
                    key={idx}
                    onClick={() => setScore(idx + 1)}
                    onMouseEnter={() => setFill(idx + 1)}
                    onMouseLeave={() => setFill(0)}
                    type="button"
                    className="focus:outline-none cursor-pointer "
                  >
                    <Star
                      className={`lucide lucide-star size-7 stroke-1 stroke-warning400 transition-all   ${idx + 1 <= (fill || score) ? "fill-yellow-500" : "fill-none"} `}
                    ></Star>
                  </button>
                </>
              ))}
            </div>
          </div>
          <InputGroupInlineStart
            element="textarea"
            classNameLabel="text-base"
            className="w-full"
            name="body"
            label="دیدگاه شما"
            required
            type="text"
          />
          <InputGroupInlineStart
            element="input"
            classNameLabel="text-base"
            className="w-full"
            name="username"
            label="نام"
            required
            type="text"
          />
          <InputGroupInlineStart
            element="input"
            classNameLabel="text-base"
            className="w-full"
            name="email"
            label="ایمیل"
            required
            type="email"
          />
          <div className="flex items-center gap-1">
            <input type="checkbox" name="remmber-me" />
            <label htmlFor="remember-me">
              ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره
              دیدگاهی می‌نویسم.{" "}
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary cursor-pointer px-4 py-2  rounded-sm  text-white  disabled:opacity-50"
          >
            {" "}
            ثبت نظر
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
