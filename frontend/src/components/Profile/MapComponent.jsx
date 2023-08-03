import { margin } from "@mui/system";
import { right } from "@popperjs/core";
import { useEffect, useState } from "react";

export default function MapComponent({ setModal, getPosition }) {
  const [curLat, setCurLat] = useState("37.5012860931305");
  const [curLon, setCurLon] = useState("127.039604663862");
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");

  const [searchRes, setSearchRes] = useState([]);

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputText);
    setInputText("");
  };

  useEffect(() => {
    // 지도 생성
    const kakao = window.kakao;
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.5012860931305, 127.039604663862),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    // 마커와 클릭이벤트 생성
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    setMarker(marker);

    marker.setMap(map);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      //   getPosition(latlng.getLat(), latlng.getLng());
      setCurLat(latlng.getLat());
      setCurLon(latlng.getLng());
    });

    // 검색이벤트 생성
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(search, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newCenter = new kakao.maps.LatLng(data[0].y, data[0].x);
        map.setCenter(newCenter);
        marker.setPosition(newCenter);
        // getPosition(data[0].y, data[0].x);
        setCurLat(data[0].y);
        setCurLon(data[0].x);
        setSearchRes(data);
      }
    }
  }, [search]);

  // 리스트 클릭했을때 이벤트
  const handlePlaceClick = (place) => {
    const newCenter = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(newCenter);
    marker.setPosition(newCenter);
    // getPosition(place.y, place.x);
    setCurLat(place.y);
    setCurLon(place.x);
  };

  const handleSubmitClick = () => {
    getPosition(curLat, curLon);
    setModal(false);
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  return (
    <>
      <div className="map-search-modal">
        <h4 style={{ margin: "0px 0px 20px 0px" }}>실종위치 검색</h4>
        <div className="map-container">
          <div className="map-area">
            <div id="map" style={{ width: "100%", height: "100%" }} />
          </div>

          <div className="search-area">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                placeholder="장소명을 입력해주세요"
                onChange={onChange}
                value={inputText}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                검색&nbsp;
                <img src="/icons/ic_search.svg" style={{ width: "23%" }} />
              </button>
            </form>
            <div className="search-result-list">
              {searchRes.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="search-result-element"
                >
                  <span className="search-res-name">{place.place_name}</span>
                  <br />
                  <span className="search-res-address">
                    {place.road_address_name}
                  </span>
                </div>
              ))}
            </div>
            <div className="button-area">
              <button
                className="cancel-btn"
                onClick={() => handleCancelClick()}
              >
                취소
              </button>
              <button
                className="confirm-btn"
                onClick={() => handleSubmitClick()}
              >
                완료
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
      .map-search-modal {
        padding: 24px;
        width: 70%;
        height: 70vh;
        border-radius: 8px;
        background-color: white;
        z-index: 999;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    .map-container {
        display: flex;
        height: 65vh;
    }
    .map-area {
        flex: 0 0 57%;
        // height: 500px;
        margin-right: 16px;
        
    }
    .search-area {
        flex: 1;
        // background-color: lightgreen;
        display: flex; /* display를 flex로 설정하여 자식 요소들을 열로 배치 */
        // height: 100%;
        flex-direction: column; /* 자식 요소들을 세로 방향으로 배치 */
        justify-content: space-between; /* 자식 요소들을 위/아래로 여백을 주고 균등하게 배치 */
        height: calc(70vh-48px);
    }
    .map {
        width: 57%
        height: 500px;
        margin-right: 16px;
        border-radius: 8px;
    }
    .search-form {
        display: flex;
        height: 8%;
    }
    .search-input {
        height: 6vh;
        border-radius: 8px 0px 0px 8px;
        background-color: white;
        border: 1px solid var(--grey-1, #CACED3);
        // color: white;
        font-size: 14px;
        font-weight: 500;
        flex: 1;
        padding: 1rem;
    }
    .search-input:focus {
        border: 1px solid var(--primary, #3994f0);
        outline: none;
      }
    .search-btn {
        width: 80px;
        height: 6vh;
        border-radius: 0px 8px 8px 0px;
        background-color: var(--primary, #3994F0);
        border: 0px;
        color: white;
        font-size: 16px;
        font-weight: 500;
    }
    .search-input, .search-btn {
        box-sizing: border-box;
      }
    .search-result-list {
        flex: 1;
        overflow: hidden;
        max-height: 50vh;
        overflow-y: auto;
        border: 1px solid var(--lightgrey, #E8EBEE);
        border-radius: 8px;
    }
    .search-result-list::-webkit-scrollbar {
        width: 8px; /* 스크롤바 너비 조절 */
      }
      .search-result-list::-webkit-scrollbar-thumb {
        background-color: var(--lightgrey, #E8EBEE); /* 스크롤바 색상 */
        border-radius: 8px; /* 스크롤바 둥글게 처리 */
      }
    // .search-result-list::-webkit-scrollbar {
    //     display: none; /* 스크롤바 숨김 */
    //   }
    .search-result-element {
        height: 50px;;
        cursor: pointer;
        padding: 0.5rem 0 0 1rem;
        border-bottom: 1px solid var(--lightgrey, #E8EBEE);
    }
    .search-res-name {
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        color: var(--blackgrey, #35383B);
    }
    .search-res-address {
        font-family: Inter;
        font-size: 8px;
        font-weight: 400;
        color: #A7AEB4;
    }
    .button-area {
        display: flex
        text-align: center;
        display: flex;
        justify-content: center;
        gap: 32px;
    }
    .cancel-btn {
        width: 88px;
        height: 6vh;
        border-radius: 8px;
        border: 1px solid var(--primary, #3994F0);
        color: var(--primary, #3994F0);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        background-color: white;
    }
    .confirm-btn {
        width: 88px;
        height: 6vh;
        border-radius: 8px;
        background-color: var(--primary, #3994F0);
        border: 0px;
        color: var(--lightestgrey, #F7F8FA);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    `}</style>
    </>
  );
}
