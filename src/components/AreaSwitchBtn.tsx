import "../css/AreaSwitchBtn.css";

import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import Dropdown from "../components/Dropdown";
import NoServerAlert from "../components/NoServerAlert";

type Props = {
  changeLocationInfo: (value: string) => void;
  whereUsed: string;
};
function AreaSwitchBtn({ changeLocationInfo, whereUsed }: Props) {
  const [userLocationBeforeModi, setUserLocationBeforeModi] = useState("");
  const areaList = [
    "서울경기",
    "강원영서",
    "강원영동",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주도",
    "울릉독도",
    // { id: 0, areaName: "서울경기" },
    // { id: 1, areaName: "강원영서" },
    // { id: 2, areaName: "강원영동" },
    // { id: 3, areaName: "충청북도" },
    // { id: 4, areaName: "충청남도" },
    // { id: 5, areaName: "전라북도" },
    // { id: 6, areaName: "전라남도" },
    // { id: 7, areaName: "경상북도" },
    // { id: 8, areaName: "경상남도" },
    // { id: 9, areaName: "제주도" },
    // { id: 10, areaName: "울릉독도" },
  ];
  const [selectedArea, setSelectedArea] = useState("");
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    fetch("https://api.ootw.store/home", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const userLocation = res.location;

        if (whereUsed === "home") {
          setSelectedArea(userLocation);
          setUserLocationBeforeModi(userLocation);
          // console.log(userLocationBeforeModi, userLocation);
        } else {
          let fLI = sessionStorage.getItem(`fetchLocationInfo${whereUsed}`);
          if (fLI) {
            setSelectedArea(fLI);
          } else {
            setSelectedArea(userLocation);
          }
        }
        // console.log("AS UE",userLocation);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);

  useEffect(() => {
    if (whereUsed === "home" && selectedArea) {
      fetch(`https://api.ootw.store/home/location`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
        body: JSON.stringify({
          location: selectedArea,
        }),
      }).then(() => {
        if (userLocationBeforeModi !== selectedArea) {
          // console.log(userLocationBeforeModi, selectedArea);
          window.location.reload();
        }
      });
    }
    changeLocationInfo(selectedArea);
  }, [selectedArea]);

  return (
    <div>
      <div
        id="areaSwitchBtn"
        className="pointer"
        onClick={() => {
          setIsDropdownOpened(!isDropdownOpened);
        }}
      >
        <FaMapMarkerAlt id="mapMarker" />
        {selectedArea}
      </div>
      {isDropdownOpened && (
        <Dropdown
          closeDropdown={() => setIsDropdownOpened(false)}
          selectResult={(value: string) => setSelectedArea(value)}
          dropList={areaList}
          selectedList={areaList.map((element: string) =>
            Boolean(selectedArea === element)
          )}
        />
      )}
    </div>
  );
}

export default AreaSwitchBtn;
