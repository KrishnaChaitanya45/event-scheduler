import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

//? These are the custom hooks which are used to access the redux store with type declarations
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
