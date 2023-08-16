import React, { useRef, useState, useEffect } from "react";
import { css, styled } from "styled-components";
import { HorizontalContainer } from "styled/styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setComponent,
  setDesertionNo,
  setProfileNo,
} from "reducer/detailInfo.js";
import http from "api/commonHttp";
import "intersection-observer";
import ProfileTab from "components/Profile/ProfileTab";
import AnimalItem from "components/Desertion/AnimalItem";

export default function Missing() {
  const [animals, setAnimals] = useState([]);
  const [target, setTarget] = useState(null);
  const page = useRef(0);
  let dispatch = useDispatch();
  let profileNo = useSelector((state) => state.detailInfo.profileNo);
  let isProfile = useSelector((state) => state.detailInfo.isProfile);

  const fetchData = async () => {
    // console.log(profileNo, page.current);
    if (profileNo === 0) return;
    try {
      page.current++;
      let response = await http.get(
        `recommand/${profileNo}?curPageNo=${page.current}`
      );
      let newData = await response.data;
      // // console.log("recommand result");
      // // console.log("newData");
      setAnimals((prev) => [...prev, ...newData]);
    } catch (error) {
      // console.log("에러메시지: ", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setProfileNo(0));
      dispatch(setDesertionNo(0));
    };
  }, []);

  useEffect(() => {
    setAnimals([]);
    page.current = -1;
    fetchData();
  }, [profileNo]);

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

  return (
    <HorizontalContainer>
      <ListFilterContainer>
        {animals.length === 0 && "프로필과 유사한 보호동물이 없습니다"}
        <ListContainer>
          {animals.map((animal) => (
            <AnimalItem
              key={animal.desertionNo}
              animal={animal}
              // AnimalImg onClick
              handleClick={() => {
                dispatch(setComponent(false));
                dispatch(setDesertionNo(animal.desertionNo));
              }}
            />
          ))}
          <Target ref={setTarget} />
        </ListContainer>
      </ListFilterContainer>
      <DetailViewBox>
        <ProfileTab />
      </DetailViewBox>
      <Link to="/missing/write">
        <RegistBtn />
      </Link>
    </HorizontalContainer>
  );
}

const ListFilterContainer = styled.div`
  display: flex;
  margin-right: 40px;
  flex: 2;
  margin-top: 55px;
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

const AnimalList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  justify-items: center;
  justify-content: space-between;
`;

const DetailViewBox = styled.div`
  flex: 1;
  /* margin-top: 48px; */
`;

const Target = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  bottom: 5px;
`;

const RegistBtn = styled.div`
  position: fixed;
  top: 80%;
  left: 85%;
  background-color: var(--primary, #3994f0);
  filter: drop-shadow(0px 4px 13px rgba(0, 0, 0, 0.25));
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-image: url("/plus_regist_btn.svg");
  background-repeat: no-repeat;
  background-position: center;
`;
