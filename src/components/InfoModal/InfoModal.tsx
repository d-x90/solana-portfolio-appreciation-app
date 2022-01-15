import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import './InfoModal.scss';

const InfoModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="info-modal-button"
        onClick={() => setIsModalOpen(true)}
      >
        ?
      </Button>
      {isModalOpen
        ? createPortal(
            <div
              className="modal-background"
              onClick={(event) => {
                event.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <div className="info-modal" onClick={(e) => e.stopPropagation()}>
                <span
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  x
                </span>
                <h1>What is this app?</h1>
                <div className="content">
                  <h2>
                    This is a simple PoC app that integrates with the Solana
                    blockchain. You can connect your Phantom or Solflare wallet
                    and by clicking on the Solana logo you can show some
                    appreciation for my portfolio work <span>&#128588;</span>
                  </h2>
                </div>
                <Button
                  className="ok-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Ok
                </Button>
              </div>
            </div>,
            document.querySelector('#myModalContainer')!
          )
        : null}
    </>
  );
};

export default InfoModal;
