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

  let sortType = useSelector((state) => state.sortInfo.sortType);
  sort.current = sortType;

  const fetchData = async () => {
    try {
      let response = await http.get(
        `desertion?generalNo=0&kindType=${kind.current}&genderType=${gender.current}&sortType=${sort.current}&curPageNo=${page.current}`
      );
      const newData = await response.data;
      setAnimals((prev) => [...prev, ...newData]);
      page.current++;
    } catch (error) {
      console.log("에러메시지: ", error);
    }
  };

  useEffect(() => {
    setAnimals([]);
    page.current = 0;
    fetchData();
  }, [kindType, genderType, sortType]);

  useEffect(() => {
    let observer;
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("success");
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

  const toggleBookmark = (desertionNo) => {
    setAnimals((prevAnimals) =>
      prevAnimals.map((prevAnimal) =>
        prevAnimal.desertionNo === desertionNo
          ? { ...prevAnimal, isBookmarked: !prevAnimal.isBookmarked }
          : prevAnimal
      )
    );
  };

  return (
    <HorizontalContainer>
      <ListFilterContainer>
        <FiltersContainer>
          <Filter></Filter>
          <Sort></Sort>
        </FiltersContainer>
        <ListContainer>
          {animals.map((animal, idx) => (
            <AnimalImg
              key={idx}
              onClick={() => {
                dispatch(setDesertionNo(animal.desertionNo));
              }}
            >
              <AnimalContainer>
                <Img src={animal.thumbnail} alt="AnimalImage" />
                <BookmarkButton
                  onClick={() => toggleBookmark(animal.desertionNo)}
                >
                  {animal.isBookmarked ? (
                    <FilledHeartIcon
                      src="/icons/btn_favorite_active.svg"
                      alt="Bookmark"
                    />
                  ) : (
                    <EmptyHeartIcon
                      src="/icons/btn_favorite_inactive.svg"
                      alt="Bookmark"
                    />
                  )}
                </BookmarkButton>
              </AnimalContainer>
              <DivP>
                <Div2>
                  <Span1>
                    <img src="/icons/Eclipse 33.svg" alt="state" />
                    <Blank></Blank>
                    {animal.processState}
                  </Span1>
                  <Span2>
                    {animal.category}/{animal.detailKind}
                    <span>
                      {animal.sexcd === "F" ? (
                        <img src="/icons/ic_female.svg" alt="female" />
                      ) : (
                        <img src="/icons/ic_male.svg" alt="male" />
                      )}
                    </span>
                  </Span2>
                </Div2>
              </DivP>
            </AnimalImg>
          ))}
          <Target ref={setTarget} />
        </ListContainer>
      </ListFilterContainer>
      <DetailViewBox>
        <DesertionDetail />
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
  align-items: end;
`;

const ListContainer = styled.div`
  display: flex;
  flex-grow: 2;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  height: 700px;
  overflow-y: scroll;
  text-align: center;
  ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const FiltersContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: right;
`;

const DetailViewBox = styled.div`
  flex: 1;
  margin-top: 48px;
`;

const AnimalImg = styled.div`
  width: 33.33%;
  height: 240px;
  margin-bottom: 28px;
`;

const Span1 = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

const Span2 = styled.span`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: gray;
  // font-weight: bold;
`;

// const Div = styled.div`
//   align-items: center;
// `;
const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
const DivP = styled.div`
  align-items: center;
`;

const Blank = styled.span`
  margin-right: 5px;
`;

const Target = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  bottom: 5px;
`;

const Img = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 8px;
`;
const AnimalContainer = styled.div`
  position: relative;
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 10px;
  right: 28px;
  width: 35px;
  height: 35px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;
const EmptyHeartIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const FilledHeartIcon = styled.img`
  width: 32px;
  height: 32px;
`;
