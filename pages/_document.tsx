import { Html, Head, Main, NextScript } from "next/document";
// https://nextjs.org/docs/advanced-features/custom-document

// next.js 의 html head와 body에 관해 전역적으로 수정을 가하고 싶을 때 사용하는 페이지
// css SSR적용에도 사용됨

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
