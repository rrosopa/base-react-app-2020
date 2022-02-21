// Import Reducer type
import { Reducer } from 'redux';
import { ComponentActions, ComponentActionTypes, IPageLoader } from './actions';

// Define the Character State
export interface IComponentState {
  readonly pageLoader: IPageLoader;
}

// Define the initial state
const initialComponentState: IComponentState = {
  pageLoader: {
    isVisible: false,
    message: undefined
  }
};

export const componentReducer: Reducer<IComponentState, ComponentActions> = (
  state = initialComponentState,
  action
) => {
  switch (action.type) {
    case ComponentActionTypes.SET_PAGE_LOADER: {
      return {
        ...state,
        pageLoader: action.pageLoader,
      };
    }
    default:
      return state;
  }
};