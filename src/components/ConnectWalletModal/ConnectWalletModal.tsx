import { FC } from 'react';
import { createPortal } from 'react-dom';
import { WalletType } from '../../solana';
import Button from '../Button/Button';
import './ConnectWalletModal.scss';

export interface ModalProps {
  onClose: () => void;
  onConnect: (type: WalletType) => void;
}

const ConnectWalletModal: FC<ModalProps> = ({ onClose, onConnect }) => {
  return createPortal(
    <div
      className="modal-background"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div className="connect-wallet-modal" onClick={(e) => e.stopPropagation()}>
        <span className='cancel-button' onClick={onClose}>x</span>
        <h1>Select wallet</h1>
        <div className="buttons">
          <Button onClick={() => onConnect(WalletType.Phantom)}>Phantom</Button>
          <Button onClick={() => onConnect(WalletType.Solflare)}>
            Solflare
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector('#myModalContainer')!
  );
};

export default ConnectWalletModal;
