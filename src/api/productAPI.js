// 상품과 관련된 API요청 함수들을 정의
// 가독성도 좋고 여러곳에서 재사용할 수 있도록 함수로 만듦

import axios from "axios";

// 상품 목록 조회

// 특정 상품 조회

// 상품 더보기 
export const getMoreProducts = async () =>{
  // API는 항상 에러 발생우려가 때문에 try/catch 요망.
  try {
    const response = await axios.get('https://my-json-server.typicode.com/kimyss/db-shop/more-products');

    if(response.status === 200){    //응답 코드가 200 OK일때만 결과를 리턴
      return response.data;
    } else {  //서버가 에러코드 전송시
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {   // 서버가 죽었거나 인터넷이 끊겼거나, URL잘못됐을 우려
    console.error(error);
  }

}