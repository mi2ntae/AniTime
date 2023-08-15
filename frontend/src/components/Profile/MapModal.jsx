import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Modal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.28);
  z-index: 1000;
  opacity: ${(props) => (props.open ? 1 : 0)};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  transition: opacity 0.5s, visibility 0.5s;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 70%;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
`;

const MapContainer = styled.div`
  flex: 1;
`;

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px 0px 0px 8px;
  border-top: 1px solid #caced3;
  border-bottom: 1px solid #caced3;
  border-left: 1px solid #caced3;
  border-right: none;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  padding-left: 16px;
  box-sizing: border-box;

  &:focus {
    border: 1px solid var(--primary, #3994f0);
    outline: none;
  }
`;

const SearchResults = styled.div`
  list-style: none;
  padding: 0;
  flex-grow: 1;
  overflow-y: auto;
  border: 1px solid #e8ebee;
  border-radius: 8px;
  max-height: calc(70vh - 190px);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e8ebee;
    border-radius: 8px;
  }
`;

const SearchResultItem = styled.div`
  height: 50px;
  cursor: pointer;
  padding: 0.5rem 0 0 1rem;
  border-bottom: 1px solid var(--lightgrey, #e8ebee);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #f7f8fa;
  }
`;

const SearchResultName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #35383b;
`;

const SearchResultAddress = styled.span`
  font-size: 8px;
  font-weight: 400;
  color: #a7aeb4;
`;

const LocationInput = styled.div`
  flex: 1;
  background-color: var(--lightestgrey, #f7f8fa);
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

function MapModal({ getPosition, curLocation }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({
    lat: 37.5012860931305,
    lng: 127.039604663862,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);
  const modalRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // 사용자의 현재 위치를 받아옴
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(newCoords);
      });
    }
  }, []);

  useEffect(() => {
    if (!window.kakao || !open) return;

    const options = {
      center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapRef.current, options);
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
    });
    marker.setMap(map);

    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      const newCoords = {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      };
      setCoords(newCoords);
      marker.setPosition(mouseEvent.latLng);
    });
  }, [open, coords]);

  const searchPlaces = (query) => {
    setSearchStarted(true);
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(query, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
        if (data[0]) selectPlace(data[0]);
      } else {
        setSearchResults([]);
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPlaces(searchInput);
    }
  };

  const selectPlace = (place) => {
    setCoords({ lat: place.y, lng: place.x });
  };

  const confirmLocation = () => {
    // 좌표를 주소로 변환
    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.lng, coords.lat, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        let newAddress;

        if (result[0].road_address) {
          // 도로명 주소가 있는 경우
          newAddress = result[0].road_address.address_name;
        } else if (result[0].address) {
          // 도로명 주소가 없고 지번 주소만 있는 경우
          newAddress = result[0].address.address_name;
        } else {
          // 주소 정보가 없는 경우 (예: 바다 위)
          newAddress = "주소 정보 없음";
        }
        setAddress(newAddress);
        getPosition(coords.lat, coords.lng, newAddress);
      } else {
        // 주소 변환에 실패한 경우
        alert("주소를 찾을 수 없습니다.");
      }
    });
    getPosition(coords.lat, coords.lng, address);
    setOpen(false);
  };

  const closeModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  return (
    <>
      <LocationInput
        onClick={() => {
          setOpen(true);
        }}
        style={{
          border: open
            ? "1px solid var(--primary, #3994f0)"
            : "0.77px solid var(--lightgrey, #e8ebee)",
        }}
      >
        <span
          style={{
            color: curLocation ? "#35383B" : address ? "#35383B" : "#A7AEB4",
          }}
        >
          {curLocation ? curLocation : address ? address : "실종위치"}
        </span>
      </LocationInput>

      <Modal open={open}>
        <ModalContent ref={modalRef}>
          <h4 style={{ margin: "0px 0px 20px 0px" }}>실종위치 검색</h4>
          <div style={{ display: "flex", height: "100%", gap: "16px" }}>
            <MapContainer>
              <KakaoMap ref={mapRef}></KakaoMap>
            </MapContainer>
            <SearchContainer>
              <div style={{ display: "flex" }}>
                <SearchInput
                  type="text"
                  placeholder="장소명을 입력해주세요"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  onClick={() => searchPlaces(searchInput)}
                  style={{
                    width: "80px",
                    height: "50px",
                    borderRadius: "0px 8px 8px 0px",
                    backgroundColor: "#3994F0",
                    border: "0px",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  검색&nbsp;
                  <img
                    src="/icons/ic_search.svg"
                    alt="Error"
                    style={{ width: "23%" }}
                  />
                </Button>
              </div>

              <SearchResults>
                {searchStarted ? (
                  searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <SearchResultItem
                        key={index}
                        onClick={() => selectPlace(result)}
                      >
                        <SearchResultName>{result.place_name}</SearchResultName>
                        <SearchResultAddress>
                          {result.road_address_name}
                        </SearchResultAddress>
                      </SearchResultItem>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "#7D848A",
                        fontSize: "14px",
                      }}
                    >
                      검색결과가 없습니다.
                    </div>
                  )
                ) : (
                  <div
                    style={{
                      padding: "1rem",
                      textAlign: "center",
                      color: "#7D848A",
                      fontSize: "14px",
                    }}
                  >
                    검색어를 입력해주세요.
                  </div>
                )}
              </SearchResults>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "32px",
                }}
              >
                <Button
                  onClick={() => setOpen(false)}
                  style={{
                    width: "88px",
                    height: "50px",
                    borderRadius: "8px",
                    border: "1px solid #3994F0",
                    color: "#3994F0",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  취소
                </Button>
                <Button
                  onClick={() => confirmLocation()}
                  style={{
                    width: "88px",
                    height: "50px",
                    borderRadius: "8px",
                    backgroundColor: "#3994F0",
                    border: 0,
                    color: "#F7F8FA",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  완료
                </Button>
              </div>
            </SearchContainer>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MapModal;
