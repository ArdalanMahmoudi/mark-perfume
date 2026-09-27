export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-black rounded-full" />
      <span className="mr-3">در حال بررسی وضعیت پرداخت...</span>
    </div>
  );
}