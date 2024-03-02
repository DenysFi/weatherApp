import { memo } from 'react';
import '../scss/vidgets.scss'
import Vidget from './Vidget';

const Vidgets = memo(function Vidgets({ locations }) {
<<<<<<< HEAD
    function fetchPromisesForNewFiture2() {
        console.log(11111111);
        return new Promise((r, re) => r(1));
    }

    useEffect(
        () => {
            const promises = locations.map((area) => {
                return new Promise((resolve, reject) => {
                    axios.get('URL')
                })
            })
        }, [locations])


    function fetchPromisesForNewFiture3() {
        console.log(11111111);
        return new Promise((r, re) => r(1));
    }

    function fetchPromisesForNewFiture() {
        console.log(11111111);
        return new Promise((r, re) => r(1));
    }

=======
>>>>>>> move-app-on-new-design
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