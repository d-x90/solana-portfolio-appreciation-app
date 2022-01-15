import { ToastContainer } from 'react-toastify';
import './App.scss';
import Core from './components/Core/Core';
import Navbar from './components/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { initSol } from './solana';
import InfoModal from './components/InfoModal/InfoModal';

function App() {
  useEffect(() => {
    initSol();
  }, []);

  return (
    <>
      <div className="app">
        <Navbar />
        <section className="main">
          <Core />
        </section>
        <span className="credits">
          Created by <a href="https://github.com/d-x90">d-x90</a>
        </span>
      </div>
      <ToastContainer
        closeOnClick={false}
        limit={7}
        autoClose={7000}
        position="bottom-right"
      />
      <div id="myModalContainer"></div>
    </>
  );
}

export default App;
