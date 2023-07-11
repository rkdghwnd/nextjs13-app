import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Links() {
  const router = useRouter();
  // useEffect(() => {
  //   router.prefetch('/section1/getStaticProps');
  // }, [router]);
  return (
    <main>
      <h1>Links</h1>
      <button
        onClick={() => {
          router.push("/section1/getStaticProps"); // CSR 방식으로 라우팅
          // Links와 달리 lazy한 방식으로 json과 js파일을 가져오지 않는다
          // 따로 설정하고 싶으면 prefetch를 이용해야 한다.
        }}
      ></button>
      {/* <div style={{ height: "200vh" }}></div> */}

      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      {/* <a href="/section1/getStaticProps">/getStaticProps</a> */}
      {/* <Link href="/section1/getStaticProps">/getStaticProps</Link> */}
      {/* next/link 의 특징
      1. CSR 방식으로 동작한다.
      2. 화면(뷰포트)에 링크가 보일때 json과 js파일을 가져온다.(lazy한 방식)
      3. 이전버전(12버전까지)에서는 스타일을 입히려면 자식으로 <a> 태그를 넣어서 적용해야 했지만
        13버전에서는 Link태그에 바로 적용 가능하다. */}
    </main>
  );
}
