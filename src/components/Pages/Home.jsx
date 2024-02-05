import { useEffect, useState } from 'react';
import AddLoactionForm from '../AddLoactionForm';
import { findDoubles, getFromLocalStorage, isStoreByKey, saveToLocalStorage } from '../../utiles/utiles';
import Vidgets from '../Vidgets';

const Home = () => {
  const [selectedArea, setSelectedArea] = useState({
    country: '',
    city: '',
    region: ''
  });
  const [activeLoacations, setActiveLoacations] = useState([]);

  useEffect(() => {
    if (!isStoreByKey('areas')) return;

    const storagetAreas = getFromLocalStorage('areas');
    setActiveLoacations([...storagetAreas])
  }, [])

  function handleActiveLoacations() {
    if (findDoubles(activeLoacations, selectedArea)) {
      setActiveLoacations([...activeLoacations, selectedArea])

      const areas = 'areas';
      const prevLocations = isStoreByKey(areas) && getFromLocalStorage(areas) || [];
      saveToLocalStorage([...prevLocations, selectedArea], areas)
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

