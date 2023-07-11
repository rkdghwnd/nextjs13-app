import Image from "next/image";
import styles from "./page.module.css";
import { Fragment } from "react";
import Header from "../components/common/Header";
import Feedback from "./feedback";

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

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main>Hello World!</main>
    </Fragment>
  );
}
