import Container from "@/src/components/common/Container";
import React from "react";
import SectionTitle from "../home/_components/SectionTitle";
import { BookText } from "lucide-react";
import RuleItem from "./_components/RuleItem";

const RulesPageTemplate = () => {
  const rules = [
    {
      id:1,
      title:" شرایط استفاده از سایت",
      descs:[
        " کاربران موظف‌اند هنگام ثبت سفارش، اطلاعات صحیح و کامل وارد کنند. ",
        " هرگونه سوءاستفاده از محتوای سایت، بدون کسب اجازه کتبی، غیرقانونی است. ",
        "امکان تغییر در قیمت و موجودی محصولات بدون اطلاع قبلی وجود دارد. "
      ]
    },
    {
      id:2,
      title:" ثبت سفارش و خرید",
      descs:[
        "  پس از ثبت سفارش، پیامک یا ایمیل تأیید برای مشتری ارسال می‌شود. ",
        " ارسال سفارش تنها پس از تأیید پرداخت امکان‌پذیر است. ",
        " فروشگاه این حق را دارد در صورت بروز مشکل، سفارش را لغو و مبلغ پرداختی را بازگرداند. "
      ]
    },
    {
      id:3,
      title:" شرایط ارسال و تحویل",
      descs:[
        "   زمان ارسال بسته‌ها بسته به شهر مقصد ممکن است متفاوت باشد. ",
        "  مسئولیت تأخیر ناشی از شرکت‌های پستی بر عهده فروشگاه نیست. ",
        "  در زمان تحویل، مشتری موظف است صحت کالا و بسته‌بندی را بررسی نماید. "
      ]
    },
    {
      id:4,
      title:"سیاست بازگشت کالا",
      descs:[
        "    در صورت آسیب‌دیدگی یا مغایرت کالا با سفارش، مشتری باید ظرف ۲۴ ساعت پس از تحویل با پشتیبانی تماس بگیرد. ",
        "   کالا باید در شرایط اولیه، پلمب و بدون استفاده بازگردانده شود. ",
        "   هزینه ارسال مرجوعی تنها در صورت تأیید مغایرت یا نقص کالا بر عهده فروشگاه خواهد بود. "
      ]
    },
  ]
  return (
    <main className="pt-24 lg:pt-44">
      <Container>
        <div className="flex flex-col lg:gap-10">
          <SectionTitle title="قوانین و شرایط خرید" icon={<BookText />} />
          <p className="text-center">
            به فروشگاه ما خوش آمدید. استفاده از خدمات و خرید از این وب‌سایت به
            معنای پذیرش کامل شرایط و قوانین زیر است. لطفاً پیش از ثبت سفارش،
            موارد زیر را با دقت مطالعه کنید.{" "}
          </p>
        </div>
        {/* wrapper-layout */}
        <div className="grid grid-cols-2 mt-8 mb-12 gap-8 rounded-lg border border-grey220 bg-secondary p-8">
          {/* item */}
          {rules.map((item, idx) => (
          <RuleItem key={item.id} id={idx + 1} title={item.title} descs={item.descs}/>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default RulesPageTemplate;
