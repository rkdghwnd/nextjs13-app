import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Store } from "../types/store";
import styles from "../styles/detail.module.scss";
import DetailHeader from "../components/home/DetailHeader";
import DetailContent from "../components/home/DetailContent";
import { useRouter } from "next/router";
import useCurrentStore from "../hooks/useCurrentStore";
import { NextSeo } from "next-seo";

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(`
      /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
    `);
  };

  return (
    <>
      <NextSeo
        title={store.name}
        description="Next.js 시작하기 강의를 위한 매장 상세 페이지입니다."
        canonical={`https://inflearn-nextjs.vercel.app/${store.name}`}
        openGraph={{
          url: `https://inflearn-nextjs.vercel.app/${store.name}`,
        }}
      />
      <div className={`${styles.detailSection} ${styles.expanded}`}>
        <DetailHeader
          currentStore={store}
          expanded={expanded}
          onClickArrow={goToMap}
        />
        <DetailContent currentStore={store} expanded={expanded} />
      </div>
    </>
  );
};
export default StoreDetail;

/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
// getStaticPaths 는 getStaticProps 와 함께 쓰여야 한다.
export const getStaticPaths: GetStaticPaths = async () => {
  // 빌드타임에 dynamic routing 페이지를 정적으로 생성한다.

  const stores = (await import("../public/stores.json")).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
  // paths : 해당경로를 바탕으로한 static page 생성
  // getStaticProps에서 매개변수로 사용할수 있다.

  // fallback : false -> 존재하지 않는 경로에 접근하면 404 페이지 띄움
  // fallback : true -> 존재하지 않는 경로에 접근해도 404 페이지 안띄움
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import("../public/stores.json")).default;
  const store = stores.find((store) => store.name === params?.name);

  // if (!store) {
  //   return {
  //     notFound: true, //  404 페이지로 보내는 속성
  //   };
  // }

  return { props: { store } };
};
