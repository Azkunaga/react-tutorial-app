import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';

const AppRoutes = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/home" exact element={<Home/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/login" exact element={<Login/>} />
          </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;