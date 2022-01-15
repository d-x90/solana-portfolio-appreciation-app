import InfoModal from '../InfoModal/InfoModal';
import WalletButton from '../WalletButton/WalletButton';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar border-gradient border-gradient-solana">
      <h1>
        <span>Portfolio </span>
        <span>Appreciation</span>
        <span>App <InfoModal /></span>
      </h1>
      <WalletButton></WalletButton>
    </nav>
  );
};

export default Navbar;
