import dayjs from "dayjs";
import { setEventModelOpen } from "../../redux/features/Events";
import {
  AppSelector,
  useAppDispatch,
} from "../../redux/hooks/TypeDeclaredHooks";
import moment from "moment";
import { setAuth } from "../../redux/features/Auth";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

function CalenderHeader() {
  const dispatch = useAppDispatch();
  const auth = AppSelector((state) => state.auth);
  function handleOpenModal() {
    dispatch(
      setEventModelOpen({
        isOpen: true,
        date: dayjs(),
      })
    );
  }
  const router = useNavigate();
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-4xl text-black font-bold">Calendar</h1>
      <div className="flex items-center justify-center gap-4">
        <button
          className="bg-[#FF836D] sm:px-6 px-3 sm:py-3 py-1 rounded-lg text-lg text-white font-semibold transition-all duration-300 ease-linear hover:bg-white hover:text-[#FF836D]"
          onClick={handleOpenModal}
        >
          + Add Event
        </button>
        <button
          className="bg-gray-200 sm:px-6 px-3 sm:py-3 py-1 rounded-lg text-lg text-[#FF836D] font-semibold"
          onClick={async () => {
            await axiosPrivate.get("/auth/logout", {
              headers: {
                Authorization: `Bearer ${auth.auth.accessToken}`,
              },
            });
            dispatch(setAuth({ accessToken: "", user: null }));
            router("/auth");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default CalenderHeader;
