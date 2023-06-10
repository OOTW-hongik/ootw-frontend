import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import "../css/AreaSwitchBtn.css";

function AreaSwitchBtn () {

  const [selectedArea, setSelectedArea] = useState(41);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const areaList = [
    { id: 0, areaNum: 105, areaName: "강릉" },
    { id: 1, areaNum: 259, areaName: "강진군" },
    { id: 2, areaNum: 201, areaName: "강화" },
    { id: 3, areaNum: 294, areaName: "거제" },
    { id: 4, areaNum: 284, areaName: "거창" },
    { id: 5, areaNum: 283, areaName: "경주시" },
    { id: 6, areaNum: 185, areaName: "고산" },
    { id: 7, areaNum: 172, areaName: "고창" },
    { id: 8, areaNum: 251, areaName: "고창군" },
    { id: 9, areaNum: 262, areaName: "고흥" },
    { id: 10, areaNum: 266, areaName: "광양시" },
    { id: 11, areaNum: 156, areaName: "광주" },
    { id: 12, areaNum: 279, areaName: "구미" },
    { id: 13, areaNum: 140, areaName: "군산" },
    { id: 14, areaNum: 238, areaName: "금산" },
    { id: 15, areaNum: 253, areaName: "김해시" },
    { id: 16, areaNum: 247, areaName: "남원" },
    { id: 17, areaNum: 295, areaName: "남해" },
    { id: 18, areaNum: 100, areaName: "대관령" },
    { id: 19, areaNum: 143, areaName: "대구" },
    { id: 20, areaNum: 133, areaName: "대전" },
    { id: 21, areaNum: 98, areaName: "동두천" },
    { id: 22, areaNum: 106, areaName: "동해" },
    { id: 23, areaNum: 165, areaName: "목포" },
    { id: 24, areaNum: 273, areaName: "문경" },
    { id: 25, areaNum: 288, areaName: "밀양" },
    { id: 26, areaNum: 102, areaName: "백령도" },
    { id: 27, areaNum: 235, areaName: "보령" },
    { id: 28, areaNum: 258, areaName: "보성군" },
    { id: 29, areaNum: 226, areaName: "보은" },
    { id: 30, areaNum: 271, areaName: "봉화" },
    { id: 31, areaNum: 159, areaName: "부산" },
    { id: 32, areaNum: 243, areaName: "부안" },
    { id: 33, areaNum: 236, areaName: "부여" },
    { id: 34, areaNum: 104, areaName: "북강릉" },
    { id: 35, areaNum: 255, areaName: "북창원" },
    { id: 36, areaNum: 93, areaName: "북춘천" },
    { id: 37, areaNum: 289, areaName: "산청" },
    { id: 38, areaNum: 137, areaName: "상주" },
    { id: 39, areaNum: 189, areaName: "서귀포" },
    { id: 40, areaNum: 129, areaName: "서산" },
    { id: 41, areaNum: 108, areaName: "서울" },
    { id: 42, areaNum: 181, areaName: "서청주예" },
    { id: 43, areaNum: 188, areaName: "성산" },
    { id: 44, areaNum: 239, areaName: "세종" },
    { id: 45, areaNum: 90, areaName: "속초" },
    { id: 46, areaNum: 119, areaName: "수원" },
    { id: 47, areaNum: 254, areaName: "순창군" },
    { id: 48, areaNum: 174, areaName: "순천" },
    { id: 49, areaNum: 136, areaName: "안동" },
    { id: 50, areaNum: 257, areaName: "양산시" },
    { id: 51, areaNum: 202, areaName: "양평" },
    { id: 52, areaNum: 168, areaName: "여수" },
    { id: 53, areaNum: 252, areaName: "영광군" },
    { id: 54, areaNum: 277, areaName: "영덕" },
    { id: 55, areaNum: 121, areaName: "영월" },
    { id: 56, areaNum: 272, areaName: "영주" },
    { id: 57, areaNum: 281, areaName: "영천" },
    { id: 58, areaNum: 170, areaName: "완도" },
    { id: 59, areaNum: 115, areaName: "울릉도" },
    { id: 60, areaNum: 152, areaName: "울산" },
    { id: 61, areaNum: 130, areaName: "울진" },
    { id: 62, areaNum: 114, areaName: "원주" },
    { id: 63, areaNum: 263, areaName: "의령군" },
    { id: 64, areaNum: 278, areaName: "의성" },
    { id: 65, areaNum: 203, areaName: "이천" },
    { id: 66, areaNum: 211, areaName: "인제" },
    { id: 67, areaNum: 112, areaName: "인천" },
    { id: 68, areaNum: 244, areaName: "임실" },
    { id: 69, areaNum: 248, areaName: "장수" },
    { id: 70, areaNum: 260, areaName: "장흥" },
    { id: 71, areaNum: 146, areaName: "전주" },
    { id: 72, areaNum: 217, areaName: "정선군" },
    { id: 73, areaNum: 245, areaName: "정읍" },
    { id: 74, areaNum: 184, areaName: "제주" },
    { id: 75, areaNum: 221, areaName: "제천" },
    { id: 76, areaNum: 268, areaName: "진도군" },
    { id: 77, areaNum: 192, areaName: "진주" },
    { id: 78, areaNum: 155, areaName: "창원" },
    { id: 79, areaNum: 232, areaName: "천안" },
    { id: 80, areaNum: 95, areaName: "철원" },
    { id: 81, areaNum: 276, areaName: "청송군" },
    { id: 82, areaNum: 131, areaName: "청주" },
    { id: 83, areaNum: 135, areaName: "추풍령" },
    { id: 84, areaNum: 101, areaName: "춘천" },
    { id: 85, areaNum: 127, areaName: "충주" },
    { id: 86, areaNum: 216, areaName: "태백" },
    { id: 87, areaNum: 162, areaName: "통영" },
    { id: 88, areaNum: 99, areaName: "파주" },
    { id: 89, areaNum: 138, areaName: "포항" },
    { id: 90, areaNum: 264, areaName: "함양군" },
    { id: 91, areaNum: 285, areaName: "합천" },
    { id: 92, areaNum: 261, areaName: "해남" },
    { id: 93, areaNum: 177, areaName: "홍성" },
    { id: 94, areaNum: 212, areaName: "홍천" },
    { id: 95, areaNum: 169, areaName: "흑산도" },
  ];
  return (
    <div>
      <div
        className="areaSwitchBtn"
        onClick={() => {
          setIsDropdownOpened(!isDropdownOpened);
        }}
      >
        <FaMapMarkerAlt />
        {areaList[selectedArea].areaName}
      </div>
      {isDropdownOpened && (
        <div className="dropdown">
          {areaList.map((element) => (
            <div
              className="dropdownOption"
              onClick={() => {
                setSelectedArea(element.id);
                setIsDropdownOpened(false);
              }}
            >
              {element.areaName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AreaSwitchBtn;
