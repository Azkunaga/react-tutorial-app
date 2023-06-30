import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '../pages/register';

const routes = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Register />} />
          </Routes>
        </BrowserRouter>
    )
}

export default routes;