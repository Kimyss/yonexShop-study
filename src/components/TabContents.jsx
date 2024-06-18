function TabContents(props) {
  const {currentTabIndex} = props;
  // function TabContents 자바스크립트 함수니까 이곳 return문 밖에서는
  // 자바스크립트 코드구현 가능

  let tabContent;
  if(currentTabIndex ===0){
    tabContent = <div>상세정보 내용</div>;
  }else if (currentTabIndex == 1){
    tabContent = <div>리뷰 내용</div>;
  }else if (currentTabIndex == 2){
    tabContent = <div>큐앤에이내용</div>;
  }else if (currentTabIndex == 3){
    tabContent = <div>반품/교환내용</div>;
  }
  return (
    <>
    {tabContent}
    </>
  );
};

export default TabContents;