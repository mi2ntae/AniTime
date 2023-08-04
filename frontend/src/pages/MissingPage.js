import ProfileTab from "components/Profile/ProfileTab";
import React from "react";
import { css, styled } from "styled-components";
import { HorizontalContainer } from "styled/styled";
import animaldata from "components/Missing/animaldata2.json";
import { Link } from "react-router-dom";

export default function Missing() {
  const animals = animaldata.animals;

  return (
    <HorizontalContainer>
      <ListFilterContainer>
        <ListContainer>
          {animals.map((animal, idx) => (
            <AnimalImg key={idx}>
              <DivP>
                <Div>
                  <img
                    src={animal.image}
                    alt="AnimalImage"
                    width="220px"
                    height="220px"
                  />
                </Div>
                <Div2>
                  <Span1>
                    <img src="/icons/Eclipse 33.svg" alt="state" />
                    <Blank></Blank>
                    {animal.processState}
                  </Span1>
                  <Span2>
                    {animal.upkind}/{animal.kind}
                    <span>
                      {animal.sexCd === "암컷" ? (
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
        </ListContainer>
      </ListFilterContainer>
      <DetailViewBox>
        <ProfileTab />
      </DetailViewBox>
      <Link to="/missing/regist">
        <RegistBtn />
      </Link>
    </HorizontalContainer>
  );
}

const ListFilterContainer = styled.div`
  display: flex;
  margin-right: 40px;
  flex: 2;
  margin-top: 48px;
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

const DetailViewBox = styled.div`
  flex: 1;
  margin-top: 80px;
`;

const AnimalImg = styled.div`
  width: 33.33%;
  height: 240px;
  margin-bottom: 28px;
`;

const Span1 = styled.span`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
`;

const Span2 = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: gray;
  // font-weight: bold;
`;

const Div = styled.div`
  align-items: center;
`;
const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;
const DivP = styled.div`
  align-items: center;
`;

const Blank = styled.span`
  margin-right: 5px;
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
