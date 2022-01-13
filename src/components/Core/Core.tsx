import Atropos from 'atropos/react';
import { sendSolToWallet } from '../../solana';
import './Core.scss';

const Core = () => {
  return (
    <div className="core">
      <Atropos
        shadow={false}
        highlight={false}
        activeOffset={100}
        className="my-atropos"
      >
        <div className="moving-container">
          <div data-atropos-offset="25" className="solana-logo" onClick={() => sendSolToWallet(0.1)}></div>
          <div data-atropos-offset="10" className="solana-ring inner"></div>
          <div data-atropos-offset="5" className="solana-ring middle"></div>
          <div data-atropos-offset="1" className="solana-ring outer"></div>
        </div>
      </Atropos>
    </div>
  );
};

export default Core;
