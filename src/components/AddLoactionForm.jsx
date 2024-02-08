import { Tooltip } from '@mui/material';
import { memo, useState } from 'react';
import Select from './select';
import useFetchRegionFunction from '../hooks/useFetchRegionFunction';
import useFetchCountriesFunction from '../hooks/useFetchCountriesFunction';
import useFetchCities from '../hooks/useFetchCities';
import useDebaunce from '../hooks/useDebounce';

const AddLoactionForm = memo(function AddLoactionForm({ setSelectedArea, selectedArea, handleActiveLoacations }) {

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesQuery, setCitiesQuery] = useState('');
  const debouncedValue = useDebaunce(citiesQuery);

  const [countriesLoading, countriesError] = useFetchCountriesFunction(setCountries);
  const [regionsLoading, regionsError] = useFetchRegionFunction(selectedArea, setRegions)
  const [isCitiesLoading, citiesError] = useFetchCities(debouncedValue, setCities, selectedArea.country?.ID, selectedArea.region?.ID)

  function handleSelected(value, key = null) {
    if (!key) {
      setSelectedArea({
        ...selectedArea,
        ...value
      })
    } else {
      setSelectedArea({
        ...selectedArea,
        [key]: value
      })
    }
  }

  // useEffect(() => {
  //   if (isStoreByKey('countries')) {
  //     const data = getFromLocalStorage('countries');
  //     setCountries(data);
  //     return;
  //   }

  //   fetchCountries();
  // }, [fetchCountries])

  // useEffect(() => {
  //   fetchRegions();
  // }, [fetchRegions])

  // useEffect(() => {
  //   fetchCities();
  // }, [fetchCities])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Select
        handleSelected={handleSelected}
        forActionOnUpdate='country'
        cleanOnChange={['region', 'city']}
        data={countries}
        placeholder='Введите страну'>
      </Select>

      <Select
        handleSelected={handleSelected}
        forActionOnUpdate='region'
        cleanOnChange={['city']}
        disabled={!selectedArea.country}
        data={regions}
        placeholder='Введите область'>
      </Select>

      <Select
        handleSelected={handleSelected}
        forActionOnUpdate='city'
        disabled={!selectedArea.region}
        data={cities}
        placeholder='Введите город'
        isLoading={isCitiesLoading}
        setCitiesQuery={setCitiesQuery}>
      </Select>

      {!selectedArea.city ?
        <Tooltip title="Все поля должны быть заполнены!">
          <span>
            <button disabled style={{ pointerEvents: 'none', marginTop: '10px' }}>A Disabled Button</button>
          </span>
        </Tooltip>
        : <button onClick={() => {
          handleActiveLoacations();
        }}>Добавить локацию</button>
      }
    </form>
  );
});

export default AddLoactionForm;