const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb */}
      <div className="h-4 w-64 bg-gray-200 rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right column - Product image + gallery thumbnails */}
        <div className="order-1 lg:order-3 flex flex-col gap-3">
          <div className="w-full aspect-square bg-gray-200 rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>

        {/* Middle column - Title, meta, description */}
        <div className="order-3 lg:order-2 flex flex-col gap-4">
          <div className="h-6 w-full bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-40 bg-gray-200 rounded" />

          {/* Icons row */}
          <div className="flex items-center gap-3 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="size-4 bg-gray-200 rounded-full" />
            ))}
          </div>

          {/* Description title */}
          <div className="h-4 w-32 bg-gray-200 rounded mt-2" />

          {/* Description bullets */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Left column - Info box (shipping, guarantee, etc) */}
        <div className="order-2 lg:order-1 border border-grey220 rounded-lg p-5 flex flex-col gap-5 h-fit">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="size-5 bg-gray-200 rounded-full shrink-0" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
          ))}

          {/* Price */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-28 bg-gray-200 rounded" />
          </div>

          {/* Add to cart button */}
          <div className="h-10 w-full bg-gray-200 rounded-md mt-2" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
