import dayjs from "dayjs";
import { setEventModelOpen } from "../../redux/features/Events";
import { useAppDispatch } from "../../redux/hooks/TypeDeclaredHooks";
import moment from "moment";

function CalenderHeader() {
  const dispatch = useAppDispatch();
  function handleOpenModal() {
    dispatch(
      setEventModelOpen({
        isOpen: true,
        date: dayjs(),
      })
    );
  }
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-4xl text-black font-bold">Calendar</h1>

      <button
        className="bg-[#FF836D] px-6 py-3 rounded-lg text-lg text-white font-semibold"
        onClick={handleOpenModal}
      >
        + Add Event
      </button>
    </nav>
  );
}

export default CalenderHeader;
