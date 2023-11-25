"use client";
import { RxCrossCircled } from "react-icons/rx";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
type InputProps = {
  uniqueKey: number | string;
  name: string;
  value: string;
  onChange: (target?: any) => void;
  isText?: boolean;
  isPassword?: boolean;
  resetValue: (name: string) => void;
};
import { useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function InputElement({
  uniqueKey,
  name,
  value,
  isPassword,
  isText,
  resetValue,
  onChange,
}: InputProps) {
  const [toggle, setToggle] = useState(false);
  function togglePassword() {
    setToggle((prev) => !prev);
  }
  return (
    <div className="w-[70vw] lg:w-[30vw] xl:w-[20vw] font-abhaya_libre flex items-center">
      {name == "date" ? (
        <DatePicker
          value={value}
          sx={{
            width: "100%",

            "& .MuiOutlinedInput-root": {
              "&:hover > fieldset": { borderColor: "#4461F2" },
              borderColor: "#4461F2",
              color: "white",
            },
          }}
          onChange={(value) =>
            onChange({ target: { name: "date", value: value } })
          }
          format="DD/MM/YYYY"
          className="w-[100%] rounded-xl border-[1px] focus:outline-none border-[#4461F2] text-white"
        />
      ) : name != "label" ? (
        <input
          key={uniqueKey}
          name={name}
          placeholder={`Enter ${name[0].toUpperCase() + name.slice(1)}`}
          value={value}
          onChange={onChange}
          type={name === "password" ? (toggle ? "text" : "password") : "text"}
          className="w-[100%] bg-transparent border-[1px] py-2 rounded-xl border-[#4461F2] flex items-center px-4 font-abhaya_libre font-[600] text-white tracking-wider focus:outline-none "
        />
      ) : (
        <div className="flex gap-x-2">
          {labelsClasses.map((lblClass, i) => (
            <span
              key={i}
              onClick={() => {
                onChange({
                  target: { name: "label", value: lblClass },
                });
              }}
              className={` w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
              style={{ backgroundColor: lblClass }}
            >
              {value === lblClass && <FaCheck className="text-white text-sm" />}
            </span>
          ))}
        </div>
      )}

      {isText && (
        <RxCrossCircled
          className="absolute right-4 text-white text-lg cursor-pointer"
          onClick={() => {
            resetValue(name);
          }}
        />
      )}
      {isPassword && !toggle ? (
        <FaEye
          className="absolute right-4 text-white text-lg cursor-pointer"
          onClick={togglePassword}
        />
      ) : (
        !isText &&
        name != "date" &&
        name != "label" && (
          <FaEyeSlash
            className="absolute right-4 text-white text-lg cursor-pointer"
            onClick={togglePassword}
          />
        )
      )}
    </div>
  );
}
