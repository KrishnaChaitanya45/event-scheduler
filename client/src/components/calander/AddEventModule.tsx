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
  updateEvent,
} from "../../redux/features/Events";
import { Event_Type } from "../../types/EVENT_TYPES";
import { FormEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { axiosPrivate } from "../../api/axios";
function AddEventModule({ data }: { data?: string }) {
  const dispatch = useAppDispatch();
  let { isEventModelOpen, events } = AppSelector((state) => state.events);
  let { auth } = AppSelector((state) => state.auth);
  function closeHandler() {
    dispatch(setEventModelOpen({ isOpen: false, date: dayjs() }));
  }
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

      const addEventResult = await axiosPrivate.post(
        "/events",
        {
          ...values,
          date: values.date?.toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      if (!addEventResult.data) {
        throw new Error("Error adding event");
      }
      errorRef.current?.classList.add("text-green-500");
      setError("Added..!");
      setTimeout(() => {
        setError("");
      }, 3000);
      dispatch(addEvent({ ...values, id: events.length + 1 }));
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

      const deleteEventResult = await axiosPrivate.delete(`/events/${evt.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
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
  return (
    <motion.div
      className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-[3vw] flex gap-[5vw] items-start justify-center rounded-lg backdrop-filter  bg-black/70 z-50"
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
      </div>
      <div className="mt-4 flex flex-col gap-2 min-w-[20vw]">
        <h2 className="text-xl text-white font-semibold">Recent Tasks</h2>
        {Events.events && Events.events.length > 0 ? (
          Events.events
            .slice(0, 2)
            .reverse()
            .map((evt, idx) => {
              const [editValues, setEditValues] = useState<Event_Type>(evt);

              return (
                <div
                  key={idx}
                  className="flex  items-start justify-between w-[100%] rounded-xl px-4 py-2 relative"
                  style={{
                    backgroundColor: evt.label,
                  }}
                >
                  <div className="w-[70%] flex flex-col gap-2 items-start justify-start">
                    {editMode != idx ? (
                      <>
                        <b className="text-lg text-white">{evt.title}</b>
                        <p className="text-gray-500">{evt.description}</p>{" "}
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          maxLength={10}
                          value={editValues.title}
                          onChange={(e) => {
                            setEditValues({
                              ...editValues,
                              title: e.target.value,
                            });
                          }}
                          autoFocus={true}
                          className="focus:outline-none text-white text-lg font-semibold bg-transparent"
                        />
                        <input
                          type="text"
                          value={editValues.description}
                          maxLength={20}
                          onChange={(e) => {
                            setEditValues({
                              ...editValues,
                              description: e.target.value,
                            });
                          }}
                          className="focus:outline-none text-gray-400 text-base font-semibold bg-transparent"
                        />
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    className="bg-yellow-500 p-3 rounded-[50%] absolute top-[-15%] right-[10%]"
                    onClick={async () => {
                      if (editMode != -1) {
                        errorRef.current?.classList.remove("text-red-500");
                        errorRef.current?.classList.add("text-yellow-500");
                        setError("Updating..!");
                        const updateEventResult = await axiosPrivate.patch(
                          `/events/${editValues.id}`,
                          editValues,
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${auth.accessToken}`,
                            },
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
                        dispatch(updateEvent(editValues));
                        Events.events &&
                          setEvents({
                            ...Events,
                            events: Events.events.map((event) => {
                              if (event.id === editValues.id) {
                                return editValues;
                              }
                              return event;
                            }),
                          });
                        setEditMode(-1);
                      }
                      setEditMode(idx);
                    }}
                  >
                    <FaEdit className="text-white text-xl " />
                  </button>
                  <button
                    className="bg-red-500 p-3 rounded-[50%] absolute top-[-15%] right-[-5%]"
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
          <button className="mt-4 bg-black text-white w-[100%] py-2 rounded-lg">
            View More{" "}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default AddEventModule;
