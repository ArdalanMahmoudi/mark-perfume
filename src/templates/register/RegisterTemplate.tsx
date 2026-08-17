"use client";
import { useToast } from "@/src/context/toast-context";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { registerSchema } from "@/src/lib/schemas/register.schema";
import { Eye, EyeClosed, Loader, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const router = useRouter()
  const [clientError, setClientError] = useState({});
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserInfo((prevInfo) => ({...prevInfo, [e.target.name]:e.target.value}))
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(userInfo);
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
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      switch (res.status) {
        case 201:
          toast.success(data.message);
        router.push('/')
          break;
        case 409:
          toast?.error(data.message);
          break;
        case 400:
          setClientError(data.errors);
          break;
        case 500:
          toast.error("مشکلی پیش آمد مجدد امتحان کنید");
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  // const data = await res.json()

  return (
  
      <section className="py-6">
        <div className="w-screen h-screen p-5 py-4 flex items-center justify-center my-12">
          <div className="w-full max-w-225 flex  shadow-lg rounded-lg overflow-hidden">
            <div className="lg:p-7.5 p-4 bg-secondary w-full lg:w-1/2">
              <Link href={"/"} className="flex justify-center mb-6">
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
                  onChange={(e) => handleChange(e)}
                  value={userInfo.username}
                  error={clientError.username}
                  caption={clientError.username}
                  label="نام کاربری(اختیاری)"
                  id="username"
                  name="username"
                  type="text"
                  icon={<User className="size-5 text-primary" />}
                  placeholder="مثال:اردلان محمودی"
                />
                <InputGroupInlineStart
                  element="input"
                  onChange={(e) => handleChange(e)}
                  value={userInfo.email}
                  error={clientError.email}
                  caption={clientError.email}
                  label="ایمیل"
                  id="email"
                  name="email"
                  type="email"
                  icon={<Mail className="size-5 text-primary" />}
                  placeholder="email@example.com"
                />
                <InputGroupInlineStart
                  element="input"
                  onChange={(e) => handleChange(e)}
                  error={clientError.password}
                  caption={clientError.password}
                  value={userInfo.password}
                  label="رمز عبور"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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
                <InputGroupInlineStart
                  element="input"
                  onChange={(e) => handleChange(e)}
                  error={clientError.confirmPassword}
                  caption={clientError.confirmPassword}
                  value={userInfo.confirmPassword}
                  label="تکرار رمز عبور"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  icon={
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
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
                  className="py-1 px-6 transition-all duration-200 bg-primary rounded-xs cursor-pointer  border border-grey220 text-white hover:bg-white hover:text-primary"
                >
                 {loading ? <Loader size={16}/> : 'ثبت نام'} 
                </button>
              </form>
              <p className="flex items-center mt-4 text-sm lg:text-base gap-1">
                حساب کاربری دارید؟{" "}
                <Link href={"/login"} className="text-primary underline">
                  ورود
                </Link>
              </p>
            </div>
            <div className="hidden lg:block w-1/2 bg-center bg-no-repeat bg-cover "style={{backgroundImage:"url('/images/register.jpg')"}}></div>
          </div>
        </div>
      </section>

  );
};

export default RegisterTemplate;
