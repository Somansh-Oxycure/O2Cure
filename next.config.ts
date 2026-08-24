import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "env",
            value: "corporate",
          },
        ],
        destination: "/products/corporate-air-purifier",
        permanent: true,
      },
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "env",
            value: "healthcare",
          },
        ],
        destination: "/products/healthcare-air-purifier",
        permanent: true,
      },
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "env",
            value: "residential",
          },
        ],
        destination: "/residential-air-purifier",
        permanent: true,
      },
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "env",
            value: "industrial",
          },
        ],
        destination: "/products/industrial-air-purifier",
        permanent: true,
      },
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "env",
            value: "education",
          },
        ],
        destination: "/products/education-air-purifier",
        permanent: true,
      },
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "env",
            value: "datacenter",
          },
        ],
        destination: "/products/datacenter-air-purifier",
        permanent: true,
      },
      {
        source: "/commercial",
        destination: "/commercial-air-purifier",
        permanent: true,
      },
      {
        source: "/aqi-effect",
        destination: "/#aqi-effect",
        permanent: true,
      },
      {
        source: "/aqi-effect/",
        destination: "/#aqi-effect",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/products/corporate-air-purifier",
        destination: "/products?env=corporate",
      },
      {
        source: "/products/healthcare-air-purifier",
        destination: "/products?env=healthcare",
      },
      {
        source: "/products/industrial-air-purifier",
        destination: "/products?env=industrial",
      },
      {
        source: "/products/education-air-purifier",
        destination: "/products?env=education",
      },
      {
        source: "/products/datacenter-air-purifier",
        destination: "/products?env=datacenter",
      },
      {
        source: "/residential-air-purifier",
        destination: "/products?env=residential",
      },
      {
        source: "/commercial-air-purifier",
        destination: "/commercial",
      },
    ];
  },
};

export default nextConfig;
