import './Main.css';
import { FaMapMarkerAlt } from "react-icons/fa";

function Main() {

  return (
    <div className="Main mobileWeb">
      <div className='areaSwitchBtn'>
        <FaMapMarkerAlt />서울
      </div>
      <div>날씨</div>
      <div>그래프</div>

      <button className='registerOutfitBtn'>착장 기록하기</button>

      <div>비슷한 체감온도에서 입었던 옷이에요</div>
      <div>리스트1</div>
      <div>리스트2</div>
      <div>리스트3</div>
    </div>
  );
}

export default Main;
