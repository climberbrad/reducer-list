import { useReducer } from 'react';
import { ListItem } from './App';

type ActionEvent =
  | { type: 'click'; item: ListItem; }
  | { type: 'submit' }
  | { type: 'success' }
  | { type: 'error', items: ListItem[] }

export interface PieState {
  saved: boolean;
  isLoading: boolean;
  listItems: ListItem[];
  error: boolean;
}


const ListReducer = (initialList: ListItem[]) => {

  const reducer = (state: PieState, action: ActionEvent): PieState => {
    switch (action.type) {
      case 'click':
        const index = state.listItems.indexOf(action.item);
        if (index === -1) return state;

        const updatedList: ListItem[] = [...state.listItems];
        updatedList[index] = { ...action.item, selected: !action.item.selected };
        const isSaved = JSON.stringify(initialList) === JSON.stringify(updatedList);

        let newVar = { ...state, saved: isSaved, listItems: updatedList };
        return newVar;
      case 'submit':
        return { ...state, isLoading: true, error: false };
      case 'success':
        return { ...state, saved: true, isLoading: false, error: false };
      case 'error':
        return { ...state, saved: false, isLoading: false, error: true, listItems: action.items };
      default:
        return state;
    }
  };
  return useReducer(reducer, { saved: true, isLoading: false, error: false, listItems: initialList });
};

export default ListReducer;