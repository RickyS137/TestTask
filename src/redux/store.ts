import { configureStore } from "@reduxjs/toolkit";
import usersSlice, { AppDispatch } from "./slices/UsersSlice/model/UsersSlice";
import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux';


export function createReduxStore() {
  return configureStore(
    {
      reducer:{
        users: usersSlice.reducer,
      }
    }
  )
}

export const store = createReduxStore()
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
