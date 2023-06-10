import "../css/RegisterOutfit.css";
import AreaSwitchBtn from "../components/AreaSwitchBtn";
import RegisterCategory from "../components/RegisterCategory";
import { TfiSave } from "react-icons/tfi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ko } from 'date-fns/esm/locale';


function RegisterOutfit() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <div className="RegisterOutfit mobileWeb">
      <div className="upperWrapper">
        <div>
          <DatePicker
            className="datePicker"
            dateFormat="yyyy-MM-dd (eee)"
            closeOnScroll={true}
            selected={startDate}
            locale={ko}
            onChange={(date) => setStartDate(date)}
          />
          <AreaSwitchBtn /> 
        </div>
        <div>날씨</div>
      </div>

      <div className="lowerWrapper">

        <RegisterCategory title="아우터" />
        <RegisterCategory title="상의" />
        <RegisterCategory title="하의" />
        <RegisterCategory title="기타" />

        <div className="comment centerLeftRight">
          <div className="commentTitle">한줄평</div>
          <input type="text" placeholder="한줄평을 입력해보세요." />
        </div>

        <TfiSave className="centerLeftRight" size={25} style={{ padding: "5px" }} />
      </div>
    </div>
  );
}


export default RegisterOutfit;
