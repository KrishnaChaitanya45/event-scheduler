import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  AppSelector,
  useAppDispatch,
} from "../../redux/hooks/TypeDeclaredHooks";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  setCurrentMonth,
  setCurrentMonthIdx,
  setEventModelOpen,
} from "../../redux/features/Events";
import { getMonth } from "../../utils/getDaysArray";
import Day from "./Day";
//? Display the grid of days using the getMonth function from utils
//? it also has the previous and next month buttons
//? and the current month title

function MainCalender() {
  const { currentMonthIdx, currentMonth } = AppSelector(
    (state) => state.events
  );
  const [currentMonthIdxState, setCurrentMonthIdxState] = useState(
    moment().month()
  );
  const [currentMonthState, setCurrentMonthState] = useState(
    getMonth(moment().month())
  );
  useEffect(() => {
    setCurrentMonthIdxState(currentMonthIdx);
    setCurrentMonthState(currentMonth);
  }, [currentMonthIdx, currentMonth]);
  const dispatch = useAppDispatch();
  function handlePreviousMonth() {
    dispatch(setCurrentMonthIdx(currentMonthIdx - 1));
    dispatch(setCurrentMonth(currentMonthIdx - 1));
  }
  function handleNextMonth() {
    dispatch(setCurrentMonthIdx(currentMonthIdx + 1));
    dispatch(setCurrentMonth(currentMonthIdx + 1));
  }

  const isMobile = window.innerWidth < 500;
  return (
    <section className="xl:w-[80%] w-[100%] h-[100%] flex flex-col xl:order-2 order-1">
      <header className="px-4  sm:px-8 py-5 flex justify-between items-center border-b-[2px] border-b-[#ebebeb]">
        <h2 className="text-2xl text-black font-bold">
          {moment(new Date(moment().year(), currentMonthIdxState)).format(
            "MMMM YYYY"
          )}
        </h2>
        <ul className="flex items-center justify-center gap-4 sm:gap-8">
          <li>
            <button
              className="text-lg sm:text-xl text-white bg-black p-2 sm:p-3 rounded-[50%]"
              onClick={handlePreviousMonth}
            >
              <FaArrowLeft />
            </button>
          </li>
          <li>
            <button
              className="text-lg sm:text-xl text-white bg-black p-2 sm:p-3 rounded-[50%]"
              onClick={handleNextMonth}
            >
              <FaArrowRight />
            </button>
          </li>
        </ul>
      </header>
      <div className="grid grid-cols-7 h-[100%]  ">
        {currentMonthState.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day
                day={day}
                idx={idx}
                key={day.unix()}
                i={i}
                currentMonthIdxState={currentMonthIdxState}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default MainCalender;
