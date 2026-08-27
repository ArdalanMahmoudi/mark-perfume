"use client";
import Button from "@/src/components/common/Button";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { useToast } from "@/src/context/toast-context";
import { updateUserInfo } from "@/src/lib/actions/user.action";
import { userInfoSchema } from "@/src/lib/schemas/user.schema";
import { UserType } from "@/src/lib/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DashboardUserInfoTemplate = ({ user }: { user: UserType }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user.username ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      image: undefined,
    },
    resolver: zodResolver(userInfoSchema),
  });

  const [preview, setPreview] = useState(user.image || "/images/user.png");
  const toast = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setValue("image", selectedFile, { shouldValidate: true });
    setPreview(objectUrl);
  };

  const onSubmit = async (data) => {
    const result = await updateUserInfo(data);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="bg-secondary-layout">
      <p>مدیریت پروفایل</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <InputGroupInlineStart
          element="input"
          label="نام کاربری"
          {...register("username")}
          classNameLabel="mt-6!"
          caption={errors.username?.message}
        />
        <InputGroupInlineStart
          element="input"
          classNameLabel="mt-6!"
          label="رمز عبور فعلی"
          type="password"
          {...register("currentPassword")}
          caption={errors.currentPassword?.message}
        />
        <InputGroupInlineStart
          element="input"
          classNameLabel="mt-6!"
          label="تغییر رمز عبور"
          type="password"
          {...register("newPassword")}
          caption={errors.newPassword?.message}
        />
        <InputGroupInlineStart
          element="input"
          classNameLabel="mt-6!"
          label="تکرار رمز عبور جدید"
          type="password"
          {...register("confirmPassword")}
          caption={errors.confirmPassword?.message}
        />

        <div className="flex flex-col items-center gap-2.5 my-6">
          <label htmlFor="avatar" className="cursor-pointer relative group">
            <Image
              src={preview}
              width={100}
              height={100}
              className="rounded-full border border-grey220 size-24 object-cover"
              alt="profile image"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">
              تغییر عکس
            </div>
          </label>
          <input
            id="avatar"
            type="file"
            name="image"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.image?.message && (
            <p className="text-red-500 text-xs">
              {String(errors.image.message)}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "درحال ذخیره سازی..." : "ذخیره اطلاعات"}
        </Button>
      </form>
    </div>
  );
};

export default DashboardUserInfoTemplate;
