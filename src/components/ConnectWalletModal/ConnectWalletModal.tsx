import { FC } from 'react';
import { createPortal } from 'react-dom';
import { WalletType } from '../../solana';
import './ConnectWalletModal.scss';

export interface ModalProps {
  onClose: () => void;
  onConnect: (type: WalletType) => void;
}

const ConnectWalletModal: FC<ModalProps> = ({ onClose, onConnect }) => {
  return createPortal(
    <div
      className="modalBackground"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Select wallet</h1>
        <div className="buttons">
          <button
            className="wallet-button"
            onClick={() => onConnect(WalletType.Phantom)}
          >
            Phantom
          </button>

          <button
            className="wallet-button"
            onClick={() => onConnect(WalletType.Solflare)}
          >
            Solflare
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#myModalContainer')!
  );
};

export default ConnectWalletModal;
