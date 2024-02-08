import { useNavigate } from 'react-router-dom';

const Vidget = ({ location }) => {
    const navigate = useNavigate();
    const { city, region, country } = location;

    function handleNavigation() {
        navigate(`WetherByVidget/${1}/${1}`)
    }

    return (
        <article className='vidget' onClick={handleNavigation}>
            <div className="vidget__location">
                <h3 className="vidget__city">{city.name}</h3>
                <p className="vidget__region">{region.name}</p>
                <p className="vidget__country">{country.name}</p>
            </div>
        </article>
    );
};

export default Vidget;