import { createAction } from "@reduxjs/toolkit";


export const actionChangeGender = createAction<string | null>('users/actionChangeGender')