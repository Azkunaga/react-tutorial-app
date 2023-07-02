import './App.css';
import Register from './pages/register';
import {appRoutes} from './routes/index';

const App = () => {
  return (
    <main className="App">
        <Register/>
        <appRoutes/>
		</main>
  );
}

export default App;
