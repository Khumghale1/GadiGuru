import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental : {
    serverComponentsHmrCache: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "izfcdbklnhobkqrenrzz.supabase.co",
      },
    ],
  },
async headers() {
  return [
    {
      source: "/embed)",
      headers: [
        {
          key: "XContent-Security-Policies",
          value: "frame-src 'self' https://me.com; script-src 'self' https://*.example.com; img-src 'self' data: https://*.example.com; style-src 'self' 'unsafe-inline' https://*.example.com; frame-ancestors 'self' https://*.example.com; object-src 'none';",
        },
        
      ],
    },
  ];
}
};

export default nextConfig;
