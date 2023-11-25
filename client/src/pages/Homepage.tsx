import { AnimatePresence } from "framer-motion";
import CalenderHeader from "../components/calander/CalanderHeader";
import MainContainer from "../components/calander/Container";
import PersistentLogin from "../components/PersistentLogin";
import { getMonth } from "../utils/getDaysArray";
import { AppSelector, useAppDispatch } from "../redux/hooks/TypeDeclaredHooks";
import AddEventModule from "../components/calander/AddEventModule";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import {
  addEvent,
  addLabel,
  setEvents,
  setLabelsSelected,
} from "../redux/features/Events";
import { Event_Type } from "../types/EVENT_TYPES";

function Homepage() {
  const { isEventModelOpen } = AppSelector((state) => state.events);
  const { auth } = AppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  async function fetchEvents() {
    try {
      const res = await axiosPrivate("/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      console.log(res.data);
      if (res.data.length == 0) return;
      dispatch(setEvents(res.data));
      const labels = res.data.map((evt: Event_Type) => evt.label) as string[];
      console.log(labels);
      dispatch(addLabel(labels));
    } catch (error) {
      setIsError(true);
    }
  }
  useEffect(() => {
    if (auth) {
      setIsLoading(true);
      fetchEvents();
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="w-[100%] flex flex-col lg:p-10 p-5  xl:h-[100vh]">
      <CalenderHeader />
      {!isLoading && !isError && (
        <>
          <MainContainer />
          <AnimatePresence initial={false}>
            {isEventModelOpen.isOpen && <AddEventModule />}
          </AnimatePresence>
        </>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-[100%]">
          <h1 className="text-2xl text-black font-bold">Loading...</h1>
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-[100%]">
          <h1 className="text-2xl text-red-800 font-bold">
            Error while fetching Events...
          </h1>
        </div>
      )}
    </div>
  );
}

export default Homepage;
