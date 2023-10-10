import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireAuth from '../components/requireAuth';
import ROLES from '../utils/roles';

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';

import TeacherPage from '../pages/teacher';
import TeacherQuestionsPage from '../pages/teacher/questions';
import TeacherValidPage from '../pages/teacher/valid';
import TeacherUsersPage from '../pages/teacher/users';

import StudentPage from '../pages/student';
import StudentTutorialPage from '../pages/student/tutorial'

import AdminPage from '../pages/admin';

import TutorialPage from '../pages/admin/tutorial';
import TutorialEditPage from '../pages/admin/tutorialEdit';
import PartEditPage from '../pages/admin/partEdit';
import QuestionEditPage from '../pages/admin/questionEdit';
import NewTutorialTopicPage from '../pages/admin/tutorialEdit/new';
import NewTutorialPartPage from '../pages/admin/partEdit/new';

import UsersListPage from '../pages/admin/usersListAdmin'
import UsersEditPage from '../pages/admin/usersEditPage';
import NewUserPage from '../pages/admin/usersEditPage/new'

import ProfilePage from '../pages/profile';

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
            <Route path="/admin/tutorial/topic/new/:or" exact element={<NewTutorialTopicPage/>} />
            <Route path="/admin/tutorial/topic/:id/part/new/:or" exact element={<NewTutorialPartPage/>} />
            <Route path="/admin/tutorial/topic/:id" element={<TutorialEditPage/>} />
            <Route path="/admin/tutorial/topic/:topicId/part/:partId" element={<PartEditPage/>} />
            <Route path="/admin/tutorial/topic/:topicId/part/:partId/question/:questionId" element={<QuestionEditPage/>} />
            <Route path="/admin/users" exact element={<UsersListPage/>} />
            <Route path="/admin/users/:id" exact element={<UsersEditPage/>} />
            <Route path="/admin/users/new" exact element={<NewUserPage/>} />

            <Route path="/teacher" exact element={<TeacherPage/>} />
            <Route path="/teacher/questions" exact element={<TeacherQuestionsPage/>} />
            <Route path="/teacher/questions/:questionId" exact element={<QuestionEditPage/>} />
            <Route path="/teacher/valid" exact element={<TeacherValidPage/>} />
            <Route path="/teacher/valid/:questionId" exact element={<QuestionEditPage/>} />
            <Route path="/teacher/students" exact element={<TeacherUsersPage/>} />

            <Route path="/student" exact element={<StudentPage/>} />
            <Route path="/student/tutorial/:id" exact element={<StudentTutorialPage/>} />

            <Route path="/profile" exact element={<ProfilePage/>} />

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