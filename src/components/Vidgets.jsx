import { memo } from 'react';
import '../scss/vidgets.scss'
import axios from 'axios';
import useGeocoding from '../hooks/useGeocoding';
import Wether from '../classes/Wether';
import Vidget from './Vidget';

const Vidgets = memo(function Vidgets({ locations }) {

    // const geolocations = useGeocoding(locations);
    // const [geoWithData, setGeoWithData] = useState([]);


    // useEffect(() => {
    //     if (!geolocations.length) return;

    //     async function getAll() {
    //         const response = await Wether.getAllDataByGeo(geolocations);
    //         console.log(response);
    //     }
    //     getAll();

    // }, [geolocations])
    console.log(locations);
    return (
        <div className="vidgets">
            {locations.length ?
                locations.map(location => {
                    const key = location.country.name + location.region.name + location.city.name;
                    return (
                        <Vidget location={location} key={key} />
                    )
                }) : <h3 className='vidgets__empty'>Локации отсутствуют!</h3>
            }
        </div>
    );
});

export default Vidgets;