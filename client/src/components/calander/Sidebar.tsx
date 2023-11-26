import moment from "moment";
import React, { useMemo } from "react";
import {
  AppSelector,
  useAppDispatch,
} from "../../redux/hooks/TypeDeclaredHooks";
import {
  setEventModelOpen,
  setLabelsSelected,
} from "../../redux/features/Events";
import dayjs from "dayjs";
//? The side bar component contains the filters and the mini calendar
//? the mini calendar is only visible on desktop and tablet
//? the filters can be applied to labels and the mini calendar
//? can be used to select a date and open the add event modal
function Sidebar() {
  const colorBookmarks = {
    "#98FF98": "Important",
    "#FFECB3": "Office",
    "#FF6F61": "Refresh",
    "#FFD8E1": "Personal",
    "#E6E6FA": "Creativity",
    "#CCCCFF": "Inspiration",
  };
  const isMobile = window.innerWidth < 500;
  const { currentMonthIdx, currentMonth, events, labelsSelected } = AppSelector(
    (state) => state.events
  );
  const dispatch = useAppDispatch();
  const labels = useMemo(() => {
    console.log(events);
    const labels = events.map((evt) => evt.label);
    console.log(labels);
    return [...new Set(labels)];
  }, [events, labelsSelected]);
  return (
    <section className="xl:w-[20%] w-[100%] h-[100%] border-r-[2px] border-r-[#ededed] flex flex-row  xl:flex-col justify-between items-start xl:items-start  p-5 xl:order-1 order-2">
      <div>
        <h2 className="text-xl font-semibold ">Filters </h2>
        <ul className="flex flex-col gap-4 items-start justify-start mt-4">
          {labels.length > 0 ? (
            labels.map((label, i) => (
              <li key={i} className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => {
                    label && dispatch(setLabelsSelected(label));
                  }}
                  checked={Boolean(label && labelsSelected.includes(label))}
                  className={`py-1 w-[3vw] h-[3vh] `}
                  style={{
                    accentColor: label,
                  }}
                />
                {label && (
                  <span
                    className={`${
                      labelsSelected.includes(label)
                        ? "text-black"
                        : "text-gray-500"
                    } font-semibold text-lg`}
                  >
                    {
                      //@ts-ignore
                      colorBookmarks[label] || "Entertainment"
                    }
                  </span>
                )}
              </li>
            ))
          ) : (
            <p className="text-lg text-gray-500 font-semibold">No Labels</p>
          )}
        </ul>
      </div>

      {!isMobile && (
        <div className="sm:flex sm:flex-col sm:gap-4 hidden">
          <header className="flex justify-between">
            <p className="text-black font-semibold">
              {moment(new Date(moment().year(), currentMonthIdx)).format(
                "MMMM YYYY"
              )}
            </p>
          </header>
          <div className="grid grid-cols-7 grid-rows-6 gap-x-4 ">
            {currentMonth.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((day, idx) => (
                  <button
                    key={idx}
                    className={`py-1 w-full min-w-5vw `}
                    onClick={() => {
                      dispatch(
                        setEventModelOpen({
                          isOpen: true,
                          date: dayjs(day.toDate()),
                          events: events.filter(
                            (evt) =>
                              evt.label &&
                              dayjs(evt.date).format("D-M-YYYY") ==
                                dayjs(day.toDate()).format("D-M-YYYY") &&
                              labelsSelected.includes(evt.label)
                          ),
                        })
                      );
                    }}
                  >
                    <span
                      className={`text-sm font-bold px-2 py-2 rounded-[50%] ${
                        day.month() != currentMonthIdx && "text-gray-300"
                      } ${
                        day.format("D-M-YYYY") == moment().format("D-M-YYYY")
                          ? "bg-black text-white"
                          : "text-black"
                      } hover:bg-black hover:text-white`}
                    >
                      {day.format("D")}
                    </span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Sidebar;
