import { useState } from 'react';
import AddLoactionForm from '../AddLoactionForm';
import { findDoubles } from '../../utiles/utiles';
import Vidgets from '../Vidgets';

const Home = () => {
  const [selectedArea, setSelectedArea] = useState({
    country: '',
    city: '',
    region: ''
  });
  const [activeLoacations, setActiveLoacations] = useState([]);

  function handleActiveLoacations() {
    if (findDoubles(activeLoacations, selectedArea)) {
      setActiveLoacations([...activeLoacations, selectedArea])
    }
  }

  return (
    <section className='home'>
      <AddLoactionForm handleActiveLoacations={handleActiveLoacations} selectedArea={selectedArea} setSelectedArea={setSelectedArea}> </AddLoactionForm>
      <Vidgets locations={activeLoacations}></Vidgets>
    </section>
  )
};

export default Home;

