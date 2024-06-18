import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCount, increaseCount, removeItemFromCart, selectcartList } from "../features/cart/CartSlice";

function Cart() {
  const cartList = useSelector(selectcartList);
  console.log(cartList);
  const dispatch = useDispatch();


  const handleMinus = (id) => {
    dispatch(decreaseCount(id));
  };

  const handlePlus = (id) => {
    dispatch(increaseCount(id))
  }

  const handleRemove = (id)=>{
    dispatch(removeItemFromCart(id));
  }

  const formatter = new Intl.NumberFormat('ko-KR');

  return (
    <>
      {/* 표 레이아웃 만들기 그냥은 안 예쁘니 좀 더 편리하게 reactbootStrap 사용해도 좋아 */}
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
          <td>1</td>
          <td>라켓</td>
          <td>2</td>
          <td>199,000원</td>
        </tr> */}
          {/* Quiz: cartList 반복렌더링 및 데이터바인딩 */}
          {cartList.map((cartProduct, index) => {
            return (
              <tr key={cartProduct.id}>
                <td>{index + 1}</td>
                <td>{cartProduct.title}</td>
                <td>
                  <button onClick={() => handleMinus(cartProduct.id)}>
                    {/* <button onClick={() => dispatch(decreaseCount(cartProduct.id))}> */}
                    -
                  </button>
                  {cartProduct.count}
                  <button onClick={() => handlePlus(cartProduct.id)}>
                    {/* <button onClick={() => dispatch(increaseCount(cartProduct.id))}> */}
                    +
                  </button>
                  {/* 전역상태 버튼 바꾸려면 리듀서 필요하니 리듀서로 넘어가 */}
                </td>
                <td>{formatter.format(cartProduct.price * cartProduct.count)}원</td>
                <td>
                  {/* <button onClick={() => dispatch(removeItemFromCart(cartProduct.id))}> */}
                  <button onClick={ ()=> handleRemove(cartProduct.id)}>
                    X
                  </button>
                </td>
              </tr>
            )
          })}

          {/* 합계 구하기  */}
          <tr>
            <th>합계</th>
            <td></td>
            <td></td>
            <th>
              {formatter.format(cartList.reduce((prev, cartItem)=>{
                console.log(prev);  //주의: 초기값이 없으면 배열 인덱스 0이 초기값으로 사용됨 초기값없으면 객체로나와요 객체 + 숫자 = NaN
                return prev + (cartItem.price * cartItem.count);
              }, 0))}원
            </th>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Cart;