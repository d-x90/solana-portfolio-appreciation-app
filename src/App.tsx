import { ToastContainer } from 'react-toastify';
import './App.scss';
import Core from './components/Core/Core';
import Navbar from './components/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { initSol } from './solana';

function App() {
  useEffect(() => {
    initSol();
  }, []);

  return (
    <>
      <div className="app">
        <Navbar />
        <section className="main">
          <div className="description">
            <h1>Welcome!</h1>
            <h2>
              This is a simple PoC app that integrates with the Solana
              blockchain.
            </h2>
            <h2>You can connect your Phantom or Solflare wallet</h2>
            <h3>and by clicking on the Solana logo</h3>
            <h4>you can show some appreciation</h4>
            <h5>for my portfolio work <span>&#128588;</span></h5>
          </div>
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
