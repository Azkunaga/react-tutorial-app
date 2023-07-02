import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from '../pages/register/index';

const appRoutes = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/register" exact element={<Register/>} />
          </Routes>
        </BrowserRouter>
    )
}

export default appRoutes;