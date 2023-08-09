import React from "react";
import { styled } from "styled-components";

export default function AnimalItem({ animal, handleClick, handleBookmark }) {
  return (
    <AnimalImg onClick={handleClick}>
      <AnimalContainer>
        <Img src={animal.thumbnail} alt="AnimalImage" />
        {handleBookmark && (
          <BookmarkButton onClick={handleBookmark}>
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
        )}
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
  );
}

const AnimalImg = styled.div`
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

const Img = styled.img`
  width: 220px;
  min-width: 220px;
  height: 220px;
  border-radius: 8px;
`;
const AnimalContainer = styled.div`
  position: relative;
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
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
