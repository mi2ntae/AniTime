import React, { useEffect, useState } from "react";

const MapComponent = ({ searchPlace }) => {
  const [places, setPlaces] = useState([]);
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    if (window.kakao) {
      const kakao = window.kakao;
      const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      setInfowindow(newInfowindow);

      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap);

      const newMarker = new kakao.maps.Marker({
        position: newMap.getCenter(),
      });
      newMarker.setMap(newMap);
      setMarker(newMarker);

      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(searchPlace, placesSearchCB);

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          newMap.setBounds(bounds);
          setPlaces(data);
        }
      }

      kakao.maps.event.addListener(newMap, "click", function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        newMarker.setPosition(latlng);
      });
    }
  }, [searchPlace]);

  const handlePlaceClick = (place) => {
    const newCenter = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(newCenter);
    marker.setPosition(newCenter);

    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
    infowindow.open(map, marker);
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        id="myMap"
        style={{
          width: "70%",
          height: "500px",
        }}
      ></div>
      <div style={{ width: "30%", overflowY: "scroll", height: "500px" }}>
        {places.map((place) => (
          <div
            key={place.id}
            onClick={() => handlePlaceClick(place)}
            style={{
              cursor: "pointer",
              padding: "1rem",
              borderBottom: "1px solid gray",
            }}
          >
            {place.place_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;
