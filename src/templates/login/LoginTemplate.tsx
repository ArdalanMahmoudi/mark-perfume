"use client";
import { useToast } from "@/src/context/toast-context";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { loginSchema } from "@/src/lib/schemas/login.schema";
import { Eye, EyeClosed, Loader2Icon, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

type ClientErrors = {
  email?: string;
  password?: string;
};

const LoginTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [clientError, setClientError] = useState<ClientErrors>({
    email: "",
    password: "",
  });
  // --------------Handle-Change-----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ------------Handle-Submit------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = loginSchema.safeParse(values);
    if (!fields.success) {
      const fieldsError = fields.error.flatten().fieldErrors;
      setClientError({
        email: fieldsError.email?.[0],
        password: fieldsError.password?.[0],
      });
      return;
    }
    setClientError({});
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      switch (res.status) {
        case 200:
          toast.success(data.message);
          setValues({ email: "", password: "" });
          router.push("/");
          break;
        case 409:
          toast.error(data.message);
          break;
        case 400:
          toast.error(data.message);
          setClientError(data.errors);
          break;
        case 401:
          toast.error(data.message);
          break;
        case 403:
          Swal.fire({
            title: data.message,
            timer: 3000,
            icon: "error",
          });
          router.push("/");
          break;
        case 500:
          toast.error(data.message);
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="w-screen h-screen p-5 py-4 flex items-center justify-center">
        <div className="w-full max-w-225 flex  shadow-lg rounded-lg overflow-hidden">
          <div className="lg:p-7.5 p-4 bg-secondary w-full lg:w-1/2">
            <Link
              href={"/"}
              className=" flex justify-center mb-6 w-full items-center"
            >
              <Image
                className="max-w-50 lg:w-50 w-40"
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
                element="input"
                onChange={handleChange}
                value={values.email}
                error={clientError.email}
                caption={clientError.email}
                label="ایمیل"
                id="email"
                name="email"
                type="email"
                icon={<Mail className="size-5 text-primary" />}
                placeholder="email@example.com"
                autoComplete="email"
              />
              <InputGroupInlineStart
                element="input"
                onChange={handleChange}
                error={clientError.password}
                caption={clientError.password}
                value={values.password}
                label="رمز عبور"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                icon={
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeClosed className="size-5 text-primary" />
                    ) : (
                      <Eye className="size-5 text-primary" />
                    )}
                  </button>
                }
              />

              <button
                type="submit"
                disabled={loading ? true : false}
                className="py-1 px-6 w-full lg:w-fit transition-all duration-200 bg-primary rounded-xs cursor-pointer  border border-grey220 text-white hover:bg-white hover:text-primary"
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "ورود"}
              </button>
            </form>
            <p className="flex items-center mt-4 text-sm lg:text-base">
              حساب کاربری ندارید؟{" "}
              <Link
                href={"/register"}
                className="text-primary underline  ms-1 text-xs lg:text-sm "
              >
                ثبت‌نام کنید
              </Link>
            </p>
            <p className="flex items-center mt-3 text-sm lg:text-base">
              رمز خود را فراموش کرده اید؟{" "}
              <Link
                href={"/forgot-password"}
                className="text-primary underline text-xs lg:text-sm ms-1"
              >
                کلیک کنید
              </Link>
            </p>
          </div>
          <div
            className="lg:block hidden w-1/2 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/images/register.jpg')" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default LoginTemplate;
