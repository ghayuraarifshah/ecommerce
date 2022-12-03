import React, { useState } from "react";

interface Props {
  className: string;
  type: "email" | "zipcode" | "phone" | "text";
  placeholder: string;
  onBlur: (value: string) => void;
  initValue: string;
  setIsValid: (bool: boolean) => void;
}

const Input: React.FC<Props> = ({
  type,
  className,
  placeholder,
  onBlur,
  initValue,
  setIsValid,
}) => {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState("");
  const OnBlur = () => {
    setError("");
    switch (type) {
      case "email":
        if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$$/)) {
          onBlur(value);
          setIsValid(true);
        } else {
          setIsValid(false);
          setError("Enter a valid Email");
        }
        break;
      case "phone":
        if (value.match(/^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/)) {
          setIsValid(true);
          onBlur(value);
        } else {
          setIsValid(false);
          setError("Enter a valid Phone number");
        }
        break;

      case "zipcode":
        if (value.length == 6) {
          setIsValid(true);
          onBlur(value);
        } else {
          setIsValid(false);
          setError("Enter a valid zipcode");
        }
        break;

      case "text":
        if (value.length > 1) {
          setIsValid(true);
          onBlur(value);
        } else {
          setIsValid(false);
          setError("Enter a valid input");
        }
    }
  };
  let inputType: string;
  if (type == "email") {
    inputType = "email";
  } else if (type == "phone") {
    inputType = "tel";
  } else if (type == "zipcode") {
    inputType = "number";
  } else {
    inputType = "text";
  }
  return (
    <div className={`flex flex-col my-2 ${className}`}>
      <input
        className={`block text-sm font-medium text-gray-900 w-full mx-2 border border-gray-600 px-5 py-3 rounded-lg`}
        onChange={(e) => {
          setValue(e.target.value);
          setError("");
        }}
        placeholder={placeholder}
        onBlur={OnBlur}
        type={inputType}
        value={value}
      />
      {error && <p className="m-2  text-sm text-red-600 ">{error}</p>}
    </div>
  );
};

export default Input;
