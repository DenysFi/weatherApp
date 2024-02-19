import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './scss/style.scss'

import Home from './components/Pages/Home';
import Header from './components/Header';
import WetherForecast from './components/Pages/WetherForecast';
import Settings from './components/Pages/Settings';
import { Provider } from 'react-redux';
import { settingsStore } from './state/store';
import HourlyForecast from './components/Pages/HourlyForecast';
import DailyForecast from './components/Pages/DailyForecast';
import ForecastsNavigation from './components/ForecastsNavigation';
// добавить возможность вібора страны done
// - добавить инпут для выбора страны (как селект) done
// - по стране выбрать город (тоже как инпут) done
// - кнопка добавления страні и отображение иконки страны ниже done
// сохранение локации в браузере пользователя done
// вывод текущей погоды сокращенно 
// переход на  страницу с данніми о погоде на неделю на основе текущего метоположения
// роутер

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
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/settings',
          element: <Settings></Settings>
        },
        {
          path: '/forecasts',
          element:
            <>
              <ForecastsNavigation></ForecastsNavigation>
              <Outlet></Outlet>
            </>
          ,
          children: [
            {
              path: '/forecasts/daily-forecast/:city',
              element: <DailyForecast></DailyForecast>
            },
            {
              path: '/forecasts/hourly-forecast/:city',
              element: <HourlyForecast></HourlyForecast>
            },
            {
              path: '/forecasts/Wether/:city',
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
