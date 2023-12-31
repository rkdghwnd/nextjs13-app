import { useMemo } from "react";
import { useRouter } from "next/router";
import Map from "./Map";
import Markers from "./Markers";
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from "../../hooks/useMap";
import useCurrentStore from "../../hooks/useCurrentStore";
import type { NaverMap } from "../../types/map";
import type { Coordinates } from "../../types/store";

const MapSection = () => {
  /** url query 로부터 initial zoom, center 값 설정 */
  const router = useRouter();
  /**
   * router.asPath === '/?zoom={}&lat={}&lng={}'
   * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
   */
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialZoom = useMemo(
    () => (query.get("zoom") ? Number(query.get("zoom")) : INITIAL_ZOOM),
    [query]
  );
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get("lat") && query.get("lng")
        ? [Number(query.get("lat")), Number(query.get("lng"))]
        : INITIAL_CENTER,
    [query]
  );

  /** onLoadMap */
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map); // 지도 생성
    // 지도공간(마커부분 제외)을 클릭하면 currentStore null 로 초기화(마커 선택 해제기능)
    naver.maps.Event.addListener(map, "click", clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        // 줌값과 좌표값을 받아 지도위치를 초기화하기 위함
        // 공유 버튼을 통해 변경된 좌표값을 토대로도 초기화가 됨(next/router의 asPath로 받아오기 때문)
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};
export default MapSection;
