import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './scss/style.scss'

import Home from './components/Pages/Home';
import Header from './components/Header';
import Wether from './components/Pages/Wether';

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
          path: 'Wether/:key',
          element: <Wether></Wether>
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
