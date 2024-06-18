import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoreProducts } from "../../api/productAPI";

const initialState = {
  productList: [],
  selectedProduct: null,
  status: 'idle',  //API 요청 상태. 문자값이기에 정의하기 나름이에요
};

// thunk를 이용한 비동기 작업 처리하기 ( Toolkit 내장되어있어요 )
// thunk 미들웨어: 액션을 디스패치 했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업을 실행
// 액션과 리듀서 중간에 끼어있는 중간자 역할, 액션 -> (미들웨어) -> 리듀서
// 주로 API 요청 같은 비동기 작업을 수행할 때 사용

// thunk를 이용한 비동기 작업 처리 시 이점? 
// 1) API 요청에 대한 상태 관리 쉽게 가능(요청 시작-로딩중, 요청 성공 또는 실패 시 로딩이 끝났음을 쉽게 관리)
// 2) 요청이 성공하면 응답에 대한 상태 관리, 실패하면 에러에 대한 상태 관리가 쉬움

// createAsyncThunk()는 비동기 작업을 처리하는 액션 생성 함수를 반환함 createAsyncThunk(액션타입, 비동기작업(함수), 추가옵션)
export const getMoreProductsAsync = createAsyncThunk(
  'product/getMoreProductsAsync',     //첫번째 인자값: 액션타입
  async () =>{  //두번째 인자값 : 액션이 발생 했을 때 실행할 비동기작업(주로 api요청)
    const result = await getMoreProducts(); //비동기 함수니까 await로 기다려주고 reult에 담아. 비동기함수 실행시 pending 상태.
    return result;    //값을 반환해야 fulfield (성공) 상태로 바뀌고 action.payload에 담겨 리듀서 함수로 전달됨
  },
  // 세번째 인자값: 추가 옵션(비동기 처리 전 취소, 비동기 실행 중 취소 등의 옵션)
);

// 상품 정보를 담을 slice 만들기
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      console.log(action.payload);
      state.productList = action.payload;
    },
    getSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct : (state)=>{
      state.selectedProduct = null;
    },
    addMoreProducts : (state,action)=>{
      state.productList.push(...action.payload);
      // 여기서의 state는 애초에 복사본이라서 배열카피본 만들지 않고 push 하여도 가능
    }
  },
  // thunk를 이용한 비동기적인 작업에는 extraReducers를 사용
  extraReducers: (builder) => {
    builder
      .addCase(getMoreProductsAsync.pending, (state) => { // pending 상태 일 때 동작할 리듀서
      state.status = 'loading';
      })
      .addCase(getMoreProductsAsync.fulfilled, (state, action) => { // fulfilled 상태 일 때 동작할 리듀서
        state.status = 'idle';    //success, complete 등 작명나름
        state.productList.push(...action.payload);
      })
      .addCase(getMoreProductsAsync.rejected, (state) => { // rejected 상태 일 때 동작할 리듀서
      state.status = 'fail';
      })
  }
});

// 액션 생성 함수
export const {
  getAllProducts,
  getSelectedProduct, 
  clearSelectedProduct,
  addMoreProducts
} = productSlice.actions;

// 선택자 함수
export const selectproductList = (state) => state.product.productList;
// 위에 getAllProducts: (state, action) state랑 다름

export const selectSelectproductList = (state) => state.product.selectedProduct;

export const selectStatus =(state) =>state.product.status;



// 리듀서 함수들
export default productSlice.reducer;
