import { memo } from 'react';
import '../scss/vidgets.scss'
import Vidget from './Vidget';

const Vidgets = memo(function Vidgets({ locations }) {
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