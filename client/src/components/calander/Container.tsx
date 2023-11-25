import Sidebar from "./Sidebar";
import MainCalender from "./MainCalander";
import { AnimatePresence } from "framer-motion";
import AddEventModule from "./AddEventModule";
import {
  AppSelector,
  useAppDispatch,
} from "../../redux/hooks/TypeDeclaredHooks";

function MainContainer() {
  const { isEventModelOpen } = AppSelector((state) => state.events);
  return (
    <main
      className={`mt-8 mx-auto w-[100%] rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[100%] flex xl:flex-row flex-col xl:items-start items-center border-[1px] border-[#ebebeb] relative z-2 ${
        isEventModelOpen.isOpen
          ? "opacity-50 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 "
          : "opacity-100 "
      }`}
    >
      <Sidebar />
      <MainCalender />
    </main>
  );
}

export default MainContainer;
