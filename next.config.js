/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "/news",
      },
    ];
  },
  devIndicators: false,
  experimental:{
    serverActions:{
      bodySizeLimit:"10mb"
    }
  },
  images: {
  remotePatterns: [
    { protocol: "https", hostname: "picsum.photos" },
    {
      protocol: "https",
      hostname: "ppyaferjwcwfwifimetm.supabase.co",
      pathname: "/storage/v1/object/public/**",
    },
  ],
},
};