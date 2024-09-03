import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, RootDispatch } from "./index";

// 在整个程序中使用的 而不是简单的 useDispatch 和 useSelector
export const useCommonDispatch: () => RootDispatch = useDispatch;
export const useCommonSelector: TypedUseSelectorHook<RootState> = useSelector;