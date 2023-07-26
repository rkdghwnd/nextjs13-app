import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
// import NoSSR from "@/components/section1/NoSSR";

/** https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr */
const NoSSR = dynamic(() => import('../../components/section1/NoSSR'), {
  ssr: false,
});

// next에서 window나 document와 같은 속성을 useEffect 밖에서 사용했을 때 에러가 발생한다.
// 왜냐하면 Next.js에서는 기본적으로 Pages 에서 프리렌더링을 제공하고
// useEffect같은 일부 부분에서만 CSR을 적용하는 방식으로 작동하기 때문이다.
// 그래서 useEffect 밖에서 window나 document를 직접 접근하는 방식으로 작성하면
// 프리렌더링 과정에서 서버에서 해당 객체를 접근하는 시도를 하는 것이고
// window 나 document는 브라우저에 존재하는 객체들이니 당연히 에러가 발생한다.

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
