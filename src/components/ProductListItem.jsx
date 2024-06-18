import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 방법1: 스타일드 컴포넌트로 스타일 확장 className = ''

// 방법2 : 
const StyledCol = styled(Col)`
  cursor: pointer;
`

function ProductListItem(props) {
  // console.log(props);  // 각각의 객체리스트 찍혀

  const { product :{id, title, price, imagePath} } = props;
  
  // 숫자 포맷 적용
  const formatter = new Intl.NumberFormat('ko-KR', {style : 'currency', currency: 'KRW'});

  const navigate = useNavigate();
  return (
    <>
      <StyledCol md={4} sm={6} >
        <img src={imagePath} width="80%"
          onClick={() => 
          {navigate(`/detail/${id}`);
          }} />
        <h4>{title}</h4>
        <p>{formatter.format(price)}원</p>
      </StyledCol>
    </>
  );
};

export default ProductListItem;