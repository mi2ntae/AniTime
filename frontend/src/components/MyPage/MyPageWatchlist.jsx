import React, { useState, useRef, useEffect } from "react";
import { css, styled } from "styled-components";
import http from "api/commonHttp";
import "intersection-observer";
import DesertionDetail from "components/Desertion/DesertionDetail";
import { useDispatch, useSelector } from "react-redux";
import { setDesertionNo } from "reducer/detailInfo.js";
import AnimalItem from "components/Desertion/AnimalItem";

export default function MyPageWatchlist() {
  const [bookmarkedAnimals, setBookmarkedAnimals] = useState([]);
  const [target, setTarget] = useState(null);
  const page = useRef(0);
  let dispatch = useDispatch();
  let memberNo = useSelector((state) => state.member.memberNo);

  const fetchBookmarkedData = async () => {
    try {
      let response = await http.get(
        `desertion/bookmark/${memberNo}?curpageNo=${page.current}`
      );
      let newData = await response.data;
      setBookmarkedAnimals((prev) => [...prev, ...newData]);
      page.current++;
    } catch (error) {
      console.log("에러메시지: ", error);
    }
  };

  useEffect(() => {
    page.current = 0;
    setBookmarkedAnimals([]);
    fetchBookmarkedData();
  }, []);

  useEffect(() => {
    let observer;
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchBookmarkedData();
        }
      });
    };

    observer = new IntersectionObserver(handleIntersect, { threshold: 1 });
    if (target) {
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  const toggleBookmark = async (desertionNo) => {
    await http
      .post(`desertion/like`, {
        desertionNo: desertionNo,
        generalNo: memberNo,
      })
      .then()
      .catch((err) => console.log("에러"));
  };
  function test(desertionNo) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(setDesertionNo(desertionNo));
  }
  return (
    <WatchListContainer>
      <ListFilterContainer>
        {bookmarkedAnimals.length === 0 && "데이터가 없습니다"}
        <ListContainer>
          {bookmarkedAnimals.map((animal) => (
            <AnimalItemContainer key={animal.desertionNo}>
              <AnimalItem
                animal={animal}
                // AnimalImg onClick
                handleClick={() => test(animal.desertionNo)}
                // BookmarkButton onClick
                handleBookmark={() => toggleBookmark(animal.desertionNo)}
              />
            </AnimalItemContainer>
          ))}
          <Target ref={setTarget} />
        </ListContainer>
      </ListFilterContainer>
      <DetailViewBox>
        <DesertionDetail />
      </DetailViewBox>
    </WatchListContainer>
  );
}

const WatchListContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // margin: auto;
  // margin-top: 64px;
  // padding: 20px;
  // box-sizing: border-box;
  // // width: 100%;
  // max-width: 80%;
  // min-width: 800px;
  // min-height: calc(100vh - 160px);

  display: flex;
  justify-content: space-between;
  /* width: 70%; */
  margin: 20px auto 32px auto;
  //
  box-sizing: border-box;
  width: 100%;
  max-width: 1240px;
  min-width: 800px;
  min-height: calc(100vh - 160px);
  padding: 0 20px;
`;

const ListFilterContainer = styled.div`
  // flex: 1;
  // width: 800px;
  // height: 700px;
  // margin-right: 20px;
  // padding: 20px;

  display: flex;
  margin-right: 40px;
  flex: 2;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
`;

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  justify-items: center;
  justify-content: space-between;
  /* display: flex; */
  flex-grow: 2;
  /* flex-wrap: wrap; */
  margin-top: 10px;
  /* justify-content: flex-start; */
  /* align-content: flex-start; */
  height: 700px;
  overflow-y: scroll;
  text-align: center;
  column-gap: 8px;
  ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const DetailViewBox = styled.div`
  flex: 1;
  margin-top: 10px;
`;

const Target = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  bottom: 5px;
`;

const AnimalItemContainer = styled.div`
  flex: 1 0 30%;
`;
