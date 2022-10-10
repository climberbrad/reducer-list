import React, { useState } from 'react';
import './App.css';
import MyList from './MyList';
import { saveList } from './Utils';
import { ListItem } from './ListReducer';

const pieList: ListItem[] = [
  { name: 'Apple', selected: false },
  { name: 'Cherry', selected: false },
  { name: 'Pumpkin', selected: false },
  { name: 'Lemon meringue', selected: false },
  { name: 'No', selected: false },
];

function App() {
  // simulates a backend DB
  const [savedItems, setSavedItems] = useState<ListItem[]>(pieList);

  const handleSubmit = async (items: ListItem[]) => {
    try {
      await saveList(items);
      setSavedItems(items);
    } catch (error) {
      throw new Error('Error saving list.');
    }
  };

  return (
    <main className='App mt-10'>
      <MyList saveList={handleSubmit} listItems={savedItems} />
    </main>
  );
}

export default App;
