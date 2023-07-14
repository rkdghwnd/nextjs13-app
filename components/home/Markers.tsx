import React from "react";
import useSWR from "swr";
import { MAP_KEY } from "../../hooks/useMap";
import { STORE_KEY } from "../../hooks/useStores";
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from "../../hooks/useCurrentStore";
import type { ImageIcon, NaverMap } from "../../types/map";
import type { Store } from "../../types/store";
import Marker from "./Marker";

const Markers = () => {
  // SWR 전역공간에 저장해놓았던 데이터 가져오기
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;

  return (
    <>
      {/* 마커를 렌더링하고 그 다음 새로운 마커를 렌더링하면
      새로운 마커로 덮어씌어짐(2개의 이미지가 겹쳐있는 상태가됨) */}
      {stores.map((store) => {
        return (
          <Marker
            map={map} // 필수속성(map 객체)
            coordinates={store.coordinates} // 필수속성(마커 위치좌표(위경도))
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore}
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

// markers.png, markers-selected.png 의 아이콘은 image sprite 이다.
// image sprite : 여러개의 이미지를 하나의 이미지로 합쳐서 관리하는 이미지
export function generateStoreMarkerIcon(
  markerIndex: number, // sprite image 의 index
  isSelected: boolean // 마커가 선택되었는가 아닌가
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? "images/markers-selected.png" : "images/markers.png",
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT), // 표시할 아이콘 사이즈
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), // 몇번째 아이콘을 사용할 것인지
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
