import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUserDetails } from "../../models/users/current-user-details";

export const CurrentUserSlice = createSlice({
    name: 'CurrentUser',
    initialState: {
        fullName: '',
        prefferedName: '',
        email: '',
        title: ''
    } as ICurrentUserDetails,
    reducers: {
        setCurrentUser: (state: ICurrentUserDetails, action: PayloadAction<ICurrentUserDetails>) => {  
            return { ...state, action }
        }
    }
});
  
