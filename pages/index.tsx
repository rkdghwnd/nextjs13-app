import { Fragment, useEffect } from "react";
import { NextPage } from "next";
import Header from "../components/home/Header";
import MapSection from "../components/home/MapSection";
import DetailSection from "../components/home/DetailSection";
import { Store } from "../types/store";
import useStores from "../hooks/useStores";
import { NextSeo } from "next-seo";

// npx create-next-app@latest --typescript
// eslint-config-next는 next.js에서 권장하는 eslint 속성이 적용되는 모듈
// //npm i --save-dev --save-exact prettier (prettier 설치)
// //npm i --save-dev eslint-config-prettier (prettier와 eslint와의 충돌 방지)
// .eslint.json 과 .prettierrc.json 설정하기

// SSR, CSR, SSG의 장점만 고려하여 페이지를 자유롭게 routing/rendering 할 수 있도록 API를 제공함
//  SSR/SSG의 용량과 보안
//  CSR의 페이지 이동 속도, 깜빡임 없음
//  Next.js의 방향성

// pre-rendering -> JS disable: CRA vs Next.js
// pre-rendering 의 종류에는 SSR와 SSG 가 있다.

// Section 1: SSR/CSR/SSG, ISR(revalidate), next/link
//   getStaticProps(SSG)
//   getServerSideProps(SSR)
//   revalidate: incremental Static Regeneration(ISR)
//   CSR

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      {/* npm i next-seo */}
      {/* next의 Head를 이용해도 손쉽게 seo를 구현 가능 하지만 */}
      {/* next-seo를 사용하면 더 손쉽게 seo, open-graph, 트위터 공유에 들어가는 seo 값을 구현할 수 있습니다. */}
      <NextSeo
        title="매장 지도"
        description="Next.js 시작하기 강의를 위한 매장 지도 서비스입니다."
        canonical="https://inflearn-nextjs.vercel.app"
        openGraph={{
          url: "https://inflearn-nextjs.vercel.app",
        }}
      />
      <Header />
      <main
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

export const  getStaticProps = async () => {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((response) => response.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
