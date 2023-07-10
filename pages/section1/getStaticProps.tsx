import type { NextPage } from "next";

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getStaticProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
};

export default Example;

export async function getStaticProps() {
  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  // revalidate : SSG방식에서 정적인 페이지를 업데이트 시켜주는 방식(incremental static regeneration)
  // 네트워크의 x-nextjs-cache 값이 변화함
  // x-nextjs-cache : HIT -> 캐시가 최신내용으로 업데이트됨(fresh)
  // x-nextjs-cache : STALE -> 캐시가 이미 가져온 내용과 동일함
  // 첫 실행 0~5초 : HIT
  // 5초 이내에 재접속 : HIT
  // 5초 이후 첫접속 : HIT(페이지 업데이트 됨)
  // 5~10초 이내 재접속 : STALE
  // 10초 이후 첫접속 : HIT
  // 이후 반복 ...
  // ISR의 pre-rendering은 서버에서 진행된다.
  return {
    props: { data }, // props로 내려서 쓸수있음
    // revalidate의 특징 : 변화하는 데이터값이 5초후에도 같으면
    // Next.js가 pre-rendering을 다시 수행하지 않는다.
    revalidate: 5, // 5초에 한번씩 SSG를 revalidate 한다.
    /** https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration */
  };
}
