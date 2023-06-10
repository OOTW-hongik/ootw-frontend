import React, { useState } from "react";
import '../css/MyClosetSub.css';
import Modal from "./Modal";
import UploadCloset from "./UploadCloset";
type Props = {
  category: string;
}
const MyClosetSub = ({category}:Props) => {
  const [selectedSubCate, setSelectedSubCate] = useState("all");
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <div>
      <div className="subCategory">
        <div>{category}</div>
      </div>
      <div className="col4GridContainer">
        <button className="registerClosetBtn centerLeftRight" onClick={() => setIsModalOpened(true)}>+</button>
        <div>옷1</div>
        <div>옷2</div>
        <div>옷3</div>
        <div>옷4</div>
        <div>옷5</div>
      </div>
      {isModalOpened &&
        <Modal closeModal={() => setIsModalOpened(false)}>
          <UploadCloset category={category} />
        </Modal>}
    </div>

  );
};

export default MyClosetSub;