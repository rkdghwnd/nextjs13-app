/** https://nextjs.org/docs/api-reference/next/image */
import type { NextPage } from "next";
import Image from "next/image";
import LegacyImage from "next/legacy/image";
import example from "/public/example.jpg";

// 일반 img 태그
// loading="lazy" 로 레이지 로딩 기능(화면에 보였을때 다운로드)
// 너비 높이 명시하지 않아도 됨
// next/image에 비해 이미지 용량 최적화가 안됨

// next/image 태그
// 1. .webp 로 다운 받아 용량 최적화, quality 속성으로 용량 조절가능(기본값 75)
// 2. next/image 는 너비와 높이를 기반으로 빌드타임에 이미지를 최적화함
// 3. 스트링경로(내부링크,외부링크 둘다)는 width height 속성이 정해져야함
// 3. static하게 import해서 경로를 가져오는경우 width heigth를 자동으로 계산하기 때문에 속성 않넣어도됨
// 4. placeholder="blur" -> 이미지가 다운로드 되는동안 blur 이미지가 자동으로 적용됨(배포환경에서 확인가능)
// 5. lazy loading 기본 적용

// next/image 를 적용할때 이미지의 너비 높이를 모르는 경우 -> fill 속성 추가
// fill 속성 : 이미지의 사이즈가 부모에 의해 결정됨
// ex)
// 부모 스타일에 postion:absolute or relative or fixed 설정 후
// 부모의 사이즈(width height) 설정  + next/image에 fill 속성추가
// -> 부모 사이즈에 맞춰 이미지 생성됨
// + v13에서는 레이아웃 속성이 fill만 존재함

// 사진이 납작해 보이는 경우 -> style={{ objectFit: 'cover' }}
// 원본의 비율을 유지해줌 (object-fit css 속성 검색)

// next/image 에서 외부 링크를 사용할 수 없다는 에러 메시지 뜨는 경우
// next.js 자체에서 보안을 위해 허용된 도메인만 접근할 수 있게 막아둔 것
// next.config.js 에서 설정(images:{domain: [도메인]})
// https://nextjs.org/docs/pages/api-reference/components/image#domains

// LegacyImage : v12 까지의 next/image
// LegacyImage는 생성하면 브라우저에서 img 태그의 부모로 span태그가 생성됨(v13은 img만)
// span 태그를 통해 img의 레이아웃을 스타일링하는 구조 -> 웹 접근성을 해칠수도 있음
// LegacyImage는 layout 속성에
// intrinsic, fill, fixed, responsive 등의 속성을 반드시 지정해야함

// intrinsic: 지정된 이미지 사이즈로 렌더링 하되 화면이 이미지보다 작아졌을때
// 화면에 맞춰 리사이징 함, layout shift(레이아웃이 예기치않게 변화하는 현상)이 없음
// fixed: 화면이 리사이징 되어도 이미지 크기가 고정됨
// responsive: intrinsic의 특징 + 화면이 커질때도 리사이징됨
// fill : 이미지의 사이즈가 부모에 의해 결정됨
// LegacyImage는 objectFit="cover" 속성도 존재함

const Images: NextPage = () => {
  return (
    <main>
      {/* loading check */}
      {/*<section style={{ height: '500vh' }}>long long content</section>*/}
      <hr style={{ margin: "32px 0" }} />
      <h1>img tag</h1>
      <figure>
        <img
          src="https://inflearn-nextjs.vercel.app/example.jpg"
          alt="example"
          width={500}
          height={100}
          //  https://web.dev/browser-level-image-lazy-loading/
          // loading="lazy" -> 화면에 이미지가 보일때 다운로드함
        />
        <figcaption>example img</figcaption>
      </figure>

      <hr style={{ margin: "32px 0" }} />

      <h1>next/image</h1>
      <figure>
        <Image
          src={example}
          alt="v13 image"
          // width={500}
          // height={100}
          // placeholder="blur"
        />
        <figcaption>v13 image(import 해서 가져오기)</figcaption>
      </figure>

      <figure>
        <Image
          src="https://inflearn-nextjs.vercel.app/example.jpg"
          alt="v13 image"
          width={500}
          height={100}
        />
        <figcaption>v13 image(외부경로)</figcaption>
      </figure>

      {/* ERROR */}
      {/* <figure>
        <Image src="/example.jpg" alt="v13 image" />
        <figcaption>v13 image</figcaption>
      </figure> */}
      {/* -> next/image는 스트링경로로 받아오려면 width height 속성이 있어야함 */}

      <figure style={{ position: "relative", width: "500px", height: "100px" }}>
        <Image
          src="https://inflearn-nextjs.vercel.app/example.jpg"
          alt="v13 fill"
          fill
          style={{ objectFit: "cover" }}
        />
      </figure>

      <hr style={{ margin: "32px 0" }} />

      <h1>next/legacy/image</h1>
      {/** statically import */}
      <figure>
        <LegacyImage src={example} alt="example image" />
        <figcaption>intrinsic static image</figcaption>
      </figure>
      {/* ERROR */}
      {/*<figure>*/}
      {/*  <Image src="/example.jpg" alt="example" />*/}
      {/*  <figcaption>example image</figcaption>*/}
      {/*</figure>*/}
      {/** path string */}

      <figure>
        <LegacyImage
          src="/example.jpg"
          alt="intrinsic image"
          width={500}
          height={100}
        />
        <figcaption>intrinsic remote image</figcaption>
      </figure>

      <figure>
        <LegacyImage
          src={example}
          alt="fixed image"
          layout="fixed"
          width={500}
          height={100}
        />
        <figcaption>fixed image</figcaption>
      </figure>

      <figure>
        <LegacyImage
          src={example}
          alt="responsive image"
          layout="responsive"
          width={500}
          height={100}
        />
        <figcaption>responsive image</figcaption>
      </figure>

      <figure>
        <div style={{ width: 500, height: 100, position: "relative" }}>
          <LegacyImage
            src="/example.jpg"
            alt="fill image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <figcaption>fill image</figcaption>
      </figure>
      <hr style={{ margin: "32px 0" }} />
    </main>
  );
};

export default Images;
