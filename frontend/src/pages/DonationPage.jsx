import React, { useEffect, useState } from "react";
import Payment from "components/Donation/Payment";
import { MainContainer } from "styled/styled";
import http from "api/commonHttp";
import { keyframes, styled } from "styled-components";
import { useNavigate } from "react-router";
import SelectSearchType from "components/Donation/SelectSearchType";

export default function DonationPage() {
  const [searchType, setSearchType] = useState("title");
  const [searchInput, setSearchInput] = useState("");
  const [contents, setContents] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const navigate = useNavigate();

  const [inputFocus, setInputFocus] = useState(false);
  const handleFocus = () => {
    setInputFocus(true);
  };
  const handleBlur = () => {
    setInputFocus(false);
  };

  // 셀렉박스 관련
  const searchTypeData = ["제목", "보호소명"];

  useEffect(() => {
    http.get(`donation`).then((response) => {
      console.log(response.data.content);
      setContents(response.data.content);
    });
  }, []);

  const handleSearch = (event) => {
    console.log(searchType);
    console.log(searchInput);
    event.preventDefault();
    http
      .get(
        `donation?searchType=${searchType}&keyword=${searchInput}&pageNo=${curPage}`
      )
      .then((response) => {
        console.log(response.data.content);
        setContents(response.data.content);
      });
  };

  return (
    <MainContainer>
      <form
        onSubmit={handleSearch}
        style={{
          // boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          marginTop: "64px",
        }}
      >
        <SearchInput
          style={
            inputFocus
              ? { border: "1px solid #3994f0" }
              : { border: "1px solid #caced3" }
          }
        >
          <SelectSearchType
            items={searchTypeData}
            placeholder="제목"
            setValue={setSearchType}
          />
          <img src="search_line.png" />
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            style={{
              border: 0,
              outline: "none",
              height: "100%",
              boxSizing: "border-box",
              width: "100%",
              maxWidth: "464px",
              fontSize: "16px",
              fontWeight: 400,
              color: "#35383b",
              paddingLeft: "24px",
              "::placeholder": {
                color: "#A7AEB4",
              },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="검색어를 입력해주세요."
          />
        </SearchInput>
        <SearchBtn type="submit">
          검색&nbsp;
          <img
            src="/icons/ic_search.svg"
            alt="Error"
            style={{ width: "23%" }}
          />
        </SearchBtn>
      </form>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {contents.map((content, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                onClick={() => {
                  navigate(`${content.boardNo}`);
                }}
                style={{
                  background: `url(${content.thumbnail}) no-repeat center/cover`,
                  aspectRatio: "1/1",
                  borderRadius: "12px",
                  backgroundSize: "cover",
                }}
              />
              {/* <Image src={content.thumbnail} /> */}
              <div
                style={{
                  color: "var(--gray-scale-dark-gray-2, #1A1A1A)",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "12px",
                  height: "56px",
                }}
                onClick={() => {
                  navigate(`${content.boardNo}`);
                }}
              >
                {content.title.length < 26
                  ? content.title
                  : content.title.slice(0, 24) + "..."}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <img src="/icons/ic_location2.svg" />
                  <span
                    style={{
                      color: "var(--grey-1, #CACED3)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {content.shelter}
                  </span>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "20px",
                    backgroundColor: "#FFE5E5",
                    borderRadius: "6px",
                    color: "#F56666",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  D-{content.dday}
                </div>
              </div>
              <ProgressBar>
                <Progress
                  style={{ width: `${content.achievement}%` }}
                  fillPercentage={content.achievement}
                />
              </ProgressBar>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    color: "#35383B",
                    fontSize: "16px",
                    fontWeight: "700",
                    flex: 1,
                  }}
                >
                  {content.achievement}%
                </div>
                <div>
                  <span
                    style={{
                      color: "#35383B",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {content.attained}
                  </span>
                  <span
                    style={{
                      color: "#A7AEB4",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    &nbsp;/ {content.goal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
}

const SearchInput = styled.div`
  border-radius: 8px 0px 0px 8px;
  border: 1px solid #caced3;
  height: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;
`;

const SearchBtn = styled.button`
  width: 96px;
  height: 50px;
  border-radius: 0px 8px 8px 0px;
  background-color: var(--primary, #3994f0);
  border: 0px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background-color: pink;
`;

const Image = styled.img`
  width: 100%;
  aspectratio: 1/1;
  border-radius: 12px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f7f8fa;
  border-radius: 32px;
  // overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #3994f0;
  border-radius: 32px;
  z-index: 999;
  animation: ${keyframes`
    0% {
      width: 0;
    }
    100% {
      width: ${(props) => props.fillPercentage}%;
    }
  `} 1s ease-out forwards;
`;
