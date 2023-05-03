import { Routes, Route } from 'react-router-dom';
import { LINKS } from './const';
import Header from './layouts/header/Header';
import AboutUs from './pages/aboutUsPage/AboutUs';
import ErrorPage from './pages/errorPage/ErrorPage';
import MainPage from './pages/mainPage/MainPage';
import Forms from './pages/formPage/Forms';

function AppRoutes() {
  return (
    <Routes>
      <Route path={`${LINKS.Main}`} element={<Header />}>
        <Route index element={<MainPage />} />
        <Route path={`${LINKS['About Us']}`} element={<AboutUs />} />
        <Route path={`${LINKS.Forms}`} element={<Forms />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
