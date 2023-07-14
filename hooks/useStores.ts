import { useCallback } from "react";
import { Store } from "../types/store";
import { mutate } from "swr";

export const STORE_KEY = "/stores";

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    // Store 데이터를 인자로 받아 전역상태로 저장함

    // SWR
    // npm i swr
    // react query에 비해 훨씬 진입 장벽이 낮고
    // fetch 속도가 빠르며 코드가 경량화 되어 있습니다.
    // 간단한 프로젝트를 만드는 경우에는 SWR이 가장 좋은 선택일 수도 있습니다.

    // mutate : SWR의 함수
    // STORE_KEY(문자열)를 key로 하는 공간에
    // 매장 데이터를 전역으로 저장해두겠다는 뜻
    mutate(STORE_KEY, stores);
  }, []);

  return {
    initializeStores,
  };
};
export default useStores;
