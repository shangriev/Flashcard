import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './redux/slices/dataSlice';
import { CardList } from './components/CardList';
import { Categories } from './components/Categories';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className='App'>
      {/* <Categories /> */}
      <CardList />
    </div>
  );
}

export default App;
