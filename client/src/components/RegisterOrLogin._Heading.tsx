import { setLoginOrRegister } from "../redux/features/Auth";
import { AppSelector, useAppDispatch } from "../redux/hooks/TypeDeclaredHooks";

export default function RegisterOrLoginHeading() {
  const { loginOrRegister: registerOrLogin } = AppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  return (
    <article className="flex flex-col gap-4 h-[100%] items-start justify-center">
      <div className="flex gap-4 lg:flex-col md:flex-row flex-col items-center justify-center lg:items-start">
        <h1 className="font-barlow font-[600] text-4xl  lg:text-3xl">
          {registerOrLogin === "register" ? "Sign Up to" : "Sign In to"}
        </h1>
        <h2 className="font-clash_display text-5xl lg:text-4xl ">
          Event
          <span className="font-clash_display font-[600] text-[#D517B8] mx-4">
            Scheduler
          </span>
        </h2>
      </div>
      <div className="lg:mt-[10%] mt-[5%] w-[100%] md:flex-row flex-col flex lg:flex-col gap-2 items-center md:items-start justify-center lg:justify-start">
        <p className=" text-xl lg:text-base font-rubik font-[500]">
          {registerOrLogin === "register"
            ? "Already have an account ?"
            : "Don't have an account ?"}
        </p>
        <span
          className="text-[#4461F2] font-poppins font-[500] cursor-pointer text-xl lg:text-base"
          onClick={() => {
            dispatch(
              //@ts-ignore
              setLoginOrRegister((prevState: "register" | "login") => {
                prevState === "register" ? "login" : "register";
              })
            );
          }}
        >
          {registerOrLogin === "register"
            ? "Login Here 👋"
            : "Register Here  🚩"}
        </span>
      </div>
    </article>
  );
}
