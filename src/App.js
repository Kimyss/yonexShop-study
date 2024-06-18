import styled, { createGlobalStyle } from "styled-components";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { ToastContainer} from "react-toastify";

import Layout from "./pages/Layout";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";



// 글로벌(공통) 스타일 설정
const GlobalStyle = createGlobalStyle`
body{
  box-sizing: border-box;
}
*{
  box-sizing: inherit;  //body아래 모든태그에 강제 상속
}
#root{
  text-align: center;
  /* 실제 앱을 만들땐 하나하나 스타일주세요 */
}

.cursor-pointer{
  cursor: pointer;
}

/* 넘치는 텍스트에 줄임표(...) 만들기 */
.text-ellipsis {
  white-space: nowrap; // 줄바꿈 안함
  overflow: hidden; // 넘친 부분 숨기기
  text-overflow: ellipsis; // 넘친 부분을 어떻게 보일지 지정(ellipsis = 줄임표)
}

`;



// styled(Button)` 이렇게도 사용 가능
// `;

function App() {


  return (
    <>
      {/* 부트스트랩 연습 */}
      {/* 1)리액트 부트스트랩 */}
      {/* <Button variant="primary">Primary</Button> */}

      {/* 2)기존 부트스트랩(기존엔 클래스로 동작) */}
      {/* <button type="button" className ="btn btn-primary">Primary</button> */}

      <GlobalStyle />

      {/* 헤더영역 : 상단 내비게이션바 */}

      {/* Quiz : 헤더를 Layout 컴포넌트로 추출 및 Nested Route 구성해보기 */}

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* index: index route(여기서는 기본 자식 라우트를 의미 위의 path로 접속 했을때 기본으로 보여준다) */}
          <Route index element={<Main />} />
          {/* <Route path="detail" element = {<ProductDetail />} />  */}
          {/* Quiz : 상품별 상세페이지를 여러 개를 라우팅 하려면? URL파라미터 사용
              예:/detail/1로 접속하면 productId에 1이 담기도록 */}
          <Route path="detail/:productId" element={<ProductDetail />} />
          <Route path="cart" element = {<Cart />}/>
          <Route path="*" element = {<div>페이지 존재하지 않아요</div>}/>
          {/* *: 위에서 맵핑되는게 없으면 이페이지 보여줘 */}
        </Route>
      </Routes>

      {/* 토스트 컨테이너 하나로 재사용
          만약 다른 옵션의 토스트 쓰고 싶다면 컨테이너 여러개 사용 */}
      {/* npm install --save react-toastif */}
      {/*  import 'react-toastify/dist/ReactToastify.css'; */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnFocusLoss={false}
        theme="dark"
      />
    </>
  );
}

export default App;


// 패키지 설치 및 StrictMode 제거
// npm install react-bootstrap bootstrap styled-components react-router-dom @reduxjs/toolkit react-redux axios

// Bootstrap
// 레이아웃을 복사 붙여넣기 식으로 편하게 개발 가능한 css, js 라이브러리
// 리액트 용이 따로 있는데 나는 기존 것이 더 익숙하다 싶으면 기존 Bootstrap을 써도 무관
// https://react-bootstrap.netlify.app/

// (React chapter 18 메모)
// 리액트 입문자가 가장 많이 포기하는 구간
// 리덕스 다룰줄 알면 나머지 상태 관리 라이브러리는 비슷하거나 더 쉬움..
// (그 외 MobX, Recoil, Jotai, Zustand 등)
// 리덕스도 리덕스 툴킷이 나오면서 사용 난이도가 쉬워짐!

// Redux: 전역 상태 관리 라이브러리
// 참고로 redux toolkit이라는 라이브러리를 설치할 건데 redux의 개선 버전임
// 사용법(문법)이 좀 더 쉬워짐
// Redux 개발팀에서도 이제 Redux 표준은 RTK를 쓰라고 권장함

// Redux Toolkit and React-Redux 설치하기
// npm install @reduxjs/toolkit react-redux

// 만약에 카운터의 state가 여기저기 컴포넌트에서 공유가 필요하다면 어디에 만들어야할까?
// 공통 부모에 만들고 props로 자식에게 전달해야 됨(state 끌어올리기)

// 근데 Redux를 사용하면 컴포넌트들이 props 없이 state 공유 가능 (Redux 쓰는 가장 큰 이유!)
// Context API는? 단순히 데이터를 공유해주는 기능이고 Redux는 공유 + 상태 관리가 용이

// Redux Store라는 저장소에 state를 저장할 수 있음(=전역 상태)
// <=> 리액트 컴포넌트에 직접 만든 state(=지역 상태)
// 컴포넌트들은 Redux Store에서 직접 state를 꺼내오면 됨
// 대규모 프로젝트에서는 거의 Redux 사용! (구인 시 대부분 Redux 요구)

// Q. Redux 쓰면 편한데 props 쓸 필요가 있을까?
// 1) 외부 라이브러리 설치 필요
// 2) 사용 설정을 위한 반복적인 준비 코드(문법)들이 필요(이런 코드를 보일러 플레이트**라 부름)
// 근데 Redux 쓴다고 해서 모든 state들을 Redux Store 안에 넣는 것은 지양
// (자바스크립트에서도 모든 변수를 전역으로 쓰지 않음, 함수내에서만 쓰는 것은 지역 변수 활용)
// - 공유가 필요없는 state는 X
// - 간단히 끌어올려서 그 부분에서만 쓸 수 있는 state는 X

// (참고) **보일러 플레이트 코드
// 기능을 수행하기 위해 많은 상용구 코드를 작성
// 꼭 필요한 간단한 기능인데, 반복적인 코드를 필요로 하며, 이것이 중복되어 많은 양의 코드를 양산하는 것
// 별 수정 없이 반복적으로 사용되는 코드, 소위 말하는 찍어내는 코드
// Redux가 어려운 점은 이런 보일러 플레이트 코드의 작성이 매우 많음(=> RTK로 넘어오면서 획기적으로 줄어듦)