import React from "react";
import "../css/Dropdown.css";
type Props = {
  closeDropdown: () => void;
  dropList: Array<string>;
  selectResult: (value: string) => void;
  selectedList: Array<boolean>;
};
function Dropdown({ closeDropdown, selectResult, dropList, selectedList }: Props) {
  return (
    <div className="dropdown" onClick={closeDropdown}>
      {dropList.map((element: any) => (
        <div
          className={
            selectedList[dropList.indexOf(element)]
              ? "dropdownOption after"
              : "dropdownOption before"
          }
          key={element}
          onClick={() => {
            closeDropdown();
            selectResult(element);
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
