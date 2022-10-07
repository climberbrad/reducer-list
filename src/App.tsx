import React, {useReducer} from 'react';
import './App.css';
import {saveList} from "./Utils";

export const buttonCss = (state: PieState) => {
    return state.saved || (!state.saved && state.isLoading)
        ? 'bg-gray-500 opacity-75 w-full py-1 border border-gray-100 rounded text-white font-semibold'
        : 'bg-sky-700 w-full py-1 border border-gray-100 rounded text-white hover:opacity-75 hover:bg-gray-400 hover:text-black font-semibold'
}

const cloudSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>
    </svg>
)

type ActionEvent =
    | { type: 'click'; flavor: string; }
    | { type: 'submit' }
    | { type: 'success' }
    | { type: 'error' }

export interface PieState {
    saved: boolean;
    isLoading: boolean;
    pieList: string[];
}

const initialState = {pieList: [], saved: true, isLoading: false}

const listReducer = (state: PieState, action: ActionEvent): PieState => {
    switch (action.type) {
        case 'click':
            const list = state.pieList.includes(action.flavor)
                ?  state.pieList.filter((flavor) => flavor !== action.flavor )
                :  [...state.pieList, action.flavor];
            const isSaved = JSON.stringify(initialState.pieList) === JSON.stringify(list);

            return {...state, saved: isSaved, pieList: list}
        case 'submit':
            return {...state, isLoading: true}
        case 'success':
            return {...state, saved: true, isLoading: false}
        default: return state;
    }
}

const pieOptions = ['Apple', 'Cherry', 'Pumpkin', 'Lemon meringue', 'No']

function App() {
    const [state, dispatch] = useReducer(listReducer, initialState);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch({type: 'submit'})
        try {
            await saveList(state.pieList);
            dispatch({type: 'success'})
        } catch (error) {
            dispatch({type: 'error'})
        }
    }

    const listPie = (flavor: string): JSX.Element => (
        <div className='flex justify-between py-1'>
            <p className="text-gray-500 text-md pr-2 font-semibold whitespace-nowrap">{flavor} pie</p>
            <input value='boo' type='checkbox' checked={state.pieList.includes(flavor)} onClick={() =>
                dispatch({type: 'click', flavor: flavor})} className='h-6 w-4 rounded focus:outline-none'/>
        </div>
    )

  return (
      <main className="App mt-10">
      <form onSubmit={handleSubmit}>
          <div className="container mx-auto bg-blue-300 rounded-xl shadow border pt-8 w-1/4">
              <div className='flex justify-center'>
                  <span className='mt-0.5 text-blue-700'>{cloudSVG}</span>
                  <span className="text-xl text-gray-700 font-semibold pl-2">
                    Reducer checklist
                  </span>
              </div>
              <div className='p-2 mx-20 my-4'>
                  {pieOptions.map(listPie)}
                  <div className='flex justify-end mt-8'>
                      <button type={"submit"} disabled={(!state.saved && state.isLoading)} className={buttonCss(state)}>{state.isLoading ? 'Saving...' : 'Save'}</button>
                  </div>
              </div>
          </div>
      </form>
      </main>
  );
}

export default App;
