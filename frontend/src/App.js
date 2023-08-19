import './App.css';
import Footer from './components/commons/footer';
import Header from './components/commons/header';
import { useLocation } from "react-router-dom";
import AppRoutes from './routes';

const App = () => {

  let location = useLocation();
  let pathList = ['/register','/login', '/'];
  let hide = false;
  if(pathList.includes(location.pathname)){
    hide = true;
  }

  return (
      <>
      {!hide && <Header/>}
      <main className="App">
          <AppRoutes></AppRoutes>
      </main>
      {!hide && <Footer/> }
      </>
  );
}

export default App;
