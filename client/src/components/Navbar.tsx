import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppSelector, useAppDispatch } from "../redux/hooks/TypeDeclaredHooks";
import { setLoginOrRegister } from "../redux/features/Auth";
export default function Navbar() {
  //? The cool effect of sign up and sign in ..! Remember ?
  //? its from here..! use use the state to toggle between the two
  const dispatch = useAppDispatch();
  const registerOrLogin = AppSelector((state) => state.auth.loginOrRegister);
  function toggle() {
    registerOrLogin === "register"
      ? dispatch(setLoginOrRegister("login"))
      : dispatch(setLoginOrRegister("register"));
  }

  return (
    <header className="flex gap-10 xl:justify-center justify-around items-center font-abhaya_libre text-lg relative transition-all duration-200 ease-linear">
      <button onClick={toggle} className="text-xl lg:text-base">
        Sign Up
      </button>
      <motion.div
        className={`w-[40%] h-[5px] bg-[#9FAFFF] absolute -bottom-4 rounded-lg left-0 `}
        animate={{
          left: registerOrLogin === "register" ? "0%" : "60%",
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      ></motion.div>
      <button onClick={toggle} className="text-xl lg:text-base">
        Sign In
      </button>
    </header>
  );
}
