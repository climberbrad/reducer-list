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
      setSavedItems(items)
    } catch (error) {
      throw new Error('Error saving list.')
    }
  };

  return (
    <main className='App mt-10'>
      <MyList  saveList={handleSubmit} initialList={savedItems}/>
    </main>
  );
}

export default App;
