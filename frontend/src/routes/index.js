import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireAuth from '../components/requireAuth';
import ROLES from '../utils/roles';

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';

import TeacherPage from '../pages/teacher';

import StudentPage from '../pages/student';

import AdminPage from '../pages/admin';

import TutorialPage from '../pages/admin/tutorial';
import TutorialEditPage from '../pages/admin/tutorialEdit';
import PartEditPage from '../pages/admin/partEdit';
import QuestionEditPage from '../pages/admin/questionEdit';

import UsersEditPage from '../pages/admin/usersEdit'

import NoExists from '../pages/noExists';
import Unauthorized from '../pages/unauthorized';


const AppRoutes = () => {
    return (
        
          <Routes>
            {/* Public routes */}
            <Route path="/" exact element={<Home/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/unauthorized" exact element={<Unauthorized/>} />
            <Route path="/admin" exact element={<AdminPage/>} />
            <Route path="/admin/tutorial" exact element={<TutorialPage/>} />
            <Route path="/admin/tutorial/topic/:id" element={<TutorialEditPage/>} />
            <Route path="/admin/tutorial/topic/:topicId/part/:partId" element={<PartEditPage/>} />
            <Route path="/admin/tutorial/topic/:topicId/part/:partId/question/:questionId" element={<QuestionEditPage/>} />
            <Route path="/admin/users" exact element={<UsersEditPage/>} />

            {/* Protected routes */}
            {/* <Route element={<RequireAuth allowedRoles={ROLES.STUDENT} />}>
              <Route path="/student" exact element={<StudentPage/>} />
            </Route>

            <Route element={<RequireAuth allowedRoles={ROLES.TEACHER} />}>
              <Route path="/teacher" exact element={<TeacherPage/>} />
            </Route>

            <Route element={<RequireAuth allowedRoles={ROLES.ADMIN} />}>
              <Route path="/admin" exact element={<AdminPage/>} /> 
              <Route path="/admin/tutorial" exact element={<TutorialPage/>} /> 
              <Route path="/admin/users" exact element={<UsersEditPage/>} />
            </Route> */}

            {/* Catch all */}
            <Route path="*" exact element={<NoExists/>} />

          </Routes>
    )
}

export default AppRoutes;