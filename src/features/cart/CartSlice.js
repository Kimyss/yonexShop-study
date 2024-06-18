import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartList:
    [{
      id: "1",
      title: "Arcsaber 11 Pro",
      price: 299000,
      count: 2
    },
    {
      id: "3",
      title: "Aerus Z",
      price: 199000,
      count: 1
    }]
};

// 장바구니 정보를 담을 Slice 만들기
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 수량을 변경하는 리듀서 만들기
    // QUiz: 전달받은 상품의 id값으로 cartList에서 해당 상품을 찾아 수량을 1씩 감소
    increaseCount: (state, action) => {
      const targetItem = state.cartList.find((cartItem) => {
        return cartItem.id === action.payload;
      });
      targetItem.count += 1;
    },
    decreaseCount: (state, { payload: prodcutId }) => {
      const targetItem = state.cartList.find((cartItem) => {
        return cartItem.id === prodcutId;
      });
      targetItem.count -= 1;
    },
    // 상품 객체로 넘겨주면 cartList에 아이템을 추가하는 리듀서 만들기
    // 무조건 추가하는게 아니라: 이미 들어있는 상품이면 수량만 증가시키기
    // 장바구니에 없는 상품이면 새롭게 추가
    addItemToCart:(state, {payload: prodcut})=>{
      console.log(prodcut);
      const targetItem = state.cartList.find(cartItem => cartItem.id === prodcut.id);
      if(targetItem){
        targetItem.count += prodcut.count;
      } else {
        state.cartList.push(prodcut);
        // prodcut 객체니 prodcut만 넣으면 되요
      }
    },
    // 장바구니에서 삭제하는 리듀서 만들기 페이로드, 아이디값만 넘겨서 제거
    removeItemFromCart:(state, {payload: prodcutId})=>{
      // 방법1 리덕스툴킷은 불변성관리 용이 푸쉬 슬라이스등등 바로가능 
      // const targetIndex = state.cartList.findIndex(cartItem => cartItem.id === prodcutId);
      // state.cartList.splice(targetIndex, 1);

      // 방법2 filter() 사용시
      const targetItem = state.cartList.find(cartItem => cartItem.id === prodcutId);
      console.log(prodcutId);
      console.log(current(targetItem));
      const newCartList = state.cartList.filter(cartItem => cartItem.id !== prodcutId);
      state.cartList = newCartList;
    },
  }
});

export const selectcartList = state => state.cart.cartList;

export const { increaseCount, decreaseCount, addItemToCart, removeItemFromCart } = cartSlice.actions;  //액션생성함수 내보내

export default cartSlice.reducer;