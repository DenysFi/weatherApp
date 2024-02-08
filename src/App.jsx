import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './components/Pages/Home';
import WetherByVidget from './components/Pages/WetherByVidget';
import Header from './components/Header';

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
          path: 'WetherByVidget/:lan/:lon',
          element: <WetherByVidget></WetherByVidget>
        },
        {
          path: '/',
          element: <Home></Home>
        }
      ],
    }
  ]
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
