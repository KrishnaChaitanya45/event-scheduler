import { motion } from "framer-motion";
import CustomForm from "../../forms/CustomForm";
import dayjs from "dayjs";
import {
  LegacyRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import {
  AppSelector,
  useAppDispatch,
} from "../../redux/hooks/TypeDeclaredHooks";
import {
  addEvent,
  removeEvent,
  setEventModelOpen,
  setLabelsSelected,
  updateEvent,
} from "../../redux/features/Events";
import { Event_Type } from "../../types/EVENT_TYPES";
import { FormEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { axiosPrivate } from "../../api/axios";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosTokenPrivate";
//? This component is used in two ways
//? To add a new event and to edit an existing event
//? Also displayed the 3 latest events of the day
//? we ue the isEventModelOpen state to determine if the component is in add mode or edit mode ( based on events property )
//? if the events property is present then the component can be used to edit an event
//? else it is used to add a new event

function AddEventModule({ data }: { data?: string }) {
  const dispatch = useAppDispatch();
  let { isEventModelOpen, events, labelsSelected } = AppSelector(
    (state) => state.events
  );
  let { auth } = AppSelector((state) => state.auth);
  function closeHandler() {
    dispatch(setEventModelOpen({ isOpen: false, date: dayjs() }));
  }
  const axios = useAxiosPrivate();
  const [editMode, setEditMode] = useState<number>(-1);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const [error, setError] = useState<string>("");
  const [Events, setEvents] = useState<{
    isOpen: boolean;
    date?: dayjs.Dayjs | undefined;
    events?: Event_Type[] | undefined;
  }>(isEventModelOpen);
  async function submitHandler(
    e: FormEvent<HTMLFormElement>,
    values: Event_Type
  ) {
    console.log(values);
    if (values.title && values.description && values.date && values.label) {
      if (errorRef.current) {
        errorRef.current?.classList.remove("text-red-500");
        errorRef.current?.classList.add("text-yellow-500");
        setError("Adding Event..!");
      }

      const addEventResult = await axios.post("/events", {
        ...values,
        date: values.date?.toISOString(),
      });
      if (!addEventResult.data) {
        throw new Error("Error adding event");
      }
      errorRef.current?.classList.add("text-green-500");
      setError("Added..!");
      setTimeout(() => {
        setError("");
      }, 3000);
      dispatch(addEvent({ ...addEventResult.data }));
      dispatch(setEventModelOpen({ isOpen: false, date: dayjs() }));
    } else {
      return { error: true };
    }
  }

  const deleteHandler = async (evt: Event_Type) => {
    try {
      errorRef.current?.classList.remove("text-red-500");
      errorRef.current?.classList.add("text-yellow-500");
      setError("Deleting..!");

      const deleteEventResult = await axios.delete(`/events/${evt.id}`);

      if (!deleteEventResult.data) {
        errorRef.current?.classList.remove("text-yellow-500");
        errorRef.current?.classList.add("text-red-500");
        setError("Error deleting event");
        return;
      }
      errorRef.current?.classList.add("text-green-500");
      setError("Deleted..!");
      await dispatch(removeEvent(evt));
      setTimeout(() => {
        setError("");
      }, 3000);
      setEditMode(-1);
      dispatch(setEventModelOpen({ isOpen: false, date: dayjs() }));
      // setEvents((prevEvents) => ({
      //   ...prevEvents,
      //   events: filteredEvents,
      // }));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };
  async function editHandler(
    e: FormEvent<HTMLFormElement>,
    values: Event_Type
  ) {
    const valuesWithId = {
      ...values,
      id:
        Events.events &&
        Events.events.length > 0 &&
        Events.events.slice(0, 3).reverse()[editMode].id,
    };
    console.log(values);
    if (values.title && values.description && values.date && values.label) {
      errorRef.current?.classList.remove("text-red-500");
      errorRef.current?.classList.add("text-yellow-500");
      setError("Updating..!");
      const updateEventResult = await axios.patch(
        `/events/${
          Events.events &&
          Events.events.length > 0 &&
          Events.events.slice(0, 3).reverse()[editMode].id
        }`,
        {
          ...values,
          date: values.date?.toISOString(),
        }
      );
      if (!updateEventResult.data) {
        errorRef.current?.classList.remove("text-yellow-500");
        errorRef.current?.classList.add("text-red-500");
        setError("Error updating event");
        return;
      }
      errorRef.current?.classList.remove("text-yellow-500");
      errorRef.current?.classList.add("text-green-500");
      setError("Updated..!");
      setTimeout(() => {
        setError("");
      }, 3000);
      dispatch(updateEvent(updateEventResult.data));
      if (!labelsSelected.includes(updateEventResult.data.label)) {
        dispatch(setLabelsSelected(updateEventResult.data.label));
      }
      dispatch(setEventModelOpen({ isOpen: false, date: dayjs() }));
      Events.events &&
        setEvents({
          ...Events,
          events: Events.events.map((event) => {
            if (event.id === updateEventResult.data.id) {
              return updateEventResult.data;
            }
            return event;
          }),
        });
    } else {
      return { error: true };
    }
  }

  return (
    <motion.div
      className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-[3vw] flex md:flex-row flex-col gap-[5vw] items-start justify-center rounded-lg backdrop-filter  bg-black/70 z-50 xl:flex-nowrap md:flex-wrap"
      initial={{ opacity: 0, top: "0%" }}
      animate={{ opacity: 1, top: "50%" }}
      exit={{ opacity: 0, top: "0%" }}
      // transition={{ type: "spring", stiffness: 200 }}
    >
      <button
        className="p-3 rounded-[50%] bg-[#FF836D] absolute top-[-2.5%] right-[-2.5%]"
        onClick={closeHandler}
      >
        <IoMdClose className="text-3xl  text-white " />
      </button>
      <div className="relative">
        <p ref={errorRef} className="text-lg my-4 py-2 text-center">
          {error}
        </p>
        {editMode == -1 ? (
          <CustomForm
            initialValues={{
              title: "",
              description: "",
              date: Events.date,
              label: "blue",
            }}
            type="event"
            // @ts-ignore
            submitHandler={submitHandler}
          />
        ) : (
          <CustomForm
            initialValues={{
              title:
                Events.events && Events.events.length > 0
                  ? Events.events.slice(0, 3).reverse()[editMode].title
                  : "",
              description:
                Events.events && Events.events.length > 0
                  ? Events.events.slice(0, 3).reverse()[editMode].description
                  : "",
              date:
                Events.events && Events.events.length > 0
                  ? dayjs(Events.events.slice(0, 3).reverse()[editMode].date)
                  : dayjs(),
              label:
                Events.events && Events.events.length > 0
                  ? Events.events.slice(0, 3).reverse()[editMode].label
                  : "",
            }}
            type="event"
            // @ts-ignore
            submitHandler={editHandler}
          />
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2   md:min-w-[50vw] xl:min-w-[20vw] w-[100%]">
        <h2 className="text-xl text-white font-semibold">Recent Tasks</h2>
        {Events.events && Events.events.length > 0 ? (
          Events.events
            .slice(0, 3)
            .reverse()
            .map((evt, idx) => {
              return (
                <div
                  key={idx}
                  className="flex  items-start justify-between w-[100%] rounded-xl sm:px-4 px-2 py-2 relative"
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
                  <button
                    type="button"
                    className="bg-yellow-500 sm:p-3 p-2 rounded-[50%] absolute top-[-15%] right-[10%]"
                    onClick={async () => {
                      if (editMode != -1) {
                        setEditMode(-1);
                      }
                      setEditMode(idx);
                    }}
                  >
                    <FaEdit className="text-white text-xl " />
                  </button>
                  <button
                    className="bg-red-500 sm:p-3 p-2 rounded-[50%] absolute top-[-15%] right-[-5%]"
                    onClick={async (e) => {
                      e.preventDefault();
                      await deleteHandler(evt);
                    }}
                  >
                    <MdDeleteOutline className="text-white text-xl " />
                  </button>
                </div>
              );
            })
        ) : (
          <p className="text-lg text-gray-500 font-semibold">No Tasks</p>
        )}
        {Events.events && Events.events.length > 0 && (
          <Link
            to={`/calendar/${dayjs(isEventModelOpen.date)
              .format("D MM YYYY")
              .replace(/\s/g, "-")}`}
            className="mt-4 bg-black text-white w-[100%] py-2 text-center rounded-lg"
          >
            View More{" "}
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default AddEventModule;
