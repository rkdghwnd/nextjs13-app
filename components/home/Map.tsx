import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { Coordinates } from "../../types/store";
import { NaverMap } from "../../types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../../hooks/useMap";
import styles from "../../styles/map.module.scss";

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    // 네이버 지도 스크립트 예제
    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map); // map 객체를 밖으로 emit(내보내다)
    }
  };

  useEffect(() => {
    return () => {
      // reactStrictMode는 개발환경에서 렌더링 두번함
      // next.config.js 의 reactStrictMode:true 일경우
      // destroy()가 2번 실행되기 때문에 개발환경에서 destroy 구문 제대로 작동안함
      // 배포환경에서 실행하거나 reactStrictMode:false로 바꿔야함
      mapRef.current?.destroy(); // 언마운트 됐을 때 map 인스턴스 파기
    };
  }, []);

  return (
    <>
      {/* next/script 는 여러 페이지를 탐색하더라도 스크립트가 한번만 로드 되도록 한다. */}
      {/*src가 온전히 잘 load되면 onLoad or onReady 에 연결된 함수 실행 */}
      {/* onError는 load가 실패할 경우 실행 */}
      {/* onLoad : script가 처음 load 됐을때 한번만 실행 */}
      {/* onReady : script가 처음 load 되거나 컴포넌트가 마운트 될 때마다 실행 */}
      {/* https://nextjs.org/docs/pages/building-your-application/optimizing/scripts#executing-addithional-code */}

      {/* strategy 속성
      https://nextjs.org/docs/basic-features/script#strategy
      기본값은 afterInteractive
      afterInteractive : script를 빠르게 load(page hydration 이후)
      lazyOnload : afterInterative 보다 좀 늦게 실행
      beforeInterative : afterInterative 보다 빠르게 script를 로드
      (nextjs 코드실행과 page hydration 발생 이전에 먼저 실행)

      * beforeInterative 를 함부로 쓰면 안된다.
      https://nextjs.org/docs/messages/no-before-interative-script-outside-document 
      nextjs의 pages/_document.js 파일, 즉 모든 페이지에서 전역적으로 사용할 때에만
      beforeInterative를 사용하도록 권장*/}

      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id={mapId} className={styles.map} />
    </>
  );
};

export default Map;
