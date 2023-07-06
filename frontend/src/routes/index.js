import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';
import NoExists from '../pages/noExists';
import RequireAuth from '../components/requireAuth';
import ROLES from '../utils/roles';
import Unauthorized from '../pages/unauthorized';

const AppRoutes = () => {
    return (
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" exact element={<Home/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/unauthorized" exact element={<Unauthorized/>} />

            {/* Protected routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.STUDENT]} />}>

            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.TEACHER]} />}>

            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>

            </Route>

            {/* Catch all */}
            <Route path="*" exact element={<NoExists/>} />

          </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;