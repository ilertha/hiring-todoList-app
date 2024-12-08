import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import type { RootState } from "../TodoList/storeTypes";

// Create a typed useAppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a typed useAppSelector
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);
