import React,{useState, useEffect} from "react";

export const Error = ({setSearchValue, setDisplayErrorMsg}) => {
  const [clearError, setClearError] = useState(false);

  const handleRemoveError = () => {
    setClearError(true);
    setSearchValue("samsung");
    setDisplayErrorMsg(false);
  }

  return (
    <div className={`error-alert-container ${clearError && 'hide-error-container'}`}>
      <div className="error-alert">
        <span
          className="closebtn"
          onClick={() => handleRemoveError()}
        >
          &times;
        </span>
        <strong> Sorry for the inconvenience. Technical error occured </strong>
      </div>
    </div>
  );
};
