import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireAuth from '../components/requireAuth';
import ROLES from '../utils/roles';

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';

import TeacherPage from '../pages/teacher';
import StudentPage from '../pages/student';
import AdminPage from '../pages/admin';

import NoExists from '../pages/noExists';
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
              <Route path="/student" exact element={<StudentPage/>} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.TEACHER]} />}>
              <Route path="/teacher" exact element={<TeacherPage/>} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/amdin" exact element={<AdminPage/>} />  
            </Route>

            {/* Catch all */}
            <Route path="*" exact element={<NoExists/>} />

          </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;