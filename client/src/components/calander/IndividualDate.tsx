import { Link, useParams } from "react-router-dom";
import { AppSelector } from "../../redux/hooks/TypeDeclaredHooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Event_Type } from "../../types/EVENT_TYPES";

//? for the individual date page we use the useParams hook from react-router-dom to get the date from the url
//? and then we filter the events array from the redux store to get the events that match the date
//? and display them
//? for the route /:date for example /12-12-2021 we display all the events on that date

function IndividualDate() {
  const { date } = useParams();
  const events = AppSelector((state) => state.events.events);
  const [Events, setEvents] = useState<Event_Type[]>();
  useEffect(() => {
    const filteredEvents = events.filter(
      (evt) => dayjs(evt.date).format("D-M-YYYY") == date
    );
    setEvents(filteredEvents);
  });
  return (
    <main className="flex items-center w-full min-h-screen justify-center">
      <section className="bg-black/70 w-[60%] py-[5vh] rounded-xl flex flex-col items-center">
        <h1 className="text-white text-2xl font-semibold"> Tasks on {date}</h1>
        <div className="flex flex-col gap-5 mt-8 w-[100%] items-center">
          {Events && Events.length > 0 ? (
            Events.reverse().map((evt, idx) => {
              return (
                <div
                  key={idx}
                  className="flex  items-start justify-between w-[80%] rounded-xl sm:px-4 px-2 py-2 relative"
                  style={{
                    backgroundColor: evt.label,
                  }}
                >
                  <div className="w-[100%] flex flex-col sm:gap-2 gap-1 items-start justify-start">
                    <b className="text-lg text-white">{evt.title}</b>
                    <div className="flex justify-between items-center w-[100%]">
                      <p className="text-gray-500">{evt.description}</p>{" "}
                      <p className="text-gray-500">
                        {dayjs(evt.date).format("hh:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-gray-500 font-semibold">No Tasks</p>
          )}
        </div>
        <Link
          to={`/
              `}
          className="mt-4 bg-black text-white w-[80%] py-2 text-center rounded-lg"
        >
          Back To All Tasks{" "}
        </Link>
      </section>
    </main>
  );
}

export default IndividualDate;
