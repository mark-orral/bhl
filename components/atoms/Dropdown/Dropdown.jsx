import { useState } from "react";

import styles from "./dropdown.module.scss";

//! Need to add icons for category selection states
// const Icon = ({ status }) => (!status ? <>Open</> : <>Close</>);

const icon = () => {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="24.221"
      height="20.859"
      viewBox="0 0 24.221 20.859"
    >
      <path
        d="M0,24.221V9.519H14.824L7.979,2.269,10.369,0,20.859,11.3,10.369,22.6l-2.39-2.268,6.844-7.21H3.2v11.1Z"
        transform="translate(24.221) rotate(90)"
        fill="#dcdbd1"
      />
    </svg>
  );
};

const Dropdown = ({ placeholder, options, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.name;
    }
    return placeholder;
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleItemSelection = (option) => {
    setSelectedValue(option);
    setShowMenu(false);
    onChange(option);
  };

  const setActiveIndex = (option) => {
    return (
      (placeholder?.value || selectedValue?.value) === option.value &&
      styles.component_menu_item_active
    );
  };

  return (
    <div className={styles.component}>
      <div className={styles.component_input} onClick={handleInputClick}>
        {getDisplay()}
        {icon()}
        {/* <Icon status={showMenu} /> */}
      </div>
      {showMenu && (
        <div className={styles.component_menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.component_menu_item} ${setActiveIndex(
                option
              )}`}
              onClick={() => handleItemSelection(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
