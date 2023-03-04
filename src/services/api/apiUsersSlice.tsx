import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUsersState } from "../../types";


export const getUsers = createAsyncThunk("users/getUsers", async ({
   numberPage = 1,
   quantityUsers = '10',
   nationality = null,
   gender = null,
   options = {}
}: GetUsersState) => {

   if (nationality) {
      nationality = `&nat=${nationality}`
   } else {
      nationality = ''
   }

   if (gender) {
      gender = `&gender=${gender}`
   } else {
      gender = ''
   }

   try {
      const res = await fetch(
         `https://randomuser.me/api?page=${numberPage}&results=${quantityUsers}${nationality}${gender}`, options
      )

      const data = await res.json()
      return data.results
   } catch (err) {
      console.log(err);
   }

});