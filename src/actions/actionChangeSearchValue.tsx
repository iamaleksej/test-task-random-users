import { createAction } from "@reduxjs/toolkit";


export const actionChangeSearchValue = createAction<string | null>('users/actionChangeSearchValue')