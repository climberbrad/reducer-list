import React from 'react';
import './App.css';
import ListReducer, { LisState, ListItem } from './ListReducer';

export const buttonCss = (state: LisState) => {
  return state.saved || (!state.saved && state.isLoading)
    ? 'bg-gray-500 opacity-75 w-full py-1 border border-gray-100 rounded text-white font-semibold'
    : 'bg-sky-700 w-full py-1 border border-gray-100 rounded text-white hover:opacity-75 hover:bg-gray-400 hover:text-black font-semibold';
};

const listSVG = (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'
       className='w-6 h-6'>
    <path stroke-linecap='round' stroke-linejoin='round'
          d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
  </svg>
);

interface Props {
  saveList: (items: ListItem[]) => void,
  persistedList: ListItem[],
}

const MyList = ({ saveList, persistedList }: Props): JSX.Element => {
  const [state, dispatch] = ListReducer(persistedList);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'submit' });
    try {
      await saveList(state.listItems);
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error', items: persistedList });
    }
  };

  const listItem = (item: ListItem): JSX.Element => (
    <div className='flex justify-between py-1' onClick={() => dispatch({ type: 'click', item: item })}>
      <p className='text-gray-500 text-md pr-2 font-semibold whitespace-nowrap hover:opacity-50 hover:text-white'>{item.name} pie</p>
      <input value='boo' type='checkbox' checked={item.selected}
             className='h-6 w-4 rounded focus:outline-none' />
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
        <div className='container mx-auto bg-blue-300 rounded-xl shadow border pt-8 w-1/4 drop-shadow-xl'>
          <div className='flex justify-center'>
            <span className='mt-0.5 text-white'>{listSVG}</span>
            <span className='text-xl text-gray-700 font-semibold pl-2'>Reducer checklist</span>
          </div>
          <div className='p-2 mx-20 my-4'>
            {state.listItems.map(listItem)}
            <div className='flex justify-end mt-8'>
              <button type={'submit'} disabled={state.saved || (!state.saved && state.isLoading)}
                      className={buttonCss(state)}>{state.isLoading ? 'Saving...' : state.saved ? 'Saved' : 'Save'}</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyList;