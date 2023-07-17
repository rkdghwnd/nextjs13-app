/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      // 이미지 파일 외부 도메인 접근 허용하는 주소
      "inflearn-nextjs.vercel.app",
      "search.pstatic.net",
      `${process.env.NEXT_PUBLIC_API_URL}`
    ],
  },
  // i18n: {
  //   // 한국어 지원 설정(<html lang="ko">)
  //   /** https://nextjs.org/docs/advanced-features/i18n-routing#getting-started */
  //   locales: ["ko"],
  //   defaultLocale: "ko",
  // },
};

module.exports = nextConfig;
