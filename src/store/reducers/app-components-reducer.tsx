import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAppComponentPageLoader{
    show: boolean;
    message: string | null;
}

interface IAppComponent {
    pageLoader: IAppComponentPageLoader;
    isSideNavigationExpanded: boolean;
}

export const AppComponentSlice = createSlice({
    name: 'AppComponents',
    initialState: {
        pageLoader: {
            show: false,
            message: null
        },
        isSideNavigationExpanded: true
    } as IAppComponent,
    reducers: {
        setPageLoader: (state: IAppComponent, action: PayloadAction<(IAppComponentPageLoader)>) => {  
            return { 
                ...state,
                 pageLoader:{
                    show: action.payload.show,
                    message: action.payload.message
                }
            };
        },
        showPageLoader: (state: IAppComponent) => {  
            return { 
                ...state,
                 pageLoader:{
                    show: true,
                    message: null
                }
            };
        },
        hidePageLoader: (state: IAppComponent) => {  
            return { 
                ...state,
                 pageLoader:{
                    show: false,
                    message: null
                }
            };
        },

        toggleSideNavigation: (state: IAppComponent) => {
            return { ...state, isSideNavigationExpanded: !state.isSideNavigationExpanded }
        }
    }
});
  
