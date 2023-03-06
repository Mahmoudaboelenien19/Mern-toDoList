import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { appDispatch, RootType } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;
export const useAppDispatch = () => useDispatch<appDispatch>();
