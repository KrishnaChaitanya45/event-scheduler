import moment, { Moment } from "moment";
import { motion } from "framer-motion";
import {
  useAppDispatch,
  AppSelector,
} from "../../redux/hooks/TypeDeclaredHooks";
import { setEventModelOpen } from "../../redux/features/Events";
import { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { Event_Type } from "../../types/EVENT_TYPES";

function Day({
  idx,
  day,
  i,
  currentMonthIdxState,
}: {
  idx: number;
  day: Moment;
  i: number;
  currentMonthIdxState: number;
}) {
  const isMobile = window.innerWidth < 500;
  const dispatch = useAppDispatch();
  const { events, labelsSelected } = AppSelector((state) => state.events);
  function handleSelectDate() {
    dispatch(
      setEventModelOpen({
        isOpen: true,
        date: dayjs(day.toDate()),
        events: filteredEvents,
      })
    );
  }

  const filteredEvents = useMemo(() => {
    return events.filter(
      (evt) =>
        evt.label &&
        dayjs(evt.date).format("D-M-YYYY") == day.format("D-M-YYYY") &&
        labelsSelected.includes(evt.label)
    );
  }, [events, day, labelsSelected]);

  return (
    <motion.div
      className="w-full h-full min-h-[10vh] min-w-[5vw] sm:border-[1px] text-black sm:border-[#ebebeb] "
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(0,0,0)",
        color: "white",
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={handleSelectDate}
      // transition={{ type: "spring", stiffness: 200 }}
    >
      <button
        key={idx}
        className={`p-2 w-full   flex md:flex-row flex-col items-start justify-between `}
      >
        <span
          className={`text-sm font-bold px-2 py-2 rounded-[50%] order-2 sm:order-1 ${
            day.month() != currentMonthIdxState && "text-gray-300"
          } ${
            day.format("D-M-YYYY") == moment().format("D-M-YYYY") &&
            "bg-black text-white"
          } `}
        >
          {day.format("D")}
        </span>
        {i == 0 && (
          <div className="flex flex-col gap-2 order-1 sm:order-2 p-2">
            <span className="text-gray-600 font-semibold">
              {!isMobile ? day.format("ddd") : day.format("dddd")[0]}
            </span>
          </div>
        )}
      </button>
      {filteredEvents.length > 0 && (
        <div className="flex flex-col gap-2 p-2">
          {filteredEvents.map((event, i) => (
            <div
              key={i}
              style={{
                backgroundColor: event.label,
              }}
              className=" text-white rounded-lg p-2 text-sm"
            >
              {event.title}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Day;
