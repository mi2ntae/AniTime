import React, { useRef, useState, useEffect } from "react";
import { css, styled } from "styled-components";
import { HorizontalContainer } from "styled/styled";
import Filter from "../components/Desertion/Filter";
import Sort from "components/Desertion/Sort";
import http from "api/commonHttp";
import "intersection-observer";
import DesertionDetail from "components/Desertion/DesertionDetail";
import { useDispatch, useSelector } from "react-redux";
import { setDesertionNo } from "reducer/detailInfo.js";
import AnimalItem from "components/Desertion/AnimalItem";

export default function Desertion() {
  const [animals, setAnimals] = useState([]);
  const [target, setTarget] = useState(null);
  const page = useRef(0);
  const kind = useRef(0);
  const gender = useRef(0);
  const sort = useRef(0);
  let dispatch = useDispatch();

  let kindType = useSelector((state) => state.filterInfo.kindType);
  kind.current = kindType;

  let genderType = useSelector((state) => state.filterInfo.genderType);
  gender.current = genderType;
  let jwttoken = useSelector((state) => state.member.token);
  let sortType = useSelector((state) => state.sortInfo.sortType);
  sort.current = sortType;

  let memberNo = useSelector((state) => state.member.memberNo);

  const fetchData = async () => {
    try {
      page.current++;
      let response = await http.get(
        `desertion?generalNo=${memberNo}&kindType=${kind.current}&genderType=${gender.current}&sortType=${sort.current}&curPageNo=${page.current}`
      );
      let newData = await response.data;
      setAnimals((prev) => [...prev, ...newData]);
    } catch (error) {
      console.log("에러메시지: ", error);
    }
  };

  useEffect(() => {
    let observer;
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchData();
        }
      });
    };

    observer = new IntersectionObserver(handleIntersect, { threshold: 1 });
    if (target) {
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    setAnimals([]);
    page.current = -1;
    fetchData();
  }, [kindType, genderType, sortType]);

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
    <HorizontalContainer>
      <ListFilterContainer>
        <FiltersContainer>
          <Filter></Filter>
          <Sort></Sort>
        </FiltersContainer>
        {animals.length === 0 && "데이터가 없습니다"}
        <ListContainer>
          {animals.map((animal) => (
            <AnimalItem
              key={animal.desertionNo}
              animal={animal}
              // AnimalImg onClick
              handleClick={() => test(animal.desertionNo)}
              // BookmarkButton onClick
              handleBookmark={() => toggleBookmark(animal.desertionNo)}
            />
          ))}
          <Target ref={setTarget} />
        </ListContainer>
      </ListFilterContainer>
      <DetailViewBox>
        <DesertionDetail readOnly={!jwttoken} category={0} />
      </DetailViewBox>
    </HorizontalContainer>
  );
}

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
  flex-grow: 2;
  height: 700px;
  overflow-y: scroll;
  text-align: center;
  gap: 8px;
  ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const FiltersContainer = styled.div`
  display: flex;
  flex: 0 0 65px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: right;
`;

const DetailViewBox = styled.div`
  flex: 1;
  margin-top: 55px;
`;

const Target = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  bottom: 5px;
`;
