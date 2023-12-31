import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '../types/store';
import styles from '../styles/detail.module.scss';
import DetailHeader from '../components/home/DetailHeader';
import DetailContent from '../components/home/DetailContent';
import { useRouter } from 'next/router';
import useCurrentStore from '../hooks/useCurrentStore';
import { NextSeo } from 'next-seo';

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

  // fallback: true 인 경우의 로딩처리
  // if(router.isFallback){
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <NextSeo
        title={store.name}
        description="Next.js 시작하기 강의를 위한 매장 상세 페이지입니다."
        canonical={`${process.env.NEXT_PUBLIC_API_URL}/${store.name}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_API_URL}/${store.name}`,
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
  // 빌드타임에 path에 따른 정적 페이지를 생성한다.
  // dynamic routing 페이지에 활용된다.

  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
  // paths : 해당경로를 바탕으로한 static page 생성
  // getStaticProps에서 매개변수로 사용할수 있다.
  // 생성해야할 페이지가 적은 경우 유용하다.

  // fallback : false
  // *npm run build 시점에 path로 설정한 정적페이지 생성, 추가적인 페이지는 생성 x
  // 존재하지 않는 경로에 접근하면 404 페이지 띄움
  // return 한 path에 대한 페이지'만' 생성함
  // 데이터에 의존하는 정적 페이지가 매우 많은 경우 빌드시간이 너무 오래 걸린다.
  // 따라서 생성할 페이지가 적은 경우에 유용함

  // fallback : true
  // *build time 에 path로 설정한 정적페이지 생성 + build time 에 생성못한 페이지는 접근하는 시점에 생성(정적페이지 생성)
  // 사용자가 접근한 시점에 정적 페이지 생성 -> 그 후에는 생성한 페이지 pre-rendering
  // 존재하지 않는 경로에 접근해도 404 페이지 안띄움(따로 fallback 처리 해야 함)
  // 생성해야할 정적페이지가 너무 많은 경우, 빌드시점에 생성한 페이지 외에 추가로 페이지를 생성해야하는 경우 유용하다.
  // ex) DB에 새로 추가해야하는 게시물이나 매장이 있는 경우
  // 이런경우 fallback : true 를 통해 따로 로딩처리(로딩인디케이터 or 스켈레톤ui)해서 보여주자
  // fallback: true인 페이지를 next/link 나 next/router 로 페이지 접근한 경우 fallback: 'blocking'으로 동작함

  // fallback : 'blocking'
  // *getStaticProps 함수가 return 될 때까지 UI를 가만히 blocking(기다림) 함
  // build time 에 path로 설정한 정적 페이지 생성 +
  // 사용자가 페이지에 접근한 시점에 페이지를 생성(SSR) -> 그 후 에는 생성한 페이지 pre-rendering
  // fallback : blocking 은 로딩/isFallback 처리가 불가능하다

  // * 주의 ! fallback: true 나 blocking 은 이미 생성된 페이지를 업데이트 하지 않는다
  // 기존 페이지의 업데이트는 ISR(revalidate)를 이용해야 한다.
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // getStaticProps는 빌드타임때만 실행되는것이 아니라
  // 페이지 접근시에도 실행된다. 그래서 return을 통해 404 페이지로 보낼 수 있는것,

  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  // fallback : true or blocking 인 경우의 404 처리?
  // (blocking 부분 적용되는지 공식문서랑 답변이랑 달라서 테스트 해봐야함)
  // fallback : true 는 router.isFallback 으로도 처리 가능하다.

  // if (!store) {
  //   return {
  //     notFound: true, //  404 페이지로 보내는 속성
  //   };
  // }

  return { props: { store } };
};
