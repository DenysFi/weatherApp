import SearchLocation from '../SearchLocation';
import RecentLocations from '../RecentLocations';

const Home = () => {
  return (
    <section className='home'>
      <div className="home__container">
        <SearchLocation></SearchLocation>
        <RecentLocations></RecentLocations>
      </div>
    </section>
  )
};
export default Home;

