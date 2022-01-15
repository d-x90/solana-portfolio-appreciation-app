import { useRef, useState } from 'react';
import { checkWallet, getWallet, initWallet, WalletType } from '../../solana';
import Button from '../Button/Button';
import ConnectWalletModal from '../ConnectWalletModal/ConnectWalletModal';
import './WalletButton.scss';

const WalletButton = () => {
  const wallet = useRef(getWallet());
  const [isConnected, setIsConnected] = useState(
    wallet.current?.isConnected || false
  );
  const [walletAddress, setWalletAddress] = useState(
    wallet.current?.isConnected ? wallet.current?.publicKey.toString() : ''
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleConnect = async (walletType: WalletType) => {
    initWallet(walletType, (_isConnected, _walletAddress) => {
      setIsConnected(_isConnected);
      setWalletAddress(_walletAddress);
    });
    const isWalletConnected = await checkWallet();

    if (isWalletConnected) {
      wallet.current = getWallet();
    }

    handleClose();
  };

  return (
    <Button
      className={`wallet-button button ${isConnected ? 'connected' : 'not-connected'}`}
      onClick={async () => {
        if (isConnected) {
          wallet.current.disconnect();
          return;
        }

        handleOpen();
      }}
    >
      {isConnected
        ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
        : 'Connect wallet'}

      {isModalOpen ? (
        <ConnectWalletModal onClose={handleClose} onConnect={handleConnect} />
      ) : null}
    </Button>
  );
};

export default WalletButton;
