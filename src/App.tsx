import React, { useState } from 'react';
import './App.css';
import MyList from './MyList';
import { saveList } from './Utils';


function App() {
  // simulates a backend DB
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const handleSubmit = async (items: string[]) => {
    try {
      await saveList(items);
      setSavedItems(items);
    } catch (error) {
      throw new Error('Error saving list.');
    }
  };

  const pieOptions = ['Apple', 'Cherry', 'Pumpkin', 'Lemon meringue', 'No'];

  return (
    <main className='App mt-10'>
      <MyList saveList={handleSubmit} selected={savedItems} options={pieOptions}/>
    </main>
  );
}

export default App;
