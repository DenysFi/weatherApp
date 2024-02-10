import { useEffect, useState } from 'react';
import AddLoactionForm from '../AddLoactionForm';
import { findDoubles, getFromLocalStorage, isStoreByKey, saveToLocalStorage } from '../../utiles/utiles';
import Vidgets from '../Vidgets';
import SearchLocation from '../SearchLocation';
import RecentLocations from '../RecentLocations';

const Home = () => {
  const [selectedArea, setSelectedArea] = useState({
    country: null,
    city: null,
    region: null
  });
  const [activeLoacations, setActiveLoacations] = useState([]);

  useEffect(() => {
    if (!isStoreByKey('areas')) return;

    // const obj = {
    //   city: { ID: 1, name: 'Кривой Рог' },
    //   country: { ID: 1, name: 'Украина' },
    //   region: { ID: 1, name: 'Днепропетровская' }
    // }
    // saveToLocalStorage([obj], 'areas')
    const storagetAreas = getFromLocalStorage('areas');
    setActiveLoacations([...storagetAreas])
  }, [])

  function handleActiveLoacations() {
    console.log(findDoubles(activeLoacations, selectedArea));
    if (findDoubles(activeLoacations, selectedArea)) {
      setActiveLoacations([...activeLoacations, selectedArea])

      const areas = 'areas';
      const prevLocations = isStoreByKey(areas) && getFromLocalStorage(areas) || [];
      saveToLocalStorage([...prevLocations, selectedArea], areas)
    }
  }
  return (
    <section className='home'>
      <div className="home__container">
        <SearchLocation></SearchLocation>
        <RecentLocations></RecentLocations>
      </div>

      {/* <AddLoactionForm handleActiveLoacations={handleActiveLoacations} selectedArea={selectedArea} setSelectedArea={setSelectedArea}> </AddLoactionForm>
        <Vidgets locations={activeLoacations}></Vidgets> */}
    </section>
  )
};
// removeFromLocalStorage('areas')
export default Home;

