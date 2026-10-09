/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      { pathname: "/photos/**" }, // Content-versioned photo URLs include ?v=.
      { pathname: "/**", search: "" },
    ],
  },
};

export default nextConfig;
