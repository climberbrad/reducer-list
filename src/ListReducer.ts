import { useReducer } from 'react';

type ActionEvent =
  | { type: 'click'; pie: string; }
  | { type: 'submit' }
  | { type: 'success' }
  | { type: 'error', pieList: string[] }

export interface PieState {
  saved: boolean;
  isLoading: boolean;
  pieList: string[];
  error: boolean;
}


const ListReducer = (initialList: string[]) => {

  const reducer = (state: PieState, action: ActionEvent): PieState => {
    switch (action.type) {
      case 'click':
        const list = state.pieList.includes(action.pie)
          ? state.pieList.filter((flavor) => flavor !== action.pie)
          : [...state.pieList, action.pie];
        const isSaved = JSON.stringify(initialList) === JSON.stringify(list);

        return { ...state, saved: isSaved, pieList: list };
      case 'submit':
        return { ...state, isLoading: true, error: false };
      case 'success':
        return { ...state, saved: true, isLoading: false, error: false };
      case 'error':
        return { ...state, saved: false, isLoading: false, error: true, pieList: action.pieList };
      default:
        return state;
    }
  };
  return useReducer(reducer, { saved: true, isLoading: false, error: false, pieList: initialList });
};

export default ListReducer;