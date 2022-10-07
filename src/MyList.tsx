import React from 'react';
import './App.css';
import ListReducer, { PieState } from './ListReducer';

export const buttonCss = (state: PieState) => {
  return state.saved || (!state.saved && state.isLoading)
    ? 'bg-gray-500 opacity-75 w-full py-1 border border-gray-100 rounded text-white font-semibold'
    : 'bg-sky-700 w-full py-1 border border-gray-100 rounded text-white hover:opacity-75 hover:bg-gray-400 hover:text-black font-semibold';
};

const cloudSVG = (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'
       className='w-6 h-6'>
    <path stroke-linecap='round' stroke-linejoin='round'
          d='M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z' />
  </svg>
);

const pieOptions = ['Apple', 'Cherry', 'Pumpkin', 'Lemon meringue', 'No'];

interface Props {
  saveList: (items: string[]) => void,
  initialList: string[]
}

const MyList = ({ saveList, initialList }: Props): JSX.Element => {
  const [state, dispatch] = ListReducer(initialList);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'submit' });
    try {
      await saveList(state.pieList);
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error', pieList: initialList });
    }
  };

  const listPie = (pie: string): JSX.Element => (
    <div className='flex justify-between py-1'>
      <p className='text-gray-500 text-md pr-2 font-semibold whitespace-nowrap'>{pie} pie</p>
      <input value='boo' type='checkbox' checked={state.pieList.includes(pie)} onClick={() =>
        dispatch({ type: 'click', pie: pie })} className='h-6 w-4 rounded focus:outline-none' />
    </div>
  );

  return (
    <>
      {state.error && (
        <div
          className='flex justify-center container mt-4 mx-auto bg-red-300 text-semibold rounded-xl shadow border py-4 mb-2 w-1/4'>
          <div className={'mr-2'}>Error:</div>
          <div className='font-semibold text-sm mt-0.5'>Unable to save list.</div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='container mx-auto bg-blue-300 rounded-xl shadow border pt-8 w-1/4'>
          <div className='flex justify-center'>
            <span className='mt-0.5 text-blue-700'>{cloudSVG}</span>
            <span className='text-xl text-gray-700 font-semibold pl-2'>Reducer checklist</span>
          </div>
          <div className='p-2 mx-20 my-4'>
            {pieOptions.map(listPie)}
            <div className='flex justify-end mt-8'>
              <button type={'submit'} disabled={state.saved || (!state.saved && state.isLoading)}
                      className={buttonCss(state)}>{state.isLoading ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyList;