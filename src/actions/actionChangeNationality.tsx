import { createAction } from "@reduxjs/toolkit";


export const actionChangeNationality = createAction<string | null>('users/actionChangeNationality')