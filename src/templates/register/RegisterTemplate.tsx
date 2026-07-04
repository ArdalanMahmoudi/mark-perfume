"use client";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { registerAction } from "@/src/lib/actions/auth";
import { registerSchema } from "@/src/lib/schemas/register.schema";
import { Eye, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

const initialState = {
  message: "",
};
const RegisterTemplate = () => {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );
  const [clientError, setClientError] = useState({});

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value })); // exampl -> ...prev, email:e.target.value
  }; // Curry fn

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors;
      setClientError({
        username: fieldError.username?.[0] || "",
        email: fieldError.email?.[0] || "",
        password: fieldError.password?.[0] || "",
        confirmPassword: fieldError.confirmPassword?.[0] || "",
      });
      return;
    }
    setClientError({});
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value),
    );
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <main>
      <section>
        <div className="w-screen h-screen p-5 py-4 flex items-center justify-center">
          <div className="w-full max-w-225 flex  shadow-lg rounded-lg overflow-hidden">
            <div className="p-7.5 bg-secondary w-1/2">
              <Link href={"/"} className="flex justify-center mb-8">
                <Image
                  className="max-w-62.5 w-62.5"
                  width={600}
                  height={300}
                  src={"/images/logo.png"}
                  alt="logo"
                />
              </Link>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
              >
                <InputGroupInlineStart
                  onChange={handleChange("username")}
                  value={values.username}
                  error={clientError.username}
                  description={clientError.username}
                  label="نام کاربری(اختیاری)"
                  id="username"
                  name="username"
                  type="text"
                  icon={<User className="size-5 text-primary" />}
                  placeholder="مثال:اردلان محمودی"
                />
                <InputGroupInlineStart
                  onChange={handleChange("email")}
                  value={values.email}
                  error={clientError.email}
                  description={clientError.email}
                  label="ایمیل"
                  id="email"
                  name="email"
                  type="email"
                  icon={<Mail className="size-5 text-primary" />}
                  placeholder="email@example.com"
                />
                <InputGroupInlineStart
                  onChange={handleChange("password")}
                  error={clientError.password}
                  description={clientError.password}
                  value={values.password}
                  label="رمز عبور"
                  id="password"
                  name="password"
                  type="text"
                  icon={<Eye className="size-5 text-primary" />}
                />
                <InputGroupInlineStart
                  onChange={handleChange("confirmPassword")}
                  error={clientError.confirmPassword}
                  description={clientError.confirmPassword}
                  value={values.confirmPassword}
                  label="تکرار رمز عبور"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  icon={<Eye className="size-5 text-primary" />}
                />
                <button
                  type="submit"
                  disabled={pending ? true : false}
                  className="py-1 px-6 transition-all duration-200 bg-primary rounded-xs cursor-pointer  border border-grey220 text-white hover:bg-white hover:text-primary"
                >
                  ثبت نام
                </button>
              </form>
              <p className="flex items-center mt-4">
                حساب کاربری دارید؟{" "}
                <Link href={"/login"} className="text-primary underline">
                  ورود
                </Link>
              </p>
            </div>
            <div className="w-1/2 bg-center bg-no-repeat bg-cover bg-[url('/images/register.jpg')]"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterTemplate;
