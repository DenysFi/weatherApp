import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './scss/style.scss';

import { Provider } from 'react-redux';
import ForecastsNavigation from './components/ForecastsNavigation';
import Header from './components/Header';
import DailyForecast from './components/Pages/DailyForecast';
import Home from './components/Pages/Home';
import HourlyForecast from './components/Pages/HourlyForecast';
import Settings from './components/Pages/Settings';
import WetherForecast from './components/Pages/WetherForecast';
import { settingsStore } from './state/store';

// добавить возможность вібора страны done
// - добавить инпут для выбора страны (как селект) done
// - по стране выбрать город (тоже как инпут) done
// - кнопка добавления страні и отображение иконки страны ниже done
// сохранение локации в браузере пользователя done
// вывод текущей погоды сокращенно  done 
// переход на  страницу с данніми о погоде на неделю на основе текущего метоположения done
// роутер done

function Root() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <footer></footer>
    </>
  );
}
function App() {

  const router = createBrowserRouter([
    {
      path: "/weatherApp/",
      element: <Root></Root>,
      children: [
        {
          path: '/weatherApp/',
          element: <Home></Home>
        },
        {
          path: '/weatherApp/settings',
          element: <Settings></Settings>
        },
        {
          path: '/weatherApp/forecasts',
          element: (
            <>
              <ForecastsNavigation></ForecastsNavigation>
              <Outlet></Outlet>
            </>),
          children: [
            {
              path: '/weatherApp/forecasts/daily-forecast/:city',
              element: <DailyForecast></DailyForecast>
            },
            {
              path: '/weatherApp/forecasts/hourly-forecast/:city',
              element: <HourlyForecast></HourlyForecast>
            },
            {
              path: '/weatherApp/forecasts/Weather/:city',
              element: <WetherForecast></WetherForecast>,
            },
          ]
        },

      ],
    }
  ]
  )
  return (
    <Provider store={settingsStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
