/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "inflearn-nextjs.vercel.app",
      "search.pstatic.net",
      "lecture-1.vercel.app",
    ],
  },
  i18n: {
    /** https://nextjs.org/docs/advanced-features/i18n-routing#getting-started */
    locales: ["ko"],
    defaultLocale: "ko",
  },
};

module.exports = nextConfig;
