import {
  IoCloudyOutline,
  IoPartlySunnyOutline,
  IoSunnyOutline,
  IoRainyOutline,
  IoSnowOutline,
} from "react-icons/io5";

const weatherIconList = [
  {
    id: 0,
    tag: <IoSunnyOutline />,
    name: "맑음",
  },
  {
    id: 1,
    tag: <IoPartlySunnyOutline />,
    name: "구름",
  },
  {
    id: 2,
    tag: <IoCloudyOutline />,
    name: "흐림",    
  },
  {
    id: 3,
    tag: <IoSnowOutline />,
    name: "눈",
  },
  {
    id: 4,
    tag: <IoRainyOutline />,
    name: "비",
  },
];

const outerSubCategoryList = [  
  "자켓",
  "코트",
  "패딩",
  "가디건",
  "블레이저",
  "후드집업",
  "기타 아우터"
];
const topSubCategoryList = [
  "셔츠",
  "반팔티",
  "긴팔티",
  "후드티",
  "카라티",
  "민소매티",
  "블라우스",  
  "원피스",
  "기타 상의"
];
const bottomSubCategoryList = ["긴바지", "반바지", "스커트", "기타 하의"];

const ratingList = [
  {
    cssName: " ",
    text: "영류",
  },
  {
    cssName: " active1",
    text: "추움",
  },
  {
    cssName: " active2",
    text: "시원",
  },
  {
    cssName: " active3",
    text: "적당",
  },
  {
    cssName: " active4",
    text: "따뜻",
  },
  {
    cssName: " active5",
    text: "더움",
  },
  {
    cssName: " ",
    text: "오류",
  },
  {
    cssName: " ",
    text: "오류",
  },
  {
    cssName: " ",
    text: "오류",
  },
  {
    cssName: " ",
    text: "오류",
  },
];

export {
  weatherIconList,
  outerSubCategoryList,
  topSubCategoryList,
  bottomSubCategoryList,
  ratingList,
};
