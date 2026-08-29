import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tanuonmfhhxlvhxnmlad.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  experimental: {
    serverActions: {
      // avatar/project/certificate uploads ride through server actions
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
