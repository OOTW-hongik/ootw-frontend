import "../css/OutfitList.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { BiFilterAlt, BiSort } from "react-icons/bi";
import { HiFilter } from "react-icons/hi";
import { Link } from "react-router-dom";

import NoServerAlert from "../components/NoServerAlert";
import BottomNav from "../components/BottomNav";
import Dropdown from "../components/Dropdown";
import Outfit from "../components/Outfit";
import Loading from "../components/Loading";

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
  const [quantity, setQuantity] = useState<number>(10);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const sortList = ["추천순", "최근날짜순"];
  const filterList = ["아우터", "상의", "하의"];
  const [selectedSort, setSelectedSort] = useState<string>(sortList[0]);
  const [isFilterChecked, setIsFilterChecked] = useState<boolean>(false);
  const [checkedFilterList, setCheckedFilterList] = useState([
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(false);

  const filterHandler = (value: string) => {
    // spread 사용하여 리스트 state 변경
    let copy = [...checkedFilterList];
    copy[filterList.indexOf(value)] =
      !checkedFilterList[filterList.indexOf(value)];
    setCheckedFilterList(copy);

    // 세션에 임시 저장
    sessionStorage.setItem("filter", String(copy));
  }; // 필터 변경 함수
  const seeMore = () => {
    // 10개 더보기
    setQuantity(quantity + 10);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.ootw.store/outfit/list?quantity=${quantity}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchNameInfo(res.name);
        setIsEnd(res.end);
        setLoading(false);
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, Number(sessionStorage.listScroll));

    let ssSort = sessionStorage.getItem("sort");
    if (ssSort && ssSort != selectedSort) {
      setSelectedSort(ssSort);
    }

    let ssFilter = sessionStorage.getItem("filter")?.split(",");
    if (ssFilter) {
      setCheckedFilterList([
        ssFilter[0] == "true",
        ssFilter[1] == "true",
        ssFilter[2] == "true",
      ]);
    }
  }, [fetchNameInfo]); // 임시 저장 불러오기

  useEffect(() => {
    setLoading(true);
    if (selectedSort === "최근날짜순") {
      fetch(`https://api.ootw.store/outfit/list?quantity=${quantity}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // res.outfitSummary을 복사해서 시간순으로 정렬 후 set
          let sortedByDate = [...res.outfitSummary];
          sortedByDate = sortedByDate.sort((a, b) => {
            if (a.outfitDate > b.outfitDate) return -1;
            if (a.outfitDate < b.outfitDate) return 1;
            return 0;
          });
          setFetchOutfitList(sortedByDate);
          setIsEnd(res.end);
          setLoading(false);
        })
        .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
    } else {
      // 추천순 선택
      fetch(`https://api.ootw.store/outfit/list?quantity=${quantity}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setFetchOutfitList(res.outfitSummary);
          setIsEnd(res.end);
          setLoading(false);
        })
        .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
    }
    // 세션에 임시 저장
    sessionStorage.setItem("sort", selectedSort);
  }, [selectedSort]); // 정렬 변경

  useEffect(() => {
    console.log("quantity",quantity);
    if (quantity !== 10) {
      setLoading(true);
      fetch(`https://api.ootw.store/outfit/list?quantity=${quantity}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setFetchOutfitList(res.outfitSummary);
          setIsEnd(res.end);
          setLoading(false);
        })
        .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.reload();
        }
        setErrorMsg(error.message);
      });
    }
  }, [quantity]); // 10개 더보기 클릭

  useEffect(() => {
    console.log("isEnd",isEnd);
  }, [isEnd]); // 10개 더보기 클릭

  useEffect(() => {
    if (checkedFilterList[0] || checkedFilterList[1] || checkedFilterList[2]) {
      setIsFilterChecked(true);
    } else {
      setIsFilterChecked(false);
    }
  }, [checkedFilterList]); // 필터버튼에 불 들어올까 말까 결정

  return (
    <div
      className="OutfitList mobileWeb"
      onClick={() =>
        sessionStorage.setItem("listScroll", String(window.scrollY))
      }
    >
      {loading && <Loading />}
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
                selectResult={(value: string) => filterHandler(value)}
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
              <Link to={`/outfitlist/${element.outfitId}`}>
                <Outfit element={element} />
              </Link>
            )
        )
      ) : (
        <div id="noRecordText">기록이 없어요</div>
      )}
      {!isEnd && (
        <button id="seeMoreBtn" className="centerLeftRight" onClick={seeMore}>
          10개 더보기
        </button>
      )}
      <div id="bottomPadding" />
      <BottomNav selectedNav="outfitlist" />
    </div>
  );
};

export default OutfitList;
