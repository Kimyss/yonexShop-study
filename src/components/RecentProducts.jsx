import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RecentProductWrapper = styled(Card)`
  position: fixed;
  top: 100px;
  right: 20px;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.25);
  width: 8rem;
`;

function RecentProducts(props) {
  const { productList } = props;

  const recentProducts = JSON.parse(localStorage.getItem('recentProducts'));

  const navigate = useNavigate();

  // 최근 본 상품이 없을 때는 렌더링 막기
  if (!recentProducts) return null;

  // id값으로 최근 본 상품들만 찾아서 배열로 만들기
  const recentProductList = recentProducts.map((id) => {
    return productList.find((product) => {
      return product.id === id;
    });
  });
  console.log(recentProductList);
  return (
    // 일단 부트 스트랩 Card에서 긁어 온 후 <RecentProductWrapper> 작업
    <RecentProductWrapper>
      <Card.Header>최근 본 상품📦</Card.Header>
      <ListGroup variant="flush">
        {recentProductList.slice(0, 3).map((product) => {
          return (
            <React.Fragment key = {product.id}>
              <img 
                  src={product.imagePath} 
                  alt={product.title} 
                  onClick={()=>navigate(`detail/${product.id}`)} 
                  className="cursor-pointer" />
              <ListGroup.Item className="text-ellipsis">{product.title}</ListGroup.Item>
            </React.Fragment>)
        })}
      </ListGroup>
      {recentProductList.length > 3 &&
        <>
          <Card.Body>
            <Card.Link href="#">더보기</Card.Link>
          </Card.Body>
        </>
      }
      <ListGroup variant="flush">
        <Card.Link href="#">위로가기⬆</Card.Link>
      </ListGroup>
    </RecentProductWrapper>
  );
};

export default RecentProducts;