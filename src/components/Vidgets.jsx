import { memo, useEffect, useState } from 'react';
import '../scss/vidgets.scss'
import axios from 'axios';
import useGeocoding from '../hooks/useGeocoding';
import Wether from '../classes/Wether';

const Vidgets = memo(function Vidgets({ locations }) {
    const geolocations = useGeocoding(locations);
    const [geoWithData, setGeoWithData] = useState([]);

    useEffect(() => {
        if (!geolocations.length) return;

        async function getAll() {
            const response = await Wether.getAllDataByGeo(geolocations);
            console.log(response);
        }
        getAll();

    }, [geolocations])


    return (
        <div className="vidgets">
            {locations.length ?
                locations.map(location => {
                    const key = location.country + location.region + location.city;
                    return (
                        <article className='vidget' key={key}>
                            <div className="vidget__location">
                                <h3 className="vidget__city">{location.city}</h3>
                                <p className="vidget__region">{location.region}</p>
                                <p className="vidget__country">{location.country}</p>
                            </div>
                        </article>
                    )
                }) : <h3 className='vidgets__empty'>Локации отсутствуют!</h3>
            }
        </div>
    );
});

export default Vidgets;