import type { GetServerSideProps, NextPage } from "next";

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getServerSideProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
};

export default Example;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  /** https://web.dev/i18n/ko/stale-while-revalidate/ */
  // This value is considered fresh for five seconds (s-maxage=5).
  // If a request is repeated within the next 5 seconds, the previously
  // cached value will still be fresh.
  //
  // If the request is repeated before 5~15 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=10).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=5, stale-while-revalidate=10"
  );
  // -> getServerSideProps에서 revalidate하는법(실제로 쓸일은 거의 없음)

  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  return {
    props: { data }, // props로 내려서 쓸수 있음
  };
};
