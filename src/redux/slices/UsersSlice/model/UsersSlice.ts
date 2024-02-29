import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, store } from '../../../store';
import axios from 'axios';
import { toast } from 'react-toastify';


const name = 'users';


const ENDPOINTS = { USERS: 'https://jsonplaceholder.typicode.com/users' };


export const getUsers = createAsyncThunk(
  'users/getUsers',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (_, { dispatch }: any) => {
    try {
      const response = await axios.get(ENDPOINTS.USERS);
      dispatch(usersActions.setUsers(response.data))
    } catch (e) {
      return toast.error('Произошла ошибка проверьте подключение к интернету');
    }
  },
);


const initialState = {
  usersStatus: 'not requested',
  users: [],
  loading: false,
  usersError: null,
};


const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUsers(state, action){
      state.users = action.payload
    }
  },
  extraReducers(builder) {
      builder.addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      builder.addCase(getUsers.fulfilled, (state) => {
        state.loading = false
      })
  },
});


export default usersSlice;
export const { actions: usersActions } = usersSlice
export const usersSelect = (state: RootState) => state[ name ];
export type AppDispatch = typeof store.dispatch