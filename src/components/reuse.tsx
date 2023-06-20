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
  { id:0, subCategoryName: "후드집업" },
  { id:1, subCategoryName: "자켓" },
  { id:2, subCategoryName: "가디건" },
  { id:3, subCategoryName: "코트" },
  { id:4, subCategoryName: "패딩" },
];
const topSubCategoryList = [
  { id:0, subCategoryName: "반팔티" },
  { id:1, subCategoryName: "긴팔티" },
  { id:2, subCategoryName: "셔츠" },
  { id:3, subCategoryName: "후드티" },
  { id:4, subCategoryName: "원피스" },
];
const bottomSubCategoryList = [
  { id:0, subCategoryName: "긴바지" },
  { id:1, subCategoryName: "반바지" },
  { id:2, subCategoryName: "치마" },
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
