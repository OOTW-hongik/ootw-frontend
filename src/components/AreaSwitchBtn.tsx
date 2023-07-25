import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../css/AreaSwitchBtn.css";
import Dropdown from "../components/Dropdown";

type Props = {
  fetchLocationInfo: string;
  changeLocationInfo: (value: string) => void;
};
function AreaSwitchBtn({ fetchLocationInfo, changeLocationInfo }: Props) {
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
  const [selectedArea, setSelectedArea] = useState(fetchLocationInfo);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    setSelectedArea(fetchLocationInfo);
  }, []);
  useEffect(() => {
    changeLocationInfo(selectedArea);
  }, [selectedArea]);

  return (
    <div>
      <div
        id="areaSwitchBtn"
        onClick={() => {
          setIsDropdownOpened(!isDropdownOpened);
        }}
      >
        <FaMapMarkerAlt />
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
