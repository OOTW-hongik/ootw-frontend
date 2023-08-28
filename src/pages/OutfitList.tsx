import React, { useState, useEffect } from "react";
import "../css/OutfitList.css";
import { BiFilterAlt, BiSort } from "react-icons/bi";
import { HiFilter } from "react-icons/hi";
import BottomNav from "../components/BottomNav";
import Outfit from "../components/Outfit";
import Dropdown from "../components/Dropdown";
import NoServerAlert from "../components/NoServerAlert";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const OutfitList = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [fetchNameInfo, setFetchNameInfo] = useState();
  const [fetchOutfitList, setFetchOutfitList] = useState([
    {
      outfitId: 0,
      outfitDate: "string",
      skyCondition: 0,
      highWc: 0,
      lowWc: 0,
      highTemp: 0,
      lowTemp: 0,
      outerRating: 0,
      topRating: 0,
      bottomRating: 0,
      outerUrl: "string",
      topUrl: "string",
      bottomUrl: "string",
      manyOuter: false,
      manyTop: false,
      manyBottom: false,
    },
  ]);
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const sortList = ["체감비슷순", "최근날짜순"];
  const filterList = ["아우터", "상의", "하의"];
  const [selectedSort, setSelectedSort] = useState<string>(sortList[0]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [isFilterChecked, setIsFilterChecked] = useState<boolean>(false);
  const [checkedFilterList, setCheckedFilterList] = useState([
    false,
    false,
    false,
  ]);
  const isMobile = useMediaQuery({
    query: "(max-device-width:767px)",
  });
  const isPc = useMediaQuery({
    query: "(min-device-width:768px)",
  });
  useEffect(() => {
    fetch("http://43.200.138.39:8080/outfit/list?memberId=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchNameInfo(res.name);
        setFetchOutfitList(res.outfitSummary);
      })
      .catch((error) => setErrorMsg(error.message));
  }, []);
  useEffect(()=>{ // 정렬 변경 
    if (selectedSort === "최근날짜순") {
      // fetchOutfitList을 복사해서 시간순으로 정렬 후 set
      let sortedByDate = [...fetchOutfitList];
      sortedByDate=sortedByDate.sort((a,b) => {
        if(a.outfitDate > b.outfitDate) return -1;
        if(a.outfitDate < b.outfitDate) return 1;
        return 0;
      });
      // 정렬된 내용 저장 
      setFetchOutfitList(sortedByDate);
      console.log(sortedByDate);
    }
    else { // 체감비슷순 선택 
      fetch("http://43.200.138.39:8080/outfit/list?memberId=1", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setFetchOutfitList(res.outfitSummary);
        })
        .catch((error) => setErrorMsg(error.message));
    }
  },[selectedSort]);

  useEffect(() => { // 필터 변경 
    // spread 사용하여 리스트 state 변경
    let copy = [...checkedFilterList];
    copy[filterList.indexOf(selectedFilter)] =
      !checkedFilterList[filterList.indexOf(selectedFilter)];
    setCheckedFilterList(copy);

    // 불 들어올까 말까 결정
    if (checkedFilterList[0] || checkedFilterList[1] || checkedFilterList[2]) {
      setIsFilterChecked(true);
    } else {
      setIsFilterChecked(false);
    }

    setSelectedFilter("");
  }, [selectedFilter]);
  return (
    <div className="OutfitList mobileWeb">
      {errorMsg && <NoServerAlert errorMsg={errorMsg} />}
      <div id="titleWrapper">
        <h3 className="pageTitle">{fetchNameInfo} 님의 기록</h3>
        <div className="btnWrapper">
          <div>
            <div
              className="btn pointer"
              onClick={() => {
                setIsSortOpened(!isSortOpened);
                setIsFilterOpened(false);
              }}
            >
              <BiSort className="icon" /> {selectedSort}
            </div>
            {isSortOpened && (
              <Dropdown
                closeDropdown={() => setIsSortOpened(false)}
                selectResult={(value: string) => setSelectedSort(value)}
                dropList={sortList}
                selectedList={sortList.map((element: string) =>
                  Boolean(selectedSort === element)
                )}
              />
            )}
          </div>
          <div>
            <div
              className="btn pointer"
              onClick={() => {
                setIsFilterOpened(!isFilterOpened);
                setIsSortOpened(false);
              }}
            >
              {isFilterChecked ? (
                <HiFilter className="icon" />
              ) : (
                <BiFilterAlt className="icon" />
              )}
              <div className={isFilterChecked ? "after" : "before"}>적당</div>
            </div>
            {isFilterOpened && (
              <Dropdown
                closeDropdown={() => setIsFilterOpened(false)}
                selectResult={(value: string) => setSelectedFilter(value)}
                dropList={filterList}
                selectedList={checkedFilterList}
              />
            )}
          </div>
        </div>
      </div>

      {fetchOutfitList.length > 0 ? (
        fetchOutfitList.map(
          (element) =>
            (checkedFilterList[0] ? element.outerRating === 3 : true) &&
            (checkedFilterList[1] ? element.topRating === 3 : true) &&
            (checkedFilterList[2] ? element.bottomRating === 3 : true) && (
              <Link to={`/outfitlist/${element.outfitId}`} ><Outfit element={element} /></Link>
            )
        )
      ) : (
        <div id="noRecordText">기록이 없어요</div>
      )}
      {isMobile && <div style={{ paddingTop: "200px" }}/>}
      {isPc && <div style={{ paddingTop: "80px" }} />}
      <BottomNav selectedNav="outfitlist" />
    </div>
  );
};

export default OutfitList;
