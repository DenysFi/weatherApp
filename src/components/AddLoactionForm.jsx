import { Tooltip } from '@mui/material';
import axios from 'axios';
import { memo, useCallback, useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetchData';
import { getFromLocalStorage, isStoreByKey, saveToLocalStorage } from '../utiles/utiles';
import Select from './select';

const AddLoactionForm = memo(function AddLoactionForm({ setSelectedArea, selectedArea, handleActiveLoacations }) {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const cities = regions.find(region => region.name === selectedArea.region)?.areas || [];

  const fetchCountriesFunction = useCallback(async () => {
    const key = import.meta.env.VITE_COUNTRIES_API_KEY;
    const countries = await axios.get('https://data-api.oxilor.com/rest/countries?key=' + key);
    saveToLocalStorage(countries.data, 'countries')
    setCountries(countries.data);
  }, [])

  const fetchRegionFunction = useCallback(async () => {
    if (!selectedArea.country.length) return;

    const response = await axios.get('https://api.hh.ru/areas');
    const regionsOfCountry = response.data.find((area) => area.name
      .toLowerCase() === selectedArea.country.toLowerCase())?.areas

    setRegions(regionsOfCountry);
  }, [selectedArea.country])

  function handleSelected(value, key = null) {
    if (value instanceof Object) {
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
  const [fetchCountries, isLoading, error] = useFetching(fetchCountriesFunction)

  useEffect(() => {
    if (isStoreByKey('countries')) {
      const data = getFromLocalStorage('countries');
      setCountries(data);
      return;
    }
    fetchCountries();
  }, [fetchCountries])

  useEffect(() => {
    fetchRegionFunction()
  }, [fetchRegionFunction])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Select handleSelected={handleSelected} forActionOnUpdate='country' cleanOnChange={['region', 'city']} data={countries}></Select>
      <Select handleSelected={handleSelected} forActionOnUpdate='region' cleanOnChange={['city']} disabled={!selectedArea.country.length} data={regions}></Select>
      <Select handleSelected={handleSelected} forActionOnUpdate='city' disabled={!cities.length} data={cities}></Select>

      {!selectedArea.city.length ?
        <Tooltip title="Не длжно остаться не заполненных полей!">
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