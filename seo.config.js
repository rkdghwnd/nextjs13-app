// next-seo 사용시 기본적으로 적용할 정보들

// import { DefaultSeo } from "next-seo";
// import SEO from "../seo.config";
// <DefaultSeo {...SEO}/> 방식으로 적용
// 이 프로젝트에는 _app.js에 적용해 전역적으로 설정함

export default {
  // %s -> NextSeo 에서 title 속성값이 들어가는 부분
  // 보통 하이픈(-) 으로 구분한다.(예를들어 | 은 I 와 혼동할수 있어 안씀)
  titleTemplate: "%s - Next.js 시작하기",
  openGraph: {
    type: "website",
    site_name: "Next.js 시작하기",
    images: [
      { url: "https://nextjs.org/static/blog/next-13/twitter-card.png" },
    ],
  },
  additionalLinkTags: [
    // 추가로 필요한 link tag에 대한 정보를 나열
    {
      rel: "shortcut icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    // 추가로 필요한 meta tag에 대한 정보를 나열
    {
      name: "naver-site-verification",
      content: "11dbb30a9a1d5436391d1284af47399e2851cf33",
    },
    {
      name: "google-site-verification",
      content: "O0r_20aU1JVk1sbI7E50r6RXiTRFrN8jG_a3uSeG4A0",
    },
  ],
};
