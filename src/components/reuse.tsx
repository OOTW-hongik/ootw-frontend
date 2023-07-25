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
    tag: <IoSunnyOutline/>,
    name: "맑음",
  },
  {
    id: 1,
    tag: <IoPartlySunnyOutline/>,
    name: "구름조금",
  },
  {
    id: 2,
    tag: <IoCloudyOutline />,
    name: "흐림",
  },
  {
    id: 3,
    tag: <IoRainyOutline />,
    name: "비",
  },
  {
    id: 4,
    tag: <IoSnowOutline />,
    name: "눈",
  },
];

const outerSubCategoryList = [
  "후드집업" ,
  "자켓" ,
  "가디건" ,
  "코트" ,
  "패딩" ,
];
const topSubCategoryList = [
  "반팔티" ,
  "긴팔티" ,
  "셔츠" ,
  "후드티" ,
  "원피스" ,
  "폴로티" ,
  "블라우스" ,
];
const bottomSubCategoryList = [
  "긴바지" ,
  "반바지" ,
  "치마" ,
];

const ratingList = [
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

export { weatherIconList, outerSubCategoryList, topSubCategoryList, bottomSubCategoryList, ratingList };
