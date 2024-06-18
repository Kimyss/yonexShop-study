import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Modal, Nav, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, getAllProducts, getSelectedProduct, selectSelectproductList } from "../features/product/productSlice";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import TabContents from "../components/TabContents";
import { addItemToCart } from "../features/cart/CartSlice";

// 스타일드 컴포넌트를 이용한 애니메이션 속성 적용 자동완성이 안되네
const highlight = keyframes`
  from{background-color:#cff4fc}    //  === 0%
  50%{background-color:#484949}
  to{background-color:#cff4fc}      //  === 100%
`;

const StyledAlert = styled(Alert)`
  animation: ${highlight} 2s linear infinite;
  /* 2s 동안 라--이너 일정하게 인피니트 무-한하게-- */
`

function ProductDetail() {

  const { productId } = useParams();
  // console.log(productId);

  const dispatch = useDispatch();

  const product = useSelector(selectSelectproductList);
  // console.log(product);
  

  const formatter = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })

  const [alert, setAlert] = useState(true);
  const [orderCount, setOrderCount] = useState(1);  //주문수량상태
  const [currentTabIndex, setCurrentTabIndex] = useState(0);  //현재 탭 상태
  const [currentTab, setCurrentTab] = useState('detail'); //
  const [showModal, setShowModal] = useState(false);    //모달상태
  const handleCloseModal = ()=>{
    setShowModal(false);
  };
  const handleOpenModal = ()=>{
    setShowModal(true);
  };


  const navigatge = useNavigate();

  // 처음 마운트 됐을 때 서버에 상품 id를 이용하여 데이터를 요청하고 
  // 그 결과를 리덕스 스토어에 저장
  useEffect(() => {
    // 서버에 특정 상품의 데이터 요청 Main.jsx에서는 .then. catch사용
    // 여기선 async사용
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/kimyss/db-shop/products/${productId}`)
        // 프로미스객체 ↑
        // console.log(response);
        dispatch(getSelectedProduct(response.data));
      } catch (err) {
        console.error(err);
      }
    }
    fetchProductById();
    // 상품 상세 페이지가 언마운트 될 때 전역 초기화 
    // 리듀서부터기기
    return () => {
      dispatch(clearSelectedProduct())
    }
  }, []);

  useEffect(() => {
    // 타이머설정을 위한 useEffet, 가독성을 위해 새로 만들어주는거 좋아요
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000);
    // 불필요하게 타이머 계속 쌓이는 것을 정리. timeout함수 사용시 세트처럼생각해
    return () => {
      clearTimeout(timeout);
    };
  },[]);

  // 상품 상세페이지에 들어갔을때 해당 상품이 존재할때만 id값을 localStorage에 추가
  useEffect(() => {
    console.log(product);
      if(!product) return;

      let recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];     //getItem 가져오는거 setItem 넣는거
      //  null일때 기본값으로 빈배열 넣어줘
    
      // id값을 넣기 전에 기존배열에 존재하는지 검사하거나
      // 아니면 일단 배열에 넣고 set 자료형을 이용하여 중복제거
      recentProducts.push(productId);   //
      // recentProducts.unshift(productId);   //최근에 선택한 순으로 상품정렬 최근에 새로 넣은 요소 index 0번으로
      console.log(recentProducts);
      recentProducts = new Set(recentProducts);  // 배열을 Set 객체로 만듦(중복요소가 제거됨)
      recentProducts = [...recentProducts];      // Set 객체를 다시 배열로 변환
      localStorage.setItem('recentProducts', JSON.stringify(recentProducts));   //JSON문자열로 저장
  }, [product]);

  const handleChangeOrderCount = (e) => {
    // 숫자 외 입력 시 유효성 검사 후 경고 토스트 띄우기
    if (isNaN(e.target.value)) {
      toast.error('💯숫자만 입력하세요');
      return;
    }
    setOrderCount(Number(e.target.value));
  };

  const handleClickCart = (id)=>{
    // 상품 정보 + 주문수량도 같이 전달 = 객체형태로 넘기면 됩니다. 객체형태는 데이터의 묶음
    // dispatch(addItemToCart({
    //   id: product.id,
    //   title: product.title, 
    //   price: product.price, 
    //   count: orderCount
    // }));

    // 확장성을 고려하여 전체를 넘기고 다른 수정사항등이 있으면 바로 수정가능
    dispatch(addItemToCart({
      ...product,
      count: orderCount
    }));
    
    handleOpenModal();
    
  };

  // if(!product){
  //   // 프로덕트가 없을때는 널을 리턴하겠다
  //   return null;
  // }




  return (
    <Container className="pt-5">
      {/* Alert을 띄우고 3초뒤에 사라지게 만들어 */}
      {/* 힌트: 처음 렌더링 됐을때 setTimeout로 타이머설정 + 조건부렌더링 */}
      {alert && (
        <StyledAlert variant="info" onClose={() => setAlert(false)} dismissible>
          현재 000명이 보고 있어요!
        </StyledAlert>
      )}
      <Row>
        <Col md={6}>
          <img src={product?.imagePath} width="80%" />
        </Col>

        <Col md={6}>
          <h4>{product?.title}</h4>
          <p>{product?.content}</p>
          <p>{formatter?.format(product?.price)}원</p>

          <Col md={4} className="m-auto mb-3">
            {/* Quiz: text input을 제어 컴포넌트로 사용자 입력값이 들어가도록  */}
            <Form.Control type="text" value={orderCount} onChange={handleChangeOrderCount} />
          </Col>

          <Button variant="primary">주문하기</Button>
          <Button variant="warning" onClick={handleClickCart}>장바구니</Button>
        </Col>
      </Row>
      {/* 탭버튼 UI react-bootstrap nav검색요망*/}
      {/* defaultActiveKey: 기본으로 active할 탭, active 클래스가 들어가있음 */}
      <Nav variant="tabs" defaultActiveKey="link-0" className="my-3">
        <Nav.Item>
          {/* <Nav.Link eventKey="link-0" onClick={() => setCurrentTabIndex(0)}>상세정보</Nav.Link> */}
          <Nav.Link eventKey="link-0" onClick={() => setCurrentTab('detail')}>상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-1" onClick={() => setCurrentTabIndex(1)}>리뷰</Nav.Link> */}
          <Nav.Link eventKey="link-0" onClick={() => setCurrentTab('review')}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-2" onClick={() => setCurrentTabIndex(2)}>Q&amp;A</Nav.Link> */}
          <Nav.Link eventKey="link-0" onClick={() => setCurrentTab('qa')}>Q&amp;A</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-3" onClick={() => setCurrentTabIndex(3)}>반품/교환정보</Nav.Link> */}
          <Nav.Link eventKey="link-0" onClick={() => setCurrentTab('exchange')}>반품/교환정보</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 탭의 내용을 다 만들어 놓고 조건부 렌더링하면 됨 */}
      {/* 방법1: 삼항연산자 이용 (가독성 나빠요) */}
      {/* {currentTabIndex === 0
        ? <div>탭 내용1</div>
        : currentTabIndex === 1
          ? <div>탭 내용2</div>
          : currentTabIndex === 2
            ? <div>탭 내용3</div>
            : currentTabIndex === 3
              ? <div>탭 내용4</div> */}
              {/* : null} */}

      {/* 방법2: 컴포넌트로 추출  */}
      <TabContents currentTabIndex = {currentTabIndex} />

      {/* 방법3 (살짝편법): 배열이나 객체 형태로 만들어서 조건부 렌더링 */}
      {/* 배열 형태 */}
      {[
        <div>상세정보~~~~</div>,
        <div>리뷰~~~~</div>,
        <div>큐앤에이~~</div>,
        <div>반품교환~~</div>
      ][currentTabIndex]}

      {/* 객체 형태 */}
      {{
        'detail': <div>디테일</div>,
        'review': <div>리뷰</div>,
        'qa': <div>큐에이</div>,
        'exchange': <div>익스첸지</div>
      } [currentTab]}
      {/* currentTab.detail 이건 커렌트탭에 디테일이잇는지확인하는거(?) */}

      {/* 장바구니 모달 => 추후 범용적 모달로 만들고 구체화하여 사용하는 것이 좋음*/}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>YONEX 알림창🏸</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          장바구니에 상품을 담았습니다. <br />
          장바구니로 이동하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            취소
          </Button>
          <Button variant="primary" onClick={()=> navigatge('/cart')}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>
  );
};

export default ProductDetail;