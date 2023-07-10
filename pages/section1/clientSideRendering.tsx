import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";
// import NoSSR from "@/components/section1/NoSSR";

/** https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr */
const NoSSR = dynamic(() => import("../../components/section1/NoSSR"), {
  ssr: false,
});
// next에서 window나 document와 같은 속성을 useEffect 밖에서 사용했을 때,
// 에러가 발생한다.
// 왜냐하면 CSR에서 window나 document를 직접 접근하는 방식으로 작성하면
// 서버에서 해당 객체를 접근하기 때문이다.
// window 나 document는 브라우저에 존재하는 객체들이다.

const Example: NextPage = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    ).then((result) => setData(result));
  }, []);

  return (
    <main>
      <h1>Client-side data fetching</h1>
      <p>값: {data}</p>

      <h1>no SSR</h1>
      <NoSSR />
    </main>
  );
};

export default Example;
