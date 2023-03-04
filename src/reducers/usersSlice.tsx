import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers } from "../services/api/apiUsersSlice"
import { IUser, UsersState } from "../types";

export const usersSlice = createSlice({
   name: "users",
   initialState: {
      data: [],
      loading: true,
      totalPage: 10,
      quantityUsers: '10',
      nationality: null,
      gender: null,
      searchValue: ''
   } as UsersState,
   reducers: {
      actionChangeQuantityUsers(state, { payload }) {
         state.quantityUsers = payload
      },
      actionChangeNationality(state, { payload }) {
         state.nationality = payload
      },
      actionChangeGender(state, { payload }) {
         state.gender = payload
      },
      actionChangeSearchValue(state, { payload }) {
         state.searchValue = payload
         console.log(state.searchValue)
      },
   },
   extraReducers: builder => {
      builder.addCase(getUsers.pending, (state: UsersState) => {
         state.loading = true;
      })
      builder.addCase(getUsers.fulfilled, (state: UsersState, { payload }: PayloadAction<IUser[]>) => {
         state.loading = false;
         state.data = payload

      })
      builder.addCase(getUsers.rejected, (state: UsersState) => {
         state.loading = false;
      })
   }

});

export default usersSlice.reducer